# VPS Toolbox

中文 VPS 工具网站。生产域名：https://tools.lauritz.top

## 已实现

- 深色响应式首页、脚本库、VPS 测评、部署中心、在线工具、技术博客。
- 11 项工具目录，关键词搜索、场景筛选、权限/流量/来源说明，含数据去向说明，已核对运行路径可确认后复制命令；新增高风险入口仅链接官方来源。
- Ubuntu/Debian 基础初始化脚本：默认预检，明确确认后安装工具；不修改 SSH、防火墙和内核。
- YABS、NodeQuality、NextTrace、IPQuality 与三网路由的上游入口；NodeQuality 当前仅官方来源。
- sing-box/Hysteria2 官方部署指引、JSON 本地部署检查计划。
- IPv4/IPv6 的 RIPEstat BGP/ASN 查询、IPv4 CIDR 计算、JSON 格式化。
- collect.sh 本地系统报告，可选 YABS 磁盘测试（默认关闭网络测速和 Geekbench），也可包装已有 YABS JSON。
- YABS 原生 JSON 与 Toolbox 1.x 的性能表格、单位处理、部分结果和错误展示。
- 按白名单导出脱敏 JSON 与无脚本、无外部资源的独立 HTML，最多 10 份自愿保存的本机报告，支持同 Geekbench 主版本并排比较。
- 3 篇原创使用指南，不冒充商家实测。

## 尚未实现

这是一版真实可用的静态基础站，不是完整的自动化 VPS 管理平台。没有远程 SSH、账号系统、云报告存储、公开报告上传或自动代理部署。sing-box/Hysteria2 目前是官方操作指引；ArgoSBX 是明确标记的集成规划。初始化脚本未完成发行版 VM 回归。上游脚本未审计完整下载链，不宣称安全认证。

## 本地开发

Node.js 22+，无 npm 依赖，无第三方前端资源。

```sh
npm run build
npm test
npm run dev
```

访问 http://127.0.0.1:4173 。修改后重新 build 并刷新。数据在 data.mjs，页面与交互在 app.js，报告逻辑在 reports.mjs，样式在 style.css / report.css。build.mjs 生成 dist/。自动检查还会在 Ubuntu runner 上执行不联网的基础采集与已有 YABS 包装，不运行重负载基准测试。

## Cloudflare 免费托管

当前生产项目为 vps-toolbox-git，连接且仅授权 LauritzWu/vps-toolbox，生产分支 main。构建命令 `npm run build && npm test`，输出 dist，Node 22。main 新提交自动构建并发布；Cloudflare 构建测试失败时不替换线上版本。version.json 显示实际发布提交。旧 vps-toolbox-lauritz 保留为手动上传备份，已解除 tools 子域名绑定。仅迁移 tools CNAME 到 vps-toolbox-git.pages.dev，不修改主域名、probe 或 sub。

## 数据与隐私

JSON 与部署检查计划在本地处理，不上传。报告导出为白名单快照，不附原始日志、IP、主机名和结果链接；保留的 CPU、系统、测试提供方等名称仍需人工检查。点击保存才写入浏览器 localStorage，最多 10 份，可单独删除或清空；共用浏览器的人可以读取。只有用户点击 IP/ASN 查询才向 stat.ripe.net 发送查询地址。上游脚本在用户 VPS 执行并有各自数据行为，NodeQuality 默认上传。网站不使用统计 SDK、外部字体或 Cookie 登录。

## 检测到报告

```sh
bash collect.sh --output report.json
# 已有 YABS 文件可以复用，避免重复测试：
bash collect.sh --yabs-file yabs.json --output report.json
# 可选磁盘负载测试，需明确同意；默认关闭 iperf / Geekbench / IP 查询：
bash collect.sh --yabs --allow-load --output report.json
```

要求 Linux、Bash、jq；不自动安装包。YABS 入口固定为 21f62408ecde9b23d4eec878f46a8292f1944aa0 并校验 SHA256；二级二进制仍由上游管理，不能宣称全链固定。可选 `--network --allow-network` 启用 iperf，会消耗流量且没有硬字节上限；最多等待 30 分钟。采集器不覆盖已有输出。Linux CI 验证基础采集和已有文件包装；重负载路径尚需真实 VPS 回归。

把文件从 VPS 下载到电脑，在网站“VPS 测评”导入，查看后导出脱敏 HTML 即可独立分享，不依赖本站云存储。`fixtures/yabs-example.json` 来自上游 JSON 结构示例并改为演示标记，绝不是本站测评。

## Git 自动部署迁移

2026-11-03 已验证 main 提交自动触发 Pages 生产部署。域名通过新项目 Custom domains 绑定并启用 HTTPS。更新方式：修改源码 → 提交 main → 查看 GitHub Actions 与 Cloudflare 构建结果 → 核对 tools.lauritz.top/version.json 的 commit。回退优先使用 Pages 已有成功部署的回滚功能；必要时可把 tools 重新绑定到保留的旧项目。不要提交任何 token 或检测报告。

## 上游及许可

自有源代码 MIT，第三方工具不随网站打包，许可与依赖由各自上游约束。详见 THIRD_PARTY.md。固定入口提交不意味着内部所有下载已固定。使用前核对源代码、服务条款和运行影响。

## 后续开发

先完成初始化 VM 矩阵与下载链审查，再实现固定版本部署适配器、安装/升级/回滚、关闭 NQ 自动上报的公开补丁。ArgoSBX 单独接入，禁止与原生管理器共同修改配置。随后根据实际需要添加认证、报告 API 与私有存储。不要把未完成能力的按钮包装成已运行服务。

## 隐私边界更新（2026-11-03）

新增 /privacy。NodeQuality 改为仅官方来源，不提供运行命令；TcpQuality、ECS、流媒体检测和 Speedtest 只提供官方入口与数据行为说明，尚未完成全链审查。报告继续本地处理，不新增 SSH、账号、云报告或公开排行榜。反馈渠道为公开 GitHub Issues，禁止提交秘密资料。

## 版本与上游巡检

upstream-snapshot.json 是人工核查快照，不是实时更新承诺。工具详情分别显示采用方式、上游提交和实测范围。上游巡检每周一 10:23（新加坡时间）及手动触发，输出 Actions Summary 和保留 30 天的报告附件；发现变化、链接失效或未核实结果时检查失败，按 GitHub 通知设置提示维护者。不写入仓库、不执行上游代码、不自动升级；人工复核后更新快照。GitHub 定时任务可能延迟，长期无活动时也可能暂停。

完整新手教程：/article?id=report-walkthrough。


## 脚本库导航与来源入口

工具目录现为 12 项，增加 iperf3 双机测速说明；带宽与时长示例不代运行，不自动开放端口。每个项目区分仓库、入口源码/源码目录与官方使用说明；Speedtest 为专有产品，不提供虚构源码。支持 /scripts?tool=工具ID 直达详情和复制分享链接。快速目录在有搜索或筛选时先清除条件再定位。巡检覆盖新增源码和文档链接。


## 终端命令展示（2026-11-03）

按用户要求补充 NodeQuality、TcpQuality、Go 版 ECS、流媒体和 Ookla Speedtest 的运行/安装命令，在工具卡片展开查看。下载、审阅、执行分行展示；复制仍需阅读详情并确认权限与数据去向。NodeQuality/TcpQuality 包含第三方结果提交行为，隐私页同步说明。固定入口不固定二级下载，没有执行这些上游脚本。之前版本中“仅官方来源”的描述为历史状态，以当前目录为准。
