# 第三方来源

来源核对日期：2026-11-02。未执行这些上游脚本，未完成全链审计或 VPS 兼容性实测。

| 工具 | 来源 | 许可/边界 |
|---|---|---|
| YABS | https://github.com/masonr/yet-another-bench-script | WTFPL；fio、iperf3、Geekbench 分别核对 |
| NodeQuality | https://github.com/LloydAsp/NodeQuality | AGPL-3.0；上游默认上传结果；chroot 不是安全边界 |
| NextTrace | https://github.com/nxtrace/NTrace-core | GPL-3.0；Geo 数据与服务条款另计 |
| IPQuality | https://github.com/xykt/IPQuality | AGPL-3.0；多提供方会观测查询 IP |
| sing-box | https://github.com/SagerNet/sing-box | 当前 LICENSE 为 GPL v3 或后续版本，附名称/关联文字；保留全文并复核 |
| Hysteria | https://github.com/HyNetworks/hysteria | 核心 MIT；安装器许可另查 |
| ArgoSBX | https://github.com/yonggekkk/argosbx | GPL-3.0；集成规划，尚未打包执行 |
| RIPEstat | https://stat.ripe.net/docs/data-api/ | 用户主动查询 BGP/ASN；不构成 IP 风险评估 |

本站未复制第三方脚本到发行包，仅展示来源和命令。原项目版权与许可不由本站 MIT 替代。NodeQuality JSON/BenchOS、ArgoSBX 二级二进制与自更新在自动化接入前必须继续审查。
