# worker-cdn

基于 CloudFlare Workers 的网站加速服务

## 仓库镜像

- https://git.jetsung.com/servless/worker-cdn
- https://framagit.org/servless/worker-cdn
- https://github.com/servless/worker-cdn

## 部署教程

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

## Template: worker-typescript

- https://github.com/cloudflare/workers-sdk/tree/main/templates

```bash
# full repository clone
$ git clone --depth 1 https://github.com/cloudflare/workers-sdk

# copy the "worker-typescript" example to "my-project" directory
$ cp -rf workers-sdk/templates/worker-typescript my-project

# setup & begin development
$ cd my-project && npm install && npm run dev
```

```bash
HTTP_PROXY=http://localhost:20171 wrangler publish
```
