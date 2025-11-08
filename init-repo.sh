#!/bin/bash

# 初始化远程仓库脚本
# 如果远程仓库是空的，创建初始提交

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

REPO_URL="git@github.com:AXCISME/blog.git"

print_info "检查远程仓库状态..."

# 检查远程仓库是否可访问
if ! git ls-remote "$REPO_URL" &> /dev/null; then
    print_error "无法访问远程仓库，请检查 SSH 密钥配置"
    print_info "运行以下命令添加 SSH 密钥："
    print_info "  ssh-add ~/.ssh/id_rsa"
    print_info "  ssh -T git@github.com"
    exit 1
fi

# 检查远程仓库是否有提交
REMOTE_COMMITS=$(git ls-remote "$REPO_URL" | wc -l)
if [ "$REMOTE_COMMITS" -eq 0 ]; then
    print_warning "远程仓库是空的，正在创建初始提交..."

    # 创建临时目录
    TEMP_DIR=$(mktemp -d)
    cd "$TEMP_DIR"

    # 初始化仓库
    git init
    git config user.name "Blog Bot"
    git config user.email "bot@noreply.com"

    # 创建初始 README
    cat > README.md << 'EOF'
# My Blog

This blog is powered by Next.js and deployed to GitHub Pages.

---

## 🚀 Generated with [Claude Code](https://claude.ai/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF

    # 创建 .nojekyll 文件
    touch .nojekyll

    # 添加并提交
    git add .
    git commit -m "🎉 Initial commit - Blog setup"

    # 推送到远程仓库
    git remote add origin "$REPO_URL"
    git push -u origin master

    # 清理
    cd - > /dev/null
    rm -rf "$TEMP_DIR"

    print_success "初始提交创建完成！"
else
    print_success "远程仓库已有内容，跳过初始化"
fi

print_success "仓库准备完成，现在可以使用部署脚本了！"