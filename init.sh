#!/usr/bin/env bash
# VPS Toolbox basic initialization. Copyright 2026 LauritzWu. MIT.
# Experimental: no SSH/firewall/kernel modification. Read before running.
set -Eeuo pipefail
apply=false
case "${1:-}" in --apply) apply=true;; ''|--dry-run) ;; *) echo 'Usage: bash init.sh [--dry-run|--apply]' >&2; exit 2;; esac
if [[ ! -r /etc/os-release ]]; then echo 'Cannot detect distribution.' >&2; exit 3; fi
. /etc/os-release
case "$ID" in ubuntu|debian) ;; *) echo 'Only Ubuntu/Debian are supported.' >&2; exit 3;; esac
printf 'System: %s %s / %s\n' "$ID" "$VERSION_ID" "$(uname -m)"
packages=(ca-certificates curl wget jq unzip lsof dnsutils)
printf 'Plan: apt-get update; install %s\n' "${packages[*]}"
printf 'SSH, firewall, kernel, swap and existing services will not be changed.\n'
if ! "$apply"; then echo 'Preflight only. Review source, then add --apply to install packages.'; exit 0; fi
if [[ "$EUID" -ne 0 ]]; then echo 'Run with sudo for --apply.' >&2; exit 4; fi
read -r -p 'Install the listed packages? Type INSTALL: ' answer
[[ "$answer" == INSTALL ]] || { echo 'Cancelled.'; exit 0; }
apt-get -o DPkg::Lock::Timeout=120 update
DEBIAN_FRONTEND=noninteractive apt-get -o DPkg::Lock::Timeout=120 install -y --no-install-recommends "${packages[@]}"
echo 'Packages installed. No automatic reboot. Package installation is not transactionally reversible.'
