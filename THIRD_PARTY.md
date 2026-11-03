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

## 2026-11-03 隐私复核

NodeQuality 当前主入口存在打包结果并提交 api.nodequality.com 的逻辑，本站已移除执行命令。TcpQuality 核心含报告和 debug 包提交逻辑；默认行为未逐路径验证，仅展示官方入口。ECS 入口注明推荐 oneclickvirt/ecs，完整依赖与许可待审查。新增 RegionRestrictionCheck（AGPL-3.0）与 Ookla CLI（专有条款）均只链接官方来源，不分发程序或代接受条款。

来源：
- https://raw.githubusercontent.com/LloydAsp/NodeQuality/main/NodeQuality.sh
- https://github.com/ibsgss/TcpQuality （GPL-3.0）
- https://gitlab.com/spiritysdx/za/-/raw/main/ecs.sh
- https://github.com/oneclickvirt/ecs
- https://github.com/lmc999/RegionRestrictionCheck
- https://www.speedtest.net/apps/cli

说明核查不构成安全认证；未执行上述第三方脚本。第三方报告删除需要联系实际接收方。
