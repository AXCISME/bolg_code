/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 设置基础路径为 /blog
  basePath: '/blog',
  // 设置资源路径前缀
  assetPrefix: '/blog'
}

module.exports = nextConfig