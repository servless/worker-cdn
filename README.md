# worker-cdn

基于 CloudFlare Workers 的网站加速服务

## 部署教程

### 通过 GitHub Actions 发布至 CloudFlare

1. 从 CloudFlare 获取 `CLOUDFLARE_API_TOKEN` 值，并设置到项目。

   > `https://github.com/<ORG>/worker-cdn/settings/secrets/actions`

2. **可选**）设置`别名`。创建 `KV`、，并绑定到此 Workers 服务。
   - 2.1a 手动后台绑定，（`Settings` -> `Variables` -> `KV Namespace Bindings` -> `Add binding` -> `Variable name (datastore)`, `选择创建的 KV`）
   - 2.1b 通过命令行创建：`wrangler kv:namespace create datastore`
3. `KV` 设置 `别名值`，Key 为别名（单词），Value（目标网址，含 `http(s)://`）。

4. 最终访问域名地址组合为：
   > https://wcdn.kkgo.cc/github.com/servless/worker-cdn > https://wcdn.kkgo.cc/github/servless/worker-cdn （别名）
   > https://wcdn.kkgo.cc/rawgh/servless/worker-cdn/main/README.md （[别名](https://raw.githubusercontent.com/servless/worker-cdn/main/README.md)）

### 本地部署到 CloudFlare

1. 注册 [CloudFlare 账号](https://www.cloudflare.com/)，并且设置 **Workers** 域名 (比如：`xxx.workers.dev`)
2. 安装 [Wrangler 命令行工具](https://developers.cloudflare.com/workers/wrangler/)。
   ```bash
    npm install -g wrangler
   ```
3. 登录 `Wrangler`（可能需要扶梯）：

   ```bash
   # 登录，可能登录不成功
   wrangler login

   # 若登录不成功，可能需要使用代理。
   # 每个命令行前，均需要加 HTTP_PROXY=http://localhost:20171
   HTTP_PROXY=http://localhost:20171 wrangler login
   ```

4. 拉取本项目：

   ```bash
   git clone https://github.com/servless/worker-cdn.git
   ```

5. 修改 `wrangler.toml` 文件中的 `name`（cdn）为服务名 `xxx`（访问域名为：`cdn.xxx.workers.dev`），修改 `WEB_URL` 为需要加速的网站网址。
   **注：** 后期可以通过 Cloudflare 官网的 Workers 服务设置环境变量。重新推送当前代码时，会将线上的 `WEB_URL` 覆盖。

6. 发布

   ```bash
    HTTP_PROXY=http://localhost:20171 wrangler publish
   ```

   发布成功将会显示对应的网址

   ```bash
    Proxy environment variables detected. We'll use your proxy for fetch requests.
   ⛅️ wrangler 2.13.0
   	--------------------
   	Total Upload: 0.66 KiB / gzip: 0.35 KiB
   	Uploaded cdn (1.38 sec)
   	Published cdn (4.55 sec)
   		https://cdn.xxx.workers.dev
   	Current Deployment ID:  xxxx.xxxx.xxxx.xxxx
   ```

   **由于某些原因，`workers.dev` 可能无法正常访问，建议绑定自有域名。**

7. 绑定域名

   在 Cloudflare Workers 的管理界面中，点击 `Triggers` 选项卡，然后点击 `Custom Domians` 中的 `Add Custom Domain` 按钮以绑定域名。

## 仓库镜像

- https://git.jetsung.com/servless/worker-cdn
- https://framagit.org/servless/worker-cdn
- https://github.com/servless/worker-cdn
