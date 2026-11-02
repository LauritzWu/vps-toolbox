# VPS Toolbox

中文 VPS 工具网站。生产域名：https://tools.lauritz.top

## 已实现

- 深色响应式首页、脚本库、VPS 测评、部署中心、在线工具、技术博客。
- 6 项脚本目录，关键词搜索、场景筛选、权限/流量/来源说明，确认后复制命令。
- Ubuntu/Debian 基础初始化脚本：默认预检，明确确认后安装工具；不修改 SSH、防火墙和内核。
- YABS、NodeQuality、NextTrace、IPQuality 与三网路由的上游命令入口。
- sing-box/Hysteria2 官方部署指引、JSON 本地部署检查计划。
- IPv4/IPv6 的 RIPEstat BGP/ASN 查询、IPv4 CIDR 计算、JSON 格式化。
- JSON 测评报告本地预览、明确标记的示例与常见敏感字段遮蔽。
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

访问 http://127.0.0.1:4173 。修改后重新 build 并刷新。数据在 data.mjs，页面与交互在 app.js，样式在 style.css。build.mjs 生成 dist/。

## Cloudflare 免费托管

首次采用 Cloudflare Pages Direct Upload，部署 dist/ 内文件（可打 ZIP）。使用项目 Custom domains 添加 tools.lauritz.top，由 Pages 创建对应记录与 HTTPS 证书。不得修改主域名、probe 或 sub 的现有记录。此项目不是 Git 自动部署；源代码变更后需要 build/test 并上传新 dist。Direct Upload 项目不能直接切换 Git 集成，若后续需要可重建 Git 集成项目或使用受限 API token 的 CI；不要提交 token。

## 数据与隐私

JSON 与部署检查计划在本地处理，不上传。只有用户点击 IP/ASN 查询才向 stat.ripe.net 发送查询地址。脚本在用户自己的 VPS 执行，具有各自的数据上传行为；NodeQuality 默认上传结果，其提示已在目录中列明。报告遮蔽只是阅读辅助，发布前仍应人工检查。网站不使用统计 SDK、外部字体或 Cookie 登录。

## 上游及许可

自有源代码 MIT，第三方工具不随网站打包，许可与依赖由各自上游约束。详见 THIRD_PARTY.md。固定入口提交不意味着内部所有下载已固定。使用前核对源代码、服务条款和运行影响。

## 后续开发

先完成初始化 VM 矩阵与下载链审查，再实现固定版本部署适配器、安装/升级/回滚、关闭 NQ 自动上报的公开补丁。ArgoSBX 单独接入，禁止与原生管理器共同修改配置。随后根据实际需要添加认证、报告 API 与私有存储。不要把未完成能力的按钮包装成已运行服务。
