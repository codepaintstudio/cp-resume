# CodePaintStudio Resume Builder

![Version](https://img.shields.io/badge/version-0.0.1-green)

**CodePaintStudio Resume Builder** 是一个功能强大且简洁优雅的在线简历制作平台，旨在帮助用户轻松创建专业的简历。通过直观的界面和多样化的模板，用户可以快速生成个性化的简历。

---

## ✨ 功能特性

- **多模板支持**：提供多种简历模板，满足不同场景需求。
- **可视化编辑**：支持实时预览，用户可自由调整简历内容模块的顺序、开关。
- **云端存储**：用户登录后可将简历保存到云端，支持增删改查操作。
- **一键导出**：支持将简历导出为 PDF 格式。
- **管理员功能**：管理员登录后可对简历模板进行管理，包括新增、编辑和删除操作。

---

## 🛠 技术栈

- **前端框架**：Vue 3
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **HTTP 请求**：Axios
- **构建工具**：Vite
- **样式**：TailwindCSS
- **语言**：TypeScript

---

## 📖 项目介绍

CodePaintStudio Resume Builder 是一个在线简历编辑与导出平台，主要功能包括：

1. **简历制作**：

   - 用户可以选择多种简历模板。
   - 支持可视化编辑简历内容，实时预览效果。
   - 用户可自定义模块顺序及显示状态。

2. **云端存储**：

   - 用户登录后可将简历保存到云端。
   - 支持在个人页面对简历进行增删改查操作。

3. **模板管理**：

   - 管理员登录后可对简历模板进行管理，包括新增、编辑和删除模板。

4. **导出功能**：
   - 支持将简历导出为 PDF 格式，方便用户下载和分享。

---

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 pnpm

### 安装依赖

```bash
pnpm install
```

###

```bash
pnpm dev
```

###

```bash
pnpm build
```

###

```bash
pnpm preview
```

## 项目结构

```
.
├── src/                # 源代码
│   ├── api/            # API 请求封装
│   ├── components/     # 公共组件
│   ├── stores/         # 状态管理（Pinia）
│   ├── template/       # 简历模板
│   ├── views/          # 页面视图
│   ├── types/          # TypeScript 类型定义
│   └── utils/          # 工具函数
├── public/             # 静态资源
├── .vscode/            # VSCode 配置
├── [package.json](http://_vscodecontentref_/0)        # 项目依赖
├── [vite.config.ts](http://_vscodecontentref_/1)      # Vite 配置
└── [README.md](http://_vscodecontentref_/2)           # 项目说明
```
