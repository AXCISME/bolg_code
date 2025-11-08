# 子路径部署指南

## 🔧 问题说明

GitHub Pages 部署静态网站时，如果希望网站通过子路径访问（如 `https://axcis.me/blog/`），需要解决以下问题：

1. **静态资源路径不匹配** - CSS、JS 文件路径错误
2. **路由路径错误** - 页面链接指向错误路径
3. **根路径访问** - 用户访问根域名时需要重定向

## 🚀 解决方案

### 方法1：智能部署脚本（推荐）

```bash
# 运行智能部署脚本，选择 GitHub Pages 子路径部署
./deploy-with-config.sh
```

选择选项 `1) GitHub Pages (子路径 /blog)`，脚本会自动：
- 配置 `basePath: '/blog'`
- 配置 `assetPrefix: '/blog'`
- 修复静态文件路径
- 创建根目录重定向文件

### 方法2：手动配置

#### 1. 修改 Next.js 配置

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 关键配置
  basePath: '/blog',
  assetPrefix: '/blog'
}

module.exports = nextConfig
```

#### 2. 构建和修复路径

```bash
# 构建项目
npm run build

# 修复路径
./fix-paths.sh

# 部署
./deploy-simple.sh
```

## 📁 文件结构

部署后的文件结构：

```
out/
├── index.html          # 根目录重定向文件
├── 404.html           # 404 页面
├── robots.txt         # 搜索引擎配置
├── .nojekyll          # 禁用 Jekyll 处理
├── blog/              # 博客内容
│   ├── index.html     # 首页
│   ├── blog/          # 博客列表和文章
│   ├── category/      # 分类页面
│   └── tag/           # 标签页面
├── _next/             # Next.js 静态资源
└── category/          # 分类页面（根级别）
```

## 🔍 访问方式

### 根域名访问
- URL: `https://axcis.me`
- 行为: 显示优雅的欢迎页面，提供手动跳转链接
- 特点: 无自动重定向，避免浏览器卡顿

### 子路径访问
- URL: `https://axcis.me/blog/`
- 行为: 直接显示博客首页
- 特点: 最快访问方式，推荐使用

### 具体页面
- 博客列表: `https://axcis.me/blog/blog/`
- 文章页面: `https://axcis.me/blog/blog/article-slug/`
- 分类页面: `https://axcis.me/blog/category/category-name/`
- 标签页面: `https://axcis.me/blog/tag/tag-name/`

## ⚙️ GitHub Pages 设置

1. 进入仓库 Settings
2. 找到 Pages
3. Source: Deploy from a branch
4. Branch: master
5. Folder: / (root)
6. 点击 Save

## 🛠️ 故障排除

### 问题1：静态资源 404
**症状**: CSS、JS 文件无法加载
**解决**: 确保 `basePath` 和 `assetPrefix` 正确配置

### 问题2：页面链接错误
**症状**: 点击链接跳转到 404 页面
**解决**: 重新构建项目并运行路径修复脚本

### 问题3：根域名页面显示异常
**症状**: 根域名访问时页面格式混乱
**解决**: 检查 `index.html` 是否正确生成，确保 CSS 样式完整

### 问题4：浏览器卡顿或循环
**症状**: 页面反复刷新或加载缓慢
**解决**: 新方案已移除自动重定向，如仍有问题请清除浏览器缓存

## 📝 开发注意事项

### 本地开发
本地开发时，访问地址为 `http://localhost:3000/blog/`

### 链接使用
在代码中继续使用相对路径：
```jsx
<Link href="/blog/page">页面链接</Link>
```

Next.js 会自动添加 `basePath` 前缀。

### 静态资源
在代码中引用静态资源：
```jsx
<Image src="/image.jpg" alt="图片" />
```

Next.js 会自动添加 `assetPrefix` 前缀。

## 🔄 切换部署方式

如果需要切换到根路径部署：

```bash
# 恢复原始配置
cp next.config.original.js next.config.js

# 重新构建
npm run build

# 部署
./deploy.sh
```