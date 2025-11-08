# 使用指南 / Usage Guide

## 快速开始 / Quick Start

### 1. 本地开发 / Local Development

```bash
# 克隆项目
git clone git@github.com:AXCISME/blog.git
cd blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看开发版本。

### 2. 添加博客文章 / Add Blog Posts

1. 在 `posts/` 目录创建新的 `.md` 文件
2. 添加前置信息：
   ```markdown
   ---
   title: "文章标题"
   date: "2024-01-15"
   excerpt: "文章简介"
   tags: ["标签1", "标签2"]
   category: "分类"
   ---

   # 文章内容

   这里是文章的 Markdown 内容...
   ```

3. 文件名使用小写字母、数字和连字符，如：`my-first-post.md`

### 3. 部署博客 / Deploy Blog

#### 方法一：一键部署脚本 / Method 1: One-Click Script

```bash
# 构建并部署到 GitHub Pages
./build-and-deploy.sh
```

#### 方法二：手动部署 / Method 2: Manual Deploy

```bash
# 构建
npm run build

# 部署到 GitHub Pages
./deploy.sh
```

#### 方法三：GitHub Actions / Method 3: GitHub Actions

推送代码到 `main` 分支，GitHub Actions 会自动构建并部署。

### 4. 可用命令 / Available Commands

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run lint:fix     # 自动修复代码问题
npm run format       # 格式化代码
npm run format:check # 检查代码格式
npm run type-check   # TypeScript 类型检查
npm run clean        # 清理构建文件
npm run export       # 导出静态文件
```

## 高级配置 / Advanced Configuration

### 自定义域名 / Custom Domain

1. 复制 `CNAME.example` 为 `CNAME`
2. 编辑 `CNAME` 文件，填入你的域名
3. 推送到 GitHub，GitHub Pages 会自动处理

### 修改网站信息 / Edit Site Info

编辑 `app/layout.tsx`：
- 修改网站标题
- 修改描述信息
- 修改语言设置

### 自定义样式 / Custom Styles

编辑 `tailwind.config.js` 配置主题
编辑 `app/globals.css` 添加自定义样式

## 故障排除 / Troubleshooting

### 构建失败 / Build Failed

1. 检查 Markdown 文件格式
2. 确保所有前置信息字段正确
3. 运行 `npm run type-check` 检查类型错误

### 部署失败 / Deploy Failed

1. 确保已配置 SSH 密钥
2. 检查仓库权限
3. 确保已运行 `npm run build`

### 标签/分类链接错误 / Tag/Category Links Not Working

1. 重新构建：`npm run build`
2. 确保 `next.config.js` 包含正确的配置

## 支持 / Support

如果遇到问题：
1. 查看 [README.md](./README.md) 获取详细信息
2. 查看 [DEPLOY.md](./DEPLOY.md) 获取部署指南
3. 提交 Issue 到 GitHub 仓库