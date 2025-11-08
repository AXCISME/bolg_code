# Next.js 静态博客

一个使用 Next.js 构建的现代化静态博客，支持标签、分类和自动 Markdown 文件扫描。

## 功能特性

- ✅ **静态站点生成** - 快速加载且对 SEO 友好
- ✅ **自动 Markdown 处理** - 只需将 `.md` 文件添加到 `posts` 目录
- ✅ **标签和分类** - 使用标签和分类组织您的内容
- ✅ **响应式设计** - 在所有设备上完美运行
- ✅ **快速开发** - 热重载和快速刷新
- ✅ **TypeScript 支持** - 类型安全的开发体验
- ✅ **Tailwind CSS** - 现代化的实用优先样式框架

## 快速开始

1. **安装依赖:**
   ```bash
   npm install
   ```

2. **启动开发服务器:**
   ```bash
   npm run dev
   ```

3. **打开浏览器:**
   访问 [http://localhost:3000](http://localhost:3000)

## 添加博客文章

要添加新的博客文章，请在 `posts` 目录中创建一个新的 `.md` 文件，并包含以下前置信息：

```markdown
---
title: "您的文章标题"
date: "2024-01-15"
excerpt: "文章的简短描述"
tags: ["标签1", "标签2", "标签3"]
category: "教程"
---

# 您的文章内容

在这里编写您的 Markdown 内容...
```

### 前置信息字段

- `title` (必需) - 文章标题
- `date` (必需) - 发布日期，格式为 YYYY-MM-DD
- `excerpt` (可选) - 文章预览的简短描述
- `tags` (可选) - 文章的标签数组
- `category` (可选) - 文章的分类

### 文件命名

- 使用小写字母、数字和连字符
- 示例：`my-first-post.md`, `getting-started-react.md`

## 项目结构

```
blog/
├── app/                    # Next.js App Router 页面
│   ├── blog/              # 博客列表页面
│   │   └── [slug]/        # 单个文章页面
│   ├── tag/               # 标签页面
│   │   └── [tag]/
│   ├── category/          # 分类页面
│   │   └── [category]/
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── lib/
│   └── posts.ts           # Markdown 处理工具
├── posts/                 # 您的 Markdown 博客文章
├── public/                # 静态资源
└── package.json
```

## 可用页面

- `/` - 显示最新文章的首页
- `/blog` - 所有博客文章，支持筛选
- `/blog/[slug]` - 单篇博客文章
- `/tag/[tag]` - 按标签筛选的文章
- `/category/[category]` - 按分类筛选的文章

## 自定义配置

### 样式

博客使用 Tailwind CSS。您可以通过以下方式自定义主题：

1. 编辑 `tailwind.config.js` 进行主题配置
2. 编辑 `app/globals.css` 添加自定义样式
3. 修改页面文件中的组件样式

### 布局

- 更新 `app/layout.tsx` 来更改网站头部和整体布局
- 修改单独的页面文件来改变它们的外观

### 内容处理

Markdown 处理由 `lib/posts.ts` 处理。您可以扩展它来添加：

- 自定义 Markdown 渲染器
- 额外的前置信息字段
- 内容转换

## 构建和部署 / Build and Deployment

### 生产构建 / Production Build

```bash
npm run build
```

### 静态导出（用于 Nginx）/ Static Export (for Nginx)

要将博客导出为静态文件，可以直接部署到任何 Web 服务器（如 Nginx）：

To export the blog as static files for deployment to any web server (like Nginx):

#### 一键部署脚本 / One-Click Deployment Script

我们提供了便捷的部署脚本：

We provide convenient deployment scripts:

**快速部署 / Quick Deploy:**
```bash
# 一键构建并部署到 GitHub Pages
./build-and-deploy.sh

# 或者只部署已构建的文件
./deploy.sh
```

**手动部署 / Manual Deploy:**

1. **配置静态导出 / Configure Static Export**

   在 `next.config.js` 中添加或修改以下配置：

   Add or modify the following configuration in `next.config.js`:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }

   module.exports = nextConfig
   ```

2. **构建静态文件 / Build Static Files**

   ```bash
   npm run build
   ```

3. **部署到 Nginx / Deploy to Nginx**

   构建完成后，静态文件将生成在 `out` 目录中：

   After building, static files will be generated in the `out` directory:

   ```bash
   # 部署文件到 Nginx
   sudo cp -r out/* /var/www/html/

   # 或者直接复制到你的 Nginx 网站目录
   # Or copy directly to your Nginx web directory
   sudo cp -r out/* /path/to/your/nginx/site/
   ```

4. **Nginx 配置示例 / Nginx Configuration Example**

   创建或修改 Nginx 配置文件：

   Create or modify Nginx configuration file:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /var/www/html;
       index.html index.htm;

       # 处理所有路由，返回 index.html
       location / {
           try_files $uri $uri/ $uri.html /index.html;
       }

       # 静态资源缓存
       location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

5. **重启 Nginx / Restart Nginx**

   ```bash
   sudo systemctl restart nginx
   ```

### 启动生产服务器 / Start Production Server

```bash
npm start
```

### 部署选项 / Deployment Options

这个博客可以部署到以下平台 / This blog can be deployed to the following platforms:

- **Vercel** (推荐 / Recommended) - 零配置部署 / Zero-config deployment
- **Netlify** - 静态站点托管 / Static site hosting
- **AWS Amplify** - 全栈托管 / Full-stack hosting
- **GitHub Pages** - 免费静态托管 / Free static hosting
- **任何 Web 服务器 / Any Web Server** - 使用静态导出功能 / Using static export feature

## 命令 / Commands

- `npm run dev` - 启动开发服务器 / Start development server
- `npm run build` - 生产构建 / Production build
- `npm run start` - 启动生产服务器 / Start production server
- `npm run lint` - 运行 ESLint / Run ESLint

## 使用指南 / Usage Guide

### 开发流程 / Development Workflow

1. **克隆项目 / Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd blog
   ```

2. **安装依赖 / Install Dependencies**
   ```bash
   npm install
   ```

3. **开发模式 / Development Mode**
   ```bash
   npm run dev
   ```
   访问 http://localhost:3000 查看开发版本 / Visit http://localhost:3000 for development version

4. **添加内容 / Add Content**
   - 将 Markdown 文件放入 `posts/` 目录 / Place Markdown files in the `posts/` directory
   - 将静态资源（图片等）放入 `public/` 目录 / Place static assets (images, etc.) in the `public/` directory

5. **构建部署 / Build and Deploy**

   **用于 Node.js 服务器 / For Node.js Server:**
   ```bash
   npm run build
   npm start
   ```

   **用于静态服务器（Nginx/Apache）/ For Static Servers (Nginx/Apache):**
   1. 配置 `next.config.js`（参考上文）/ Configure `next.config.js` (see above)
   2. 运行 `npm run build` / Run `npm run build`
   3. 将 `out/` 目录内容复制到服务器 / Copy contents of `out/` directory to server

### 常见问题 / Common Issues

1. **构建失败 / Build Failed**
   - 检查 Markdown 文件格式 / Check Markdown file format
   - 确保所有前置信息字段正确 / Ensure all front matter fields are correct

2. **静态导出问题 / Static Export Issues**
   - 确保在 `next.config.js` 中设置了 `output: 'export'` / Ensure `output: 'export'` is set in `next.config.js`
   - 检查是否有动态导入需要处理 / Check for dynamic imports that need handling

3. **Nginx 路由问题 / Nginx Routing Issues**
   - 确保配置了 `try_files` 来处理所有路由 / Ensure `try_files` is configured to handle all routes
   - 检查文件权限 / Check file permissions

## 依赖 / Dependencies

- **Next.js** - React 框架 / React framework
- **React** - UI 库 / UI library
- **gray-matter** - 前置信息解析 / Front matter parsing
- **remark** - Markdown 处理器 / Markdown processor
- **remark-html** - Markdown 到 HTML 转换 / Markdown to HTML conversion
- **date-fns** - 日期格式化 / Date formatting
- **Tailwind CSS** - 样式框架 / Styling framework

## 提示 / Tips

1. **编写文章 / Writing Articles**: 在任何 Markdown 编辑器中编写文章并保存到 `posts` 目录 / Write articles in any Markdown editor and save them to the `posts` directory
2. **图片 / Images**: 将图片放在 `public` 目录中，并使用绝对路径引用 / Place images in the `public` directory and reference them with absolute paths
3. **SEO**: 每篇文章会根据前置信息自动获得适当的元标签 / Each post automatically gets proper meta tags based on the front matter
4. **性能 / Performance**: 博客使用静态站点生成以获得最佳性能 / The blog uses static site generation for optimal performance

## 贡献 / Contributing

欢迎根据您的需要自定义和修改这个博客模板！/ Feel free to customize and modify this blog template for your needs!

---

## 项目特色 / Project Features

### 🚀 快速部署 / Quick Deployment

支持多种部署方式，从零配置的 Vercel 到传统的 Nginx 静态托管：

Supports multiple deployment methods, from zero-config Vercel to traditional Nginx static hosting:

- **一键部署 / One-click Deploy**: Vercel, Netlify
- **静态托管 / Static Hosting**: Nginx, Apache, GitHub Pages
- **Node.js 服务器 / Node.js Server**: 传统服务器部署 / Traditional server deployment

### 📝 内容管理 / Content Management

基于 Markdown 的简单内容管理：

Simple Markdown-based content management:

- 添加文件即发布 / Add files to publish
- 自动分类和标签 / Automatic categories and tags
- 无需数据库 / No database required

### 🎨 现代化设计 / Modern Design

使用 Tailwind CSS 构建的响应式设计：

Responsive design built with Tailwind CSS:

- 移动端友好 / Mobile-friendly
- 快速加载 / Fast loading
- SEO 优化 / SEO optimized