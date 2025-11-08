#!/bin/bash

# 简化的部署脚本 - 避免分支问题
# 直接推送到 gh-pages 分支

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# 检查 out 目录
if [ ! -d "out" ] || [ -z "$(ls -A out)" ]; then
    print_error "out 目录不存在或为空，请先运行 'npm run build'"
    exit 1
fi

REPO_URL="git@github.com:AXCISME/blog.git"
TEMP_DIR=$(mktemp -d)

print_info "🚀 开始部署到 GitHub..."

# 复制文件到临时目录
cp -r out/* "$TEMP_DIR/"
touch "$TEMP_DIR/.nojekyll"

# 如果存在 CNAME 文件，复制它
if [ -f "CNAME" ]; then
    cp "CNAME" "$TEMP_DIR/"
    print_info "已复制 CNAME 文件"
fi

cd "$TEMP_DIR"

# 初始化 Git 仓库
git init
git config user.name "Deploy Bot"
git config user.email "deploy@noreply.com"

# 添加远程仓库
git remote add origin "$REPO_URL"

# 添加并提交
git add .
git commit -m "🚀 Deploy blog - $(date '+%Y-%m-%d %H:%M:%S')"

print_warning "准备推送到 master 分支..."
print_warning "按任意键继续，Ctrl+C 取消"
read -n 1 -s

# 推送到 master 分支
git push origin HEAD:master --force

# 清理
cd - > /dev/null
rm -rf "$TEMP_DIR"

print_success "🎉 部署完成！"
print_info "访问 https://axcis.me 查看你的博客"