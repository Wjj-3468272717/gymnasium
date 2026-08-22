# 健身管理系统前端（gymnasium-project-fe）

健身管理系统配套前端，采用 Vue 3 + TypeScript + Vite 构建，配合后端 `gymnasium-back`（Spring Boot + Dubbo 微服务）使用。

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | 渐进式前端框架（`<script setup>`） |
| TypeScript | 类型系统 |
| Vite | 构建工具 / 开发服务器 |
| Element Plus | UI 组件库 |
| Pinia + pinia-plugin-persist | 状态管理 + 持久化 |
| Vue Router | 路由（history 模式，动态路由） |
| Axios | HTTP 请求封装 |
| ECharts | 数据可视化（首页工作台统计） |
| wangEditor | 富文本编辑器 |

## 环境要求

- Node.js **18+**（Vite 5 要求）
- npm / yarn / pnpm

## 快速开始

```bash
npm install
npm run dev    # 启动开发服务器 → http://localhost:8080（自动打开浏览器）
```

## 环境与代理配置

开发服务器配置在 `vite.config.ts`：

- 端口 `8080`，`host: 0.0.0.0`（局域网可访问），开启 HMR，启动自动打开浏览器。
- `/api` 前缀的请求通过 Vite **代理转发**到后端，默认目标 `http://192.168.240.128:9999`：

```ts
proxy: {
  "/api": {
    target: "http://192.168.240.128:9999", // 后端地址，按实际环境修改
    changeOrigin: true,
  },
}
```

> 前端代码里 `BASE_API` 为空，实际请求走 `/api` 相对路径，由代理转发到后端。

## 目录结构

```
src/
├── api/          # 各业务模块接口封装（course/goods/home/login/...）
├── components/   # 通用组件
├── composables/  # 组合式函数（表格 useTable / 富文本 useEditor / 验证码 useImage 等）
├── http/         # Axios 封装与请求/响应拦截器
├── layout/       # 布局（dashboard 首页 / header 头部 / center 居中）
├── router/       # 路由（静态路由 + 菜单动态路由生成）
├── store/        # Pinia 状态（user / menu）
├── utils/        # 工具函数（深拷贝 / 确认框等）
├── views/        # 页面（system/member/course/goods/order/...）
├── permission.ts # 路由守卫：登录鉴权、动态菜单路由
└── main.ts       # 入口（挂载 Element Plus / Pinia / ECharts / 全局组件）
```

## 登录与 Token 机制

1. 登录页输入账号密码 + 图形验证码，调用 `/api/login/login`。
2. 登录成功后后端签发 JWT，前端存入 **localStorage**（Pinia + `pinia-plugin-persist`）。
3. 请求拦截器（`src/http/index.ts`）自动在请求头携带 `token`。
4. 路由守卫（`src/permission.ts`）判断 token 是否存在，并按用户角色动态加载菜单路由。
5. **认证失败统一处理**：当后端返回 token 校验失败（业务码 `600`）或 HTTP 401 时，只提示一次、清空 token、跳转登录页；并发请求不会再重复弹"token过期"提示。

## 功能模块

- **系统管理**：用户、角色、菜单权限
- **会员管理**：会员列表、会员卡、办卡、续费、充值
- **课程管理**：课程 CRUD + 封面图片上传、会员报名、我的课程
- **商品与订单**：商品 CRUD + 图片上传、下单、器材管理
- **首页工作台**：数据统计看板（ECharts）
- **其他**：失物招领、意见反馈、验证码登录

## 图片存储

图片统一通过 `/api/upload/uploadImage` 上传，后端返回公网 URL（阿里云 OSS，形如 `https://gymna.oss-cn-beijing.aliyuncs.com/xxx.png`）。课程/商品的 `image` 字段保存**完整 URL**，前端直接作为 `<img src="...">` 使用，浏览器直连 OSS 加载。

## 构建与部署

```bash
npm run build     # vue-tsc 类型检查 + Vite 构建，产物在 dist/
npm run preview   # 本地预览构建产物
```

## 常见问题

- **首次打开弹多条"token过期"**：原因是旧 token 持久化在 localStorage，重启后已过期，首次加载多个并发请求同时带过期 token 各自弹窗。已修复：拦截器统一处理认证失败（只弹一条并跳转登录页）。
- **接口 404 / 连不上后端**：检查 `vite.config.ts` 里 `/api` 代理的 `target` 是否指向正确的后端地址。
- **接口报错提示**：业务码非 200 时，拦截器会用 `ElMessage` 弹出后端返回的 `msg`。
