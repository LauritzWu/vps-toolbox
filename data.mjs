export const scripts = [
  {
    "id": "collect",
    "dataFlow": "默认只生成 VPS 本地文件；网页导入不上传。可选 YABS 会访问上游下载与所选测试服务。",
    "name": "Toolbox 本地报告采集",
    "eyebrow": "REPORT / LOCAL FIRST",
    "category": "性能测试",
    "icon": "file",
    "desc": "生成标准 JSON 系统报告，或包装已有 YABS 结果，回到网页读懂数据并导出。",
    "tags": [
      "JSON 报告",
      "本地优先",
      "可选 YABS"
    ],
    "permission": "普通 Linux 用户",
    "traffic": "默认不联网；可选测试会下载程序",
    "license": "MIT · 本站脚本",
    "source": "https://github.com/LauritzWu/vps-toolbox/blob/main/collect.sh",
    "command": "curl -fL https://tools.lauritz.top/collect.sh -o collect.sh\nless collect.sh\nbash collect.sh --output report.json",
    "note": "需要 Bash 和 jq，不自动安装依赖。默认仅采集系统信息，不测试性能；--yabs --allow-load 才运行磁盘测试。输出文件不覆盖、不上传，可在 VPS 测评页导入。可选网络测速没有硬流量上限。",
    "status": "本地采集",
    "codeUrl": "https://github.com/LauritzWu/vps-toolbox/blob/main/collect.sh",
    "docsUrl": "https://github.com/LauritzWu/vps-toolbox/blob/main/collect.sh#readme",
    "outputGuide": "只有系统信息时没有跑分是正常现象；将 report.json 带到 VPS 测评页，不要把缺失项目看成零。"
  },
  {
    "id": "init",
    "dataFlow": "VPS 向发行版软件仓库下载依赖；本站不接收系统报告。",
    "name": "Ubuntu / Debian 初始化",
    "eyebrow": "SYSTEM / INITIALIZE",
    "category": "系统初始化",
    "icon": "terminal",
    "desc": "先预检，再安装常用基础工具。保留 SSH、防火墙和现有服务配置。",
    "tags": [
      "Ubuntu",
      "Debian",
      "基础环境"
    ],
    "permission": "需要 sudo",
    "traffic": "软件包下载量因系统而异",
    "license": "MIT · 本站脚本",
    "source": "https://github.com/LauritzWu/vps-toolbox",
    "file": "init.sh",
    "command": "curl -fL https://tools.lauritz.top/init.sh -o vps-init.sh\nless vps-init.sh\nsudo bash vps-init.sh --apply",
    "note": "本站基础脚本。先下载审阅，默认只预检。尚未完成各发行版虚拟机回归；不改 SSH、防火墙、内核或自动重启。",
    "status": "实验脚本",
    "codeUrl": "https://github.com/LauritzWu/vps-toolbox/blob/main/init.sh",
    "docsUrl": "https://github.com/LauritzWu/vps-toolbox#readme",
    "outputGuide": "先检查预检清单，安装失败时保留错误信息；不要重复执行来掩盖问题。"
  },
  {
    "id": "yabs",
    "dataFlow": "VPS 联系 IP 查询、iperf 与 Geekbench 服务；-w 保存本地 JSON，-s 可另行提交整份结果。本页命令不含 -s。",
    "name": "YABS 综合性能测试",
    "eyebrow": "BENCHMARK / HARDWARE",
    "category": "性能测试",
    "icon": "activity",
    "desc": "使用 fio、iperf3 与 Geekbench 检测磁盘、网络和 CPU，保留原生 JSON。",
    "tags": [
      "CPU",
      "磁盘 I/O",
      "网络"
    ],
    "permission": "通常无需 root",
    "traffic": "可产生数 GiB 流量和高负载",
    "license": "WTFPL · 依赖许可另计",
    "source": "https://github.com/masonr/yet-another-bench-script",
    "command": "curl -fL https://raw.githubusercontent.com/masonr/yet-another-bench-script/21f62408ecde9b23d4eec878f46a8292f1944aa0/yabs.sh -o yabs.sh\nless yabs.sh\nbash yabs.sh -w yabs.json",
    "note": "固定入口源码，内部依赖仍来自上游。Geekbench 可能向其结果服务提交测试，执行前阅读上游说明。本站未审计完整下载链。",
    "status": "上游命令",
    "codeUrl": "https://github.com/masonr/yet-another-bench-script/blob/21f62408ecde9b23d4eec878f46a8292f1944aa0/yabs.sh",
    "docsUrl": "https://github.com/masonr/yet-another-bench-script#readme",
    "outputGuide": "分别查看 fio 块大小、iperf 目标和 Geekbench 主版本；busy 表示未完成，不等于带宽为零。"
  },
  {
    "id": "nodequality",
    "dataFlow": "上游将结果打包提交到 api.nodequality.com；本网站不接收该报告，也不控制第三方保留期限。",
    "name": "NodeQuality 全面体检",
    "eyebrow": "BENCHMARK / ALL IN ONE",
    "category": "性能测试",
    "icon": "layers",
    "desc": "整合硬件、IP 与网络质量。BenchOS 临时环境执行，输出综合报告。",
    "tags": [
      "硬件",
      "IP 质量",
      "三网"
    ],
    "permission": "需要 root / 挂载能力",
    "traffic": "完整测试可能消耗大量流量",
    "license": "AGPL-3.0",
    "source": "https://github.com/LloydAsp/NodeQuality",
    "command": null,
    "note": "上游默认把结果上传至 NodeQuality 服务并清理临时文件。chroot 不是安全隔离。固定主脚本不固定它的所有二级依赖。需要纯本地结果时暂不选择此路径。",
    "status": "官方来源 · 含上传",
    "codeUrl": "https://github.com/LloydAsp/NodeQuality/blob/a92fca6c0067df29ddd03fdc2fee6f3000f64545/NodeQuality.sh",
    "docsUrl": "https://github.com/LloydAsp/NodeQuality#readme",
    "outputGuide": "先查看上游上传行为及生成报告的公开范围；当前网页不支持直接导入其原始输出。"
  },
  {
    "id": "nexttrace",
    "dataFlow": "VPS 向目标发探测包，并按配置查询第三方 Geo/ASN 服务；相关服务可能收到路由跳点地址。",
    "name": "NextTrace 路由追踪",
    "eyebrow": "NETWORK / TRACEROUTE",
    "category": "网络检测",
    "icon": "route",
    "desc": "观察每一跳的延迟和 ASN，支持 IPv4 / IPv6，导出 JSON 路由结果。",
    "tags": [
      "IPv4 / IPv6",
      "ASN",
      "JSON"
    ],
    "permission": "可能需要 root / raw socket",
    "traffic": "探测流量较低；使用第三方 Geo 数据",
    "license": "GPL-3.0 · 数据条款另计",
    "source": "https://github.com/nxtrace/NTrace-core",
    "command": "nexttrace --json 1.1.1.1 > route.json",
    "note": "先按官方文档安装 NextTrace。这里仅生成已安装 CLI 的调用命令，不自动下载执行安装器。IP 地理数据的展示与再分发权限独立于代码许可。",
    "status": "已安装 CLI",
    "codeUrl": "https://github.com/nxtrace/NTrace-core/tree/c93eabdb873313d19bab00d820551e2167c961c5",
    "docsUrl": "https://github.com/nxtrace/NTrace-core#readme",
    "outputGuide": "超时跳点不等于终点丢包；记录探测方向、协议、目标和测试时间。"
  },
  {
    "id": "ipquality",
    "dataFlow": "VPS 联系多个 IP 情报提供方并查询被测出口 IP；默认上传及二级依赖尚未完整核查。",
    "name": "IP 质量与 ASN 检测",
    "eyebrow": "NETWORK / IP INTELLIGENCE",
    "category": "网络检测",
    "icon": "globe",
    "desc": "从被测 VPS 检查出口 IP、ASN 与数据源分类，区分未知、冲突和风险提示。",
    "tags": [
      "ASN",
      "出口 IP",
      "风险来源"
    ],
    "permission": "依上游运行要求",
    "traffic": "会向多个数据提供者查询被测 IP",
    "license": "AGPL-3.0",
    "source": "https://github.com/xykt/IPQuality",
    "command": "curl -fL https://raw.githubusercontent.com/xykt/IPQuality/main/ip.sh -o ip-quality.sh\nless ip-quality.sh\nbash ip-quality.sh",
    "note": "这是可变 main 分支的上游入口，运行前必须核对仓库及源码。各数据源分数不可直接平均，“解锁”不等于账号长期安全。本站不提供纯净 IP 保证。",
    "status": "需核对上游",
    "codeUrl": "https://github.com/xykt/IPQuality/blob/87397e2c3196ec796f5477c83343c2354df601ea/ip.sh",
    "docsUrl": "https://github.com/xykt/IPQuality#readme",
    "outputGuide": "保留每个数据源的名称和未知项；风险标签不代表账号可用性或永久解锁。"
  },
  {
    "id": "china-route",
    "dataFlow": "VPS 向中国运营商目标发探测包，路由数据服务可能收到跳点地址。",
    "name": "电信 / 联通 / 移动回程",
    "eyebrow": "NETWORK / CHINA ROUTES",
    "category": "网络检测",
    "icon": "network",
    "desc": "调用 NextTrace 的中国运营商快速追踪，查看 VPS 到国内目标的路径。",
    "tags": [
      "电信",
      "联通",
      "移动"
    ],
    "permission": "依 NextTrace 探测权限",
    "traffic": "探测流量较低",
    "license": "GPL-3.0 · 目标集来自上游",
    "source": "https://github.com/nxtrace/NTrace-core",
    "command": "nexttrace -F",
    "note": "先安装 NextTrace。测试方向为 VPS → 中国目标，不证明你的宽带到 VPS 的去程路径。目标失效和中间跳不响应均不能直接判定线路差。",
    "status": "已安装 CLI",
    "codeUrl": "https://github.com/nxtrace/NTrace-core/tree/c93eabdb873313d19bab00d820551e2167c961c5",
    "docsUrl": "https://github.com/nxtrace/NTrace-core#readme",
    "outputGuide": "只说明 VPS 到中国目标的回程；不能直接反推出你家宽带到 VPS 的去程。"
  },
  {
    "id": "tcpquality",
    "name": "TcpQuality 三网 TCP 检测",
    "eyebrow": "NETWORK / TCP QUALITY",
    "category": "网络检测",
    "icon": "network",
    "desc": "全国三网 TCP 质量与可选测速；先了解报告和调试数据的上传行为。",
    "permission": "通常需要 root / 探测能力",
    "traffic": "外部探测；可选测速流量较高",
    "license": "GPL-3.0",
    "source": "https://github.com/ibsgss/TcpQuality",
    "note": "当前上游含报告及调试包上传代码，尚未确认所有默认开关，不承诺纯本地。暂不提供本站运行命令。",
    "dataFlow": "VPS → 探测节点及上游报告服务；调试模式可能提交更多诊断数据。",
    "tags": [
      "官方入口",
      "需核对数据去向"
    ],
    "command": null,
    "status": "仅官方来源",
    "checkedAt": "2026-11-03",
    "codeUrl": "https://github.com/ibsgss/TcpQuality/blob/75a4e487d2038b85d04a0eb6a7f687d3547de572/runTcpQuality.sh",
    "docsUrl": "https://github.com/ibsgss/TcpQuality#readme",
    "outputGuide": "结合终点、采样次数和时段判断，先核对报告上传设置；当前网页不支持其原始文本导入。"
  },
  {
    "id": "ecs",
    "name": "ECS 融合怪",
    "eyebrow": "BENCHMARK / COMBINED",
    "category": "性能测试",
    "icon": "layers",
    "desc": "现行官方项目为 Go 版融合怪，与旧 ecs.sh Shell 入口需区分。",
    "permission": "依上游模块，可能需要 root",
    "traffic": "多外部服务和下载；可能大量测速",
    "license": "待逐项核对，依赖许可另计",
    "source": "https://github.com/oneclickvirt/ecs",
    "note": "官方仓库现行项目为 Go 版本。旧 GitLab Shell 入口不是同一发行物；完整依赖、结果上传和运行参数仍待审查，仅提供官方来源。",
    "dataFlow": "依所选模块联系多个第三方；尚未完成完整数据流审查。",
    "tags": [
      "官方入口",
      "需核对数据去向"
    ],
    "command": null,
    "status": "仅官方来源",
    "checkedAt": "2026-11-03",
    "codeUrl": "https://github.com/oneclickvirt/ecs/tree/01a8003f840292396d1364a1dfef82a9a8f8b597",
    "docsUrl": "https://github.com/oneclickvirt/ecs#readme",
    "outputGuide": "先确认 Go 或旧 Shell 版本；不同版本模块、参数和报告格式可能不一致。"
  },
  {
    "id": "media",
    "name": "流媒体地区检测",
    "eyebrow": "NETWORK / MEDIA REGIONS",
    "category": "网络检测",
    "icon": "globe",
    "desc": "检查当前 VPS 出口对各地区服务的访问状态，不保证账号长期可用。",
    "permission": "依上游依赖安装要求",
    "traffic": "连接多个外部流媒体服务",
    "license": "AGPL-3.0",
    "source": "https://github.com/lmc999/RegionRestrictionCheck",
    "note": "外部目标会观察连接来源 IP。尚未审查完整请求及下载链，仅提供官方来源。",
    "dataFlow": "VPS → 被测流媒体、DNS 与脚本依赖服务；不应输入流媒体账号凭据。",
    "tags": [
      "官方入口",
      "需核对数据去向"
    ],
    "command": null,
    "status": "仅官方来源",
    "checkedAt": "2026-11-03",
    "codeUrl": "https://github.com/lmc999/RegionRestrictionCheck/blob/b6d4a6f9a87fc6eae6d3e62d0092ececcec8e844/check.sh",
    "docsUrl": "https://github.com/lmc999/RegionRestrictionCheck#readme",
    "outputGuide": "可访问或识别地区只代表当前出口与当前测试结果，不保证付费内容或账号长期可用。"
  },
  {
    "id": "speedtest",
    "name": "Ookla Speedtest CLI",
    "eyebrow": "NETWORK / THROUGHPUT",
    "category": "网络检测",
    "icon": "activity",
    "desc": "官方命令行测速工具。安装软件源与接受使用条款应由用户在终端完成。",
    "permission": "安装软件包通常需要 sudo",
    "traffic": "与测速服务交互；可产生大量流量",
    "license": "专有软件，遵循 Ookla 条款",
    "source": "https://www.speedtest.net/apps/cli",
    "note": "本站不自动添加软件源、安装程序或代同意条款。请阅读官方隐私和使用范围说明，仅提供官方入口。",
    "dataFlow": "VPS → Ookla 与所选测速服务器；具体处理按官方隐私说明。",
    "tags": [
      "官方入口",
      "需核对数据去向"
    ],
    "command": null,
    "status": "仅官方来源",
    "checkedAt": "2026-11-03",
    "docsUrl": "https://www.speedtest.net/apps/cli",
    "outputGuide": "记录服务器、时间、上传/下载和延迟；不同目标或时段的成绩不能当作固定端口能力。"
  },
  {
    "id": "iperf3",
    "name": "iperf3 双机带宽测试",
    "eyebrow": "NETWORK / TWO HOSTS",
    "category": "网络检测",
    "icon": "network",
    "desc": "在自己控制的两台机器之间测吞吐，分清上传与反向下载。",
    "tags": [
      "双机测速",
      "TCP",
      "JSON"
    ],
    "permission": "安装通常需要 sudo；运行使用普通用户",
    "traffic": "可能占满链路；按时长与带宽限制测试",
    "license": "BSD-3-Clause；依赖许可另计",
    "source": "https://github.com/esnet/iperf",
    "codeUrl": "https://github.com/esnet/iperf/tree/master/src",
    "docsUrl": "https://software.es.net/iperf/invoking.html",
    "command": null,
    "status": "使用教程 · 本机 CLI",
    "note": "仅测试自己控制或明确授权的目标。先通过系统软件仓库安装，不自动开放防火墙。默认 TCP 5201，仅允许客户端地址访问，用完关闭端口。",
    "dataFlow": "客户端与自选服务端交换测试流量；双方看到连接 IP。本站不接收测速结果。",
    "checkedAt": "2026-11-03",
    "outputGuide": "查看 sender/receiver 吞吐和重传。-R 反转数据方向；JSON 文件仍是 iperf 格式，当前报告页不支持导入。",
    "usage": [
      [
        "安装（两端，Ubuntu / Debian）",
        "sudo apt update\nsudo apt install iperf3"
      ],
      [
        "服务端（自己控制的另一台机器）",
        "iperf3 -s -1"
      ],
      [
        "客户端上传（先替换 SERVER_IP）",
        "iperf3 -c SERVER_IP -t 10 -b 20M -J > iperf-upload.json"
      ],
      [
        "反向下载（服务端需再次启动单次监听）",
        "iperf3 -c SERVER_IP -R -t 10 -b 20M -J > iperf-download.json"
      ]
    ],
    "example": "示意，非实测：\nsender：约 20 Mbit/s\nreceiver：约 20 Mbit/s\n10 秒 × 20 Mbit/s ≈ 25 MB 单方向数据，不含协议开销。"
  }
];
export const posts = [
  {
    "id": "report-walkthrough",
    "tag": "上手教程",
    "title": "从 SSH 到网页报告：第一次使用 VPS Toolbox",
    "desc": "在自己的终端采集、下载 JSON，再在浏览器检查和导出。无需把服务器密码交给网站。",
    "read": "8 分钟",
    "body": [
      [
        "1. 在自己的 SSH 工具登录 VPS",
        "使用已有 SSH 客户端连接自己的 Ubuntu / Debian VPS。不要把密码、私钥或订阅粘贴到本站。先确认 Bash 和 jq 已安装：bash --version；jq --version。缺少 jq 时，由你决定是否通过系统包管理器安装。基础采集不需要 root。"
      ],
      [
        "2. 下载并阅读采集脚本",
        "在终端逐行执行以下命令。第一条只下载文件；阅读后确认再运行。默认只采集系统信息，不测速、不安装依赖、不上传结果。"
      ],
      [
        "code",
        "curl -fL https://tools.lauritz.top/collect.sh -o collect.sh\nless collect.sh\nbash collect.sh --output report.json"
      ],
      [
        "3. 已有 YABS 结果可以直接复用",
        "如果已经有 YABS 的 JSON，不必再跑一次完整测试。可以直接下载 yabs.json 导入网页，或用下列命令包装。输出文件已存在时会拒绝覆盖，请改名保存。"
      ],
      [
        "code",
        "bash collect.sh --yabs-file yabs.json --output report.json"
      ],
      [
        "4. 把 JSON 下载到自己的电脑",
        "最方便的是在 SSH 客户端的 SFTP 面板找到 report.json，下载到电脑。也可在电脑终端使用下面的 scp 示例，将 user、VPS_HOST 和路径替换为自己的信息；不要在 VPS 终端运行这条下载示例。"
      ],
      [
        "code",
        "scp user@VPS_HOST:/absolute/path/report.json ./report.json"
      ],
      [
        "5. 在网页导入并检查",
        "打开“VPS 测评”，选择 JSON 文件或粘贴 JSON。当前支持 YABS 原生 JSON、Toolbox 1.x；不支持 NodeQuality/TcpQuality 原始文本。先看测试时间、模块是否完成、单位与错误项；基础采集没有跑分是正常现象，未知不会补成零。页面演示数据不是本站真实 VPS 实测。"
      ],
      [
        "6. 检查后导出分享",
        "下载公开 HTML 可离线阅读，下载公开 JSON 可再次导入。导出会排除原始日志、完整 IP、主机名和结果链接，但自由文本仍要人工检查。本站不自动公开报告；将文件发给别人之后，本站不能撤回其他人的副本。"
      ],
      [
        "7. 本机保存是可选项",
        "点击“保存到本机”才保存到浏览器，最多 10 份。可单独删除或清空；共用电脑的人可能读取。清空列表不会删除电脑原文件，也不会删除其他平台的报告。"
      ],
      [
        "需要真正的性能测试时",
        "先确认服务商允许跑分、可用空间与流量额度。collect.sh --yabs --allow-load 可选磁盘测试，默认不启用网络测速或 Geekbench；重负载路径仍待真实 VPS 回归。不要在重要业务机器上盲跑。"
      ],
      [
        "常见问题",
        "jq: command not found：缺少依赖；输出已存在：换新文件名；格式不支持：确认导出的是 JSON 而非截图或终端文本；busy/未知：保留失败信息，稍后再测，不等同于零性能。不同 Geekbench 主版本不要直接比较。"
      ]
    ]
  },
  {
    "id": "first-check",
    "tag": "新机指南",
    "title": "新 VPS 到手，先检查这 6 件事",
    "desc": "从系统信息到三网路由，建立一套有顺序、可保留证据的验收流程。",
    "read": "5 分钟",
    "body": [
      [
        "先确认资源与约束",
        "记录发行版、架构、vCPU、内存、磁盘、流量额度及服务商测试政策。测试会产生负载和磁盘写入，生产业务机器应先安排维护窗口。"
      ],
      [
        "先做低成本检查",
        "确认 IPv4 / IPv6 出站、DNS、系统时间和可用空间。基础 ASN 数据只反映提供方的观测，不代表住宅属性、账号安全或长期解锁。"
      ],
      [
        "再运行性能测试",
        "选 YABS 或 NodeQuality 之一，避免重复跑完整测试。前者可写出原生 JSON；后者上游会上传报告并清理临时环境，启动前了解结果去向。"
      ],
      [
        "分别观察三网路径",
        "在 VPS 运行 NextTrace。VPS 到中国目标的路由常称回程，但与你家庭宽带的去程可能不同。中间跳丢包不等同终点业务丢包。"
      ],
      [
        "保存时间和原始结果",
        "保留引擎版本、参数、时间与测试目标。不同 Geekbench 版本的分数不要混比。发布报告前移除主机名、完整 IP 与节点凭据。"
      ],
      [
        "部署前留好恢复路径",
        "先保存 SSH 公钥登录方式、现有配置和云防火墙设置。确认域名、TCP/UDP 端口与证书条件后再安装代理核心。"
      ]
    ]
  },
  {
    "id": "route-direction",
    "tag": "网络基础",
    "title": "三网回程结果，到底能说明什么？",
    "desc": "看懂方向、响应和 ASN，让路由结果回到它能证明的范围。",
    "read": "4 分钟",
    "body": [
      [
        "路径具有方向性",
        "VPS 发出的追踪只能说明它到目标的路径。用户宽带到 VPS 的路径必须从相应网络测量，不能把同一次结果反过来读。"
      ],
      [
        "不响应的跳点",
        "路由器可能限制或不响应 ICMP。若后续跳和目标正常，中间跳的超时不代表转发数据同样丢失。记录探测协议和端口，才能解释差异。"
      ],
      [
        "ASN 与线路标签",
        "ASN 路径为线路判断提供线索，不构成商业线路等级保证。地理和运营商标注也受数据源更新与准确性影响。"
      ],
      [
        "时间也是测试条件",
        "晚高峰与空闲时的拥塞不同。比较时尽量固定目标、协议、IP 家族及采样次数，重复采样，保留失败而不是只挑最好结果。"
      ]
    ]
  },
  {
    "id": "safe-scripts",
    "tag": "安全实践",
    "title": "一键脚本，为什么应该先下载再执行？",
    "desc": "入口固定还不够：下载链、权限和结果上传同样值得看一遍。",
    "read": "6 分钟",
    "body": [
      [
        "先把执行内容留在本地",
        "把 curl 与 bash 分开，先审阅下载内容。检查 SHA256 能发现文件变化；若摘要来自同一个被入侵页面，它无法单独证明来源可信。"
      ],
      [
        "检查二级下载",
        "固定一个 Git 提交不等于固定完整运行链。脚本还可能下载 main 分支、可覆盖 release asset、rootfs 和闭源程序。逐层检查来源和许可。"
      ],
      [
        "最小权限与副作用",
        "不要把 chroot 视为运行未知 root 脚本的安全边界。关注挂载、swap、定时任务、自动更新、SSH 和防火墙更改。"
      ],
      [
        "看清结果去了哪里",
        "IP 查询会向数据服务暴露被查询地址；基准工具可能公开结果；节点链接本身包含凭据。确认去向后再运行，公开报告使用白名单脱敏。"
      ]
    ]
  }
];
