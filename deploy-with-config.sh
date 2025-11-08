#!/bin/bash

# 智能部署脚本 - 根据部署方式自动配置

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

echo -e "${BLUE}🚀 Next.js 静态博客智能部署${NC}"
echo "=================================="
echo

# 选择部署方式
echo "请选择部署方式："
echo "1) GitHub Pages (子路径 /blog)"
echo "2) 自定义域名 (根路径)"
echo "3) Nginx/其他服务器 (根路径)"
echo

read -p "请输入选择 (1-3): " choice

case $choice in
    1)
        print_info "配置 GitHub Pages 子路径部署..."

        # 检查并备份原始配置
        if [ ! -f "next.config.original.js" ]; then
            cp next.config.js next.config.original.js
        fi

        # 使用子路径配置
        cp next.config.gh-pages.js next.config.js

        # 设置环境变量
        export GITHUB_PAGES=true

        print_info "使用子路径配置 (basePath: '/blog')"
        ;;
    2)
        print_info "配置自定义域名部署..."

        # 恢复原始配置
        if [ -f "next.config.original.js" ]; then
            cp next.config.original.js next.config.js
        fi

        export GITHUB_PAGES=false

        print_info "使用根路径配置"
        ;;
    3)
        print_info "配置 Nginx/其他服务器部署..."

        # 恢复原始配置
        if [ -f "next.config.original.js" ]; then
            cp next.config.original.js next.config.js
        fi

        export GITHUB_PAGES=false

        print_info "使用根路径配置"
        ;;
    *)
        print_error "无效选择"
        exit 1
        ;;
esac

# 清理旧的构建
print_info "清理旧的构建文件..."
npm run clean 2>/dev/null || rm -rf .next out

# 安装依赖
print_info "安装依赖..."
npm install

# 运行类型检查
print_info "运行类型检查..."
npm run type-check

# 运行代码检查
print_info "运行代码检查..."
npm run lint

# 构建项目
print_info "构建项目..."
npm run build

# 如果是 GitHub Pages 部署，运行路径修复
if [ "$choice" = "1" ]; then
    print_info "修复 GitHub Pages 路径..."
    ./fix-paths.sh
fi

# 部署
print_info "开始部署..."
if [ "$choice" = "1" ]; then
    # GitHub Pages 部署
    ./deploy-simple.sh
else
    # 其他部署方式
    ./deploy.sh
fi

print_success "🎉 部署完成！"

# 显示访问信息
echo
echo "访问信息："
echo "=================================="
case $choice in
    1)
        echo "- GitHub Pages: https://axcis.me"
        echo "- 博客路径: https://axcis.me/blog/"
        echo "- 根域名会自动重定向到博客"
        ;;
    2)
        echo "- 自定义域名: https://axcis.me"
        echo "- 确保 CNAME 文件已配置"
        ;;
    3)
        echo "- 服务器地址: 请配置你的服务器"
        echo "- 需要将 out/ 目录内容复制到服务器"
        ;;
esac