# 部署指南 / Deployment Guide

## 快速部署 / Quick Deployment

### Vercel (推荐 / Recommended)

1. Fork 此仓库到你的 GitHub 账户
2. 访问 [vercel.com](https://vercel.com) 并导入你的仓库
3. Vercel 会自动检测 Next.js 项目并完成部署

### Netlify

1. Fork 此仓库
2. 访问 [netlify.com](https://netlify.com) 并连接你的 GitHub
3. 设置构建命令：`npm run build`
4. 设置发布目录：`out`
5. 部署完成

### 静态服务器 (Nginx/Apache) / Static Server

1. 克隆仓库并安装依赖：
   ```bash
   git clone <your-repo-url>
   cd blog
   npm install
   ```

2. 构建静态文件：
   ```bash
   npm run build
   ```

3. 将 `out` 目录中的文件复制到你的 Web 服务器：
   ```bash
   sudo cp -r out/* /var/www/html/
   ```

4. 配置 Nginx：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ $uri.html /index.html;
       }
   }
   ```

## 自定义配置 / Customization

### 修改网站信息 / Edit Site Info

编辑 `app/layout.tsx` 中的元数据：
- 网站标题
- 描述信息
- 语言设置

### 添加博客文章 / Add Blog Posts

1. 在 `posts/` 目录创建 `.md` 文件
2. 添加前置信息：
   ```markdown
   ---
   title: "文章标题"
   date: "2024-01-15"
   excerpt: "文章简介"
   tags: ["标签1", "标签2"]
   category: "分类"
   ---
   ```

### 样式定制 / Customize Styles

编辑 `tailwind.config.js` 和 `app/globals.css` 来自定义样式

## 开发 / Development

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 格式化代码
npm run format

# 类型检查
npm run type-check

# 构建项目
npm run build
```

访问 http://localhost:3000 查看开发版本。