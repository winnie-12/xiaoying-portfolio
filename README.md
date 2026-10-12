# Tai Xiao Ying · Portfolio

Vue 3 + Vite 个人作品集网站（浅色主题）。

## 运行

```bash
npm install
npm run dev       # 开发：http://localhost:5173
npm run build     # 构建到 dist/
npm run preview   # 预览构建结果
```

需要 Node.js 20.19+ 或 22.12+。

## 你需要替换的内容

| 内容 | 位置 |
| --- | --- |
| 头像 | 放一张 `public/avatar.jpg`（不放则显示占位头像） |
| 简历 | 放一个 `public/resume.pdf` |
| 姓名 / 邮箱 / 简介 / About 文案 / GitHub、LinkedIn | `src/data/profile.js` |
| 工作经历 | `src/data/experience.js`（MIQ 项目的描述还是占位文字） |
| 教育经历 | `src/data/education.js` |
| 项目列表 | `src/data/projects.js`（带 "Sample" 的是示例，请替换或删除） |
| 技能卡片 | `src/data/skills.js` |
| 颜色 / 字体 / 圆角 | `src/styles/tokens.css` |

项目封面图：把图片放进 `public/projects/`，在 `projects.js` 里写 `image: '/projects/xxx.jpg'`；不写则自动生成渐变封面。
筛选按钮会根据 `category` 自动生成。

## 目录结构

```
src/
├─ main.js                  入口，引入字体与全局样式
├─ App.vue                  页面组装
├─ styles/
│  ├─ tokens.css            设计变量（颜色、字体、圆角…）
│  ├─ base.css              重置与全局基础样式
│  └─ utilities.css         .container / .section / .card / .btn
├─ data/                    所有可编辑内容（组件只负责展示）
├─ composables/
│  └─ useActiveSection.js   滚动时高亮当前导航项
└─ components/
   ├─ layout/               Navbar、SiteFooter
   ├─ sections/             Hero、About、Experience、Education、Projects、Skills
   └─ ui/                   Timeline、TimelineItem、SectionHeader、ProjectCard、AppIcon
```

Experience 与 Education 共用 `Timeline` / `TimelineItem` 组件；要新增一个时间线条目，只需在对应的 `data` 文件里加一项。
