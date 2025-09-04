# Monitor Animation

一个基于 React + Vite 的动画效果展示项目。

## 🌐 在线预览

项目已部署到 GitHub Pages，可以直接访问：
[https://yozyan.github.io/monitor_amination/](https://yozyan.github.io/monitor_amination/)

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone git@github.com:yozyan/monitor_amination.git
cd monitor_amination

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建项目

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📦 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages：

1. 当代码推送到 `main` 分支时，会自动触发部署流程
2. GitHub Actions 会自动构建项目并部署到 GitHub Pages
3. 部署完成后，可以通过上面的链接访问

## 🔄 开发流程

为了便于代码管理和回退，建议使用以下开发流程：

### 1. 创建功能分支

```bash
# 从 develop 分支创建新的功能分支
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. 开发和提交

```bash
# 进行开发工作
# ...

# 提交更改
git add .
git commit -m "feat: 添加新功能"
git push origin feature/your-feature-name
```

### 3. 创建 Pull Request

1. 在 GitHub 上创建从 `feature/your-feature-name` 到 `develop` 的 Pull Request
2. 进行代码审查
3. 合并到 `develop` 分支

### 4. 发布到生产环境

```bash
# 将 develop 分支合并到 main 分支
git checkout main
git pull origin main
git merge develop
git push origin main
```

### 5. 回退操作

如果需要回退某个更改：

```bash
# 查看提交历史
git log --oneline

# 回退到指定提交
git revert <commit-hash>

# 或者重置到指定提交（谨慎使用）
git reset --hard <commit-hash>
```

## 📁 项目结构

```
monitor_amination/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── src/
│   ├── components/             # React 组件
│   │   ├── AnimatedBackground.tsx
│   │   ├── FloatingElements.tsx
│   │   ├── GlowingOrbs.tsx
│   │   ├── ParticleSystem.tsx
│   │   └── WaveAnimation.tsx
│   ├── App.tsx                 # 主应用组件
│   ├── main.tsx               # 应用入口
│   └── index.css              # 全局样式
├── public/                     # 静态资源
├── vite.config.ts             # Vite 配置
├── package.json               # 项目依赖
└── README.md                  # 项目说明
```

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **CSS3** - 样式和动画
- **GitHub Pages** - 静态网站托管
- **GitHub Actions** - CI/CD 自动化

## 📝 开发注意事项

1. 所有新功能都应该在 `develop` 分支或功能分支上开发
2. 直接推送到 `main` 分支会触发自动部署
3. 使用 Pull Request 进行代码审查，确保代码质量
4. 提交信息请遵循约定式提交规范

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request