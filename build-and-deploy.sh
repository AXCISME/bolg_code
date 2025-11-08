#!/bin/bash

# 一键构建和部署脚本
# 自动构建项目并推送到 GitHub

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始构建和部署静态博客...${NC}"

# 1. 清理旧的构建文件
echo -e "${BLUE}🧹 清理旧的构建文件...${NC}"
npm run clean 2>/dev/null || rm -rf .next out

# 2. 安装依赖
echo -e "${BLUE}📦 安装依赖...${NC}"
npm install

# 3. 运行类型检查
echo -e "${BLUE}🔍 运行类型检查...${NC}"
npm run type-check

# 4. 运行代码检查
echo -e "${BLUE}🔧 运行代码检查...${NC}"
npm run lint

# 5. 构建项目
echo -e "${BLUE}🏗️  构建项目...${NC}"
npm run build

# 6. 执行部署
echo -e "${BLUE}📤 开始部署...${NC}"
./deploy.sh

echo -e "${GREEN}🎉 构建和部署完成！${NC}"