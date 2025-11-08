# 部署步骤说明

## 🔧 首次部署步骤

### 1. 检查 SSH 密钥配置

确保你的 SSH 密钥已经添加到 GitHub：

```bash
# 检查 SSH 连接
ssh -T git@github.com

# 如果连接成功，你会看到：
# Hi AXCISME! You've successfully authenticated, but GitHub does not provide shell access.
```

如果连接失败，请配置 SSH 密钥：

```bash
# 生成新的 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加 SSH 私钥
ssh-add ~/.ssh/id_ed25519

# 复制公钥到剪贴板
cat ~/.ssh/id_ed25519.pub

# 然后到 GitHub Settings > SSH and GPG keys 添加公钥
```

### 2. 选择部署方法

#### 方法 A：使用简化部署脚本（推荐）

```bash
# 如果远程仓库是空的，先运行初始化
./init-repo.sh

# 构建项目
npm run build

# 部署到 master 分支
./deploy-simple.sh
```

#### 方法 B：使用原始部署脚本

```bash
# 构建项目
npm run build

# 部署（自动检测分支，默认 master）
./deploy.sh
```

#### 方法 C：手动部署

```bash
# 构建项目
npm run build

# 创建临时目录
mkdir -p temp-deploy
cp -r out/* temp-deploy/
cd temp-deploy

# 初始化 Git
git init
git config user.name "Deploy Bot"
git config user.email "deploy@noreply.com"
git remote add origin git@github.com:AXCISME/blog.git

# 添加文件
git add .
git commit -m "🚀 Deploy blog"

# 推送到远程仓库
git push -f origin HEAD:master

# 清理
cd ..
rm -rf temp-deploy
```

### 3. 配置 GitHub Pages

使用 `master` 分支：

1. 进入 GitHub 仓库页面
2. 点击 Settings
3. 找到 Pages
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "master"
6. 文件夹选择 "/ (root)"
7. 点击 Save

### 4. 配置自定义域名（可选）

```bash
# 复制 CNAME 文件
cp CNAME.example CNAME

# 编辑 CNAME 文件，填入你的域名
nano CNAME
```

然后将 CNAME 文件推送到仓库。

## 🔍 故障排除

### 错误：Permission denied (publickey)
- 检查 SSH 密钥是否正确配置
- 确保密钥已添加到 GitHub

### 错误：src refspec main does not match any
- 使用 `deploy-simple.sh` 脚本，它会推送到 master 分支
- 或者先运行 `init-repo.sh` 初始化远程仓库
- 确保推送到 master 分支而不是 main

### 错误：Repository not found
- 检查仓库地址是否正确
- 确保你有仓库的推送权限

### GitHub Pages 不显示内容
- 检查 Pages 设置是否正确
- 等待几分钟让 GitHub 处理
- 确保 `.nojekyll` 文件存在

## 📱 移动端部署

如果你在手机或平板上，可以使用 GitHub Actions 自动部署：

1. 确保仓库启用了 GitHub Actions
2. 推送代码到 main 分支
3. GitHub Actions 会自动构建并部署

查看 `.github/workflows/deploy.yml` 了解详情。