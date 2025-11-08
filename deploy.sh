#!/bin/bash

# 静态博客一键部署脚本
# 将 out 目录内容强制推送到 GitHub 仓库

set -e  # 遇到错误时立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}[$(date '+%Y-%m-%d %H:%M:%S')] ${message}${NC}"
}

print_success() {
    print_message "$GREEN" "✅ $1"
}

print_error() {
    print_message "$RED" "❌ $1"
}

print_warning() {
    print_message "$YELLOW" "⚠️  $1"
}

print_info() {
    print_message "$BLUE" "ℹ️  $1"
}

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    print_error "请确保在项目根目录运行此脚本"
    exit 1
fi

# 检查 out 目录是否存在
if [ ! -d "out" ]; then
    print_error "out 目录不存在，请先运行 'npm run build' 构建项目"
    exit 1
fi

# 检查 out 目录是否为空
if [ -z "$(ls -A out)" ]; then
    print_error "out 目录为空，请先运行 'npm run build' 构建项目"
    exit 1
fi

# 获取远程仓库地址
REPO_URL="git@github.com:AXCISME/blog.git"

print_info "开始部署静态博客到 GitHub..."
print_info "目标仓库: $REPO_URL"

# 创建临时目录
TEMP_DEPLOY_DIR=$(mktemp -d)
print_info "创建临时部署目录: $TEMP_DEPLOY_DIR"

# 清理函数
cleanup() {
    rm -rf "$TEMP_DEPLOY_DIR"
    print_info "清理临时文件"
}
trap cleanup EXIT

# 复制 out 目录内容到临时目录
print_info "复制构建文件到临时目录..."
cp -r out/* "$TEMP_DEPLOY_DIR/"

# 添加 .nojekyll 文件（确保 GitHub Pages 正确处理）
touch "$TEMP_DEPLOY_DIR/.nojekyll"

# 添加 CNAME 文件（如果存在的话）
if [ -f "CNAME" ]; then
    cp "CNAME" "$TEMP_DEPLOY_DIR/"
    print_info "复制 CNAME 文件"
fi

# 进入临时目录并初始化 Git
cd "$TEMP_DEPLOY_DIR"

# 初始化 Git 仓库
print_info "初始化 Git 仓库..."
git init

# 配置 Git 用户信息（如果未配置）
if [ -z "$(git config user.name)" ]; then
    git config user.name "Blog Deploy Bot"
    git config user.email "deploy@noreply.com"
    print_info "配置 Git 用户信息"
fi

# 添加远程仓库
print_info "添加远程仓库..."
git remote add origin "$REPO_URL"

# 添加所有文件
print_info "添加所有文件到 Git..."
git add .

# 提交更改
COMMIT_MESSAGE="🚀 Deploy static blog - $(date '+%Y-%m-%d %H:%M:%S')"
print_info "提交更改..."
git commit -m "$COMMIT_MESSAGE"

# 检查远程仓库是否存在
print_info "检查远程仓库状态..."
if ! git ls-remote origin &> /dev/null; then
    print_error "无法连接到远程仓库，请检查 SSH 密钥配置和仓库地址"
    exit 1
fi

# 获取远程仓库的默认分支
REMOTE_BRANCH=$(git ls-remote --symref origin HEAD | sed -n 's|^ref: refs/heads/||p' | head -1)
if [ -z "$REMOTE_BRANCH" ]; then
    REMOTE_BRANCH="master"  # 默认使用 master
fi

print_info "远程仓库默认分支: $REMOTE_BRANCH"

# 强制推送到远程分支
print_warning "准备强制推送到远程仓库（这会覆盖远程仓库的内容）"
print_warning "按 Ctrl+C 取消，按任意键继续..."
read -n 1 -s

print_info "强制推送到 $REMOTE_BRANCH 分支..."
git push -f origin HEAD:"$REMOTE_BRANCH"

# 返回原目录
cd - > /dev/null

print_success "🎉 部署完成！"
print_info "你的博客已成功部署到 GitHub Pages"
print_info "几分钟后，你就可以通过 https://axcis.me 访问你的博客了"

# 可选：清理本地的 out 目录
read -p "是否删除本地的 out 目录？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf out
    print_info "已删除本地 out 目录"
fi

print_success "部署脚本执行完毕！"