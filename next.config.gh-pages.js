/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages 部署配置
  // 如果是部署到子路径，启用 basePath 和 assetPrefix
  // 如果是部署到根域名，注释掉这两行
  basePath: process.env.GITHUB_PAGES ? '/blog' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/blog' : '',

  // 确保所有静态资源路径正确
  generateEtags: false,

  // 导出配置
  distDir: process.env.GITHUB_PAGES ? 'out' : '.next',
}

module.exports = nextConfig