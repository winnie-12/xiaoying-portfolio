import { profile } from '@/data/profile'

// icon:     AppIcon.vue 里的图标名
// value:    卡片上显示的文字（简短就好，完整网址放在 href）
// href:     点击后打开的链接（邮箱用 mailto:）
// external: true 表示在新分页打开
export const contacts = [
  {
    label: 'LinkedIn',
    value: 'XiaoYing Tai',
    href: 'https://www.linkedin.com/in/xiaoying-tai-2a456b275/',
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'GitHub',
    value: '@winnie-12',
    href: 'https://github.com/winnie-12',
    icon: 'github',
    external: true,
  },
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
  },
]