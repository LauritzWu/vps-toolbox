#!/usr/bin/env bash
# VPS Toolbox 0.2.0 - local-first collector, MIT (c) 2026 LauritzWu.
# Read before running. No SSH/firewall changes, no automatic package install.
set -Eeuo pipefail
umask 077
output=report.json
mode=quick
allow_load=false
network=false
allow_network=false
existing=''
usage(){ cat <<'HELP'
Usage: bash collect.sh [--output report.json] [--yabs --allow-load]
       [--network --allow-network] [--yabs-file existing-yabs.json]
Default: local inventory only. Requires Linux, bash and jq; installs nothing.
--yabs: disk benchmark with pinned YABS entry script. Defaults to -g -n -i.
--network: enable iperf3 (may consume multiple GiB; no hard traffic cap).
Geekbench and IP metadata lookups stay disabled in this wrapper.
YABS may fetch additional programs: only its entry script is hash-verified.
Timeout: 30 minutes. Results stay local. Existing output is never overwritten.
HELP
}
while (($#)); do
  case "$1" in
    --output) [[ $# -ge 2 ]] || { usage >&2; exit 2; }; output=$2; shift 2;;
    --yabs) mode=yabs; shift;;
    --allow-load) allow_load=true; shift;;
    --network) network=true; shift;;
    --allow-network) allow_network=true; shift;;
    --yabs-file) [[ $# -ge 2 ]] || { usage >&2; exit 2; }; existing=$2; shift 2;;
    -h|--help) usage; exit 0;;
    *) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 2;;
  esac
done
[[ $(uname -s) == Linux ]] || { echo 'Requires a Linux VPS.' >&2; exit 3; }
command -v jq >/dev/null || { echo 'Missing jq. Install it yourself with your package manager, then retry.' >&2; exit 3; }
if "$network" && { [[ "$mode" != yabs ]] || ! "$allow_network"; }; then echo '--network requires --yabs --allow-network.' >&2; exit 2; fi
if [[ "$mode" == yabs ]] && ! "$allow_load"; then echo 'Review --help, then explicitly add --allow-load for disk load and third-party downloads.' >&2; exit 2; fi
[[ "$mode" != yabs || -z "$existing" ]] || { echo '--yabs and --yabs-file are mutually exclusive.' >&2; exit 2; }
if [[ -n "$existing" ]]; then
  [[ -f "$existing" && ! -L "$existing" ]] || { echo 'YABS input must be a regular non-symlink file.' >&2; exit 2; }
  [[ $(wc -c < "$existing") -le 2097152 ]] || { echo 'YABS input exceeds 2 MiB.' >&2; exit 2; }
  jq -e 'type=="object" and (.cpu|type=="object") and (.version|type=="string")' "$existing" >/dev/null || { echo 'Invalid YABS JSON.' >&2; exit 2; }
  existing=$(realpath -- "$existing")
fi
outdir=$(dirname -- "$output")
[[ -d "$outdir" ]] || { echo 'Output directory does not exist.' >&2; exit 2; }
outdir=$(cd -- "$outdir" && pwd -P)
output="$outdir/$(basename -- "$output")"
[[ ! -e "$output" && ! -L "$output" ]] || { echo 'Output exists; choose a new filename.' >&2; exit 2; }
work=$(mktemp -d "$outdir/.vps-toolbox.XXXXXXXX")
runner=''
cleanup(){
  if [[ "$runner" =~ ^[0-9]+$ ]] && kill -0 "$runner" 2>/dev/null; then
    kill -TERM -- "-$runner" 2>/dev/null || kill -TERM "$runner" 2>/dev/null || true
    wait "$runner" 2>/dev/null || true
  fi
  [[ "$work" == "$outdir"/.vps-toolbox.* && -d "$work" && ! -L "$work" ]] && rm -rf -- "$work"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM HUP
start=$(date +%s)
measured=$(date -u +%Y-%m-%dT%H:%M:%SZ)
os_id=linux
os_version=''
if [[ -r /etc/os-release ]]; then
  os_id=$(sed -n 's/^ID=//p' /etc/os-release | tr -d '"' | head -c 80)
  os_version=$(sed -n 's/^VERSION_ID=//p' /etc/os-release | tr -d '"' | head -c 80)
fi
cpu=$(awk -F: '/^model name|^Hardware/ {sub(/^[ \t]+/,"",$2);print $2;exit}' /proc/cpuinfo | head -c 180)
cores=$(getconf _NPROCESSORS_ONLN)
memory=$(awk '/^MemTotal:/ {printf "%.0f", $2*1024}' /proc/meminfo)
swap=$(awk '/^SwapTotal:/ {printf "%.0f", $2*1024}' /proc/meminfo)
status=skipped
exit_code=0
printf '{}\n' > "$work/yabs.json"
if [[ -n "$existing" ]]; then
  cp -- "$existing" "$work/yabs.json"
  status=ok
elif [[ "$mode" == yabs ]]; then
  for cmd in curl sha256sum timeout; do command -v "$cmd" >/dev/null || { echo "Missing $cmd." >&2; exit 3; }; done
  echo 'Downloading the pinned YABS entry script. Additional binaries are upstream-managed.' >&2
  curl --proto '=https' --tlsv1.2 -fL --retry 2 --max-time 60 \
    'https://raw.githubusercontent.com/masonr/yet-another-bench-script/21f62408ecde9b23d4eec878f46a8292f1944aa0/yabs.sh' -o "$work/yabs.sh"
  printf '%s  %s\n' 'dd6414ad37460cb6c872a15c79e09dd52cf7fc7f417f664dfba6473b775debf1' "$work/yabs.sh" | sha256sum -c - >&2
  args=(-g -n -w "$work/yabs.json")
  "$network" || args+=(-i)
  echo 'Running benchmark. Results will not be uploaded by this wrapper. No hard byte cap.' >&2
  (cd -- "$work"; exec timeout --signal=TERM --kill-after=10s 30m bash ./yabs.sh "${args[@]}") > "$work/yabs.log" 2>&1 &
  runner=$!
  wait "$runner" || exit_code=$?
  runner=''
  if [[ -s "$work/yabs.json" ]] && jq -e 'type=="object" and has("version")' "$work/yabs.json" >/dev/null 2>&1; then
    status=ok
    [[ "$exit_code" -eq 0 ]] || status=partial
  else
    status=failed
    printf '{}\n' > "$work/yabs.json"
    echo 'YABS failed or returned invalid JSON; inventory will still be saved.' >&2
  fi
fi
duration=$(( ($(date +%s)-start)*1000 ))
jq -n --arg measured "$measured" --arg os "$os_id" --arg os_version "$os_version" \
  --arg arch "$(uname -m)" --arg kernel "$(uname -r)" --arg cpu "$cpu" \
  --argjson cores "$cores" --argjson memory "$memory" --argjson swap "$swap" \
  --arg status "$status" --argjson code "$exit_code" --argjson duration "$duration" \
  --slurpfile yabs "$work/yabs.json" \
  '{schema_version:"1.0.0",measured_at:$measured,duration_ms:$duration,
    collector:{version:"0.2.0"},trust:{kind:"user_submitted",independently_verified:false},
    environment:{os:{id:$os,version:$os_version},arch:$arch,kernel:$kernel,
      cpu:{model:$cpu,vcpus:$cores},memory_bytes:$memory,swap_bytes:$swap},
    modules:[{id:"inventory",engine:"toolbox",status:"ok"},{id:"yabs",engine:"yabs",status:$status,exit_code:$code}],
    privacy:{local_only:true,collects_hostname:false,collects_ip:false}}
    + (if ($yabs[0]|has("version")) then {raw_yabs:$yabs[0]} else {} end)' > "$work/result.json"
[[ $(wc -c < "$work/result.json") -le 2097152 ]] || { echo 'Report exceeds 2 MiB; output was not written.' >&2; exit 5; }
# Hard link gives atomic no-clobber publication on the same filesystem.
ln -- "$work/result.json" "$output" || { echo 'Cannot publish output without overwrite.' >&2; exit 5; }
printf 'Saved local JSON: %s\nOpen https://tools.lauritz.top/reviews to import it.\n' "$output"
[[ "$status" != failed && "$status" != partial ]] || exit 6
