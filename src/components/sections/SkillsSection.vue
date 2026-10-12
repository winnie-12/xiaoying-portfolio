<script setup>
import { skillRows } from '@/data/skills'
import SectionHeader from '@/components/ui/SectionHeader.vue'

// Devicon 图标（固定版本）。加载失败时隐藏图片，只留文字
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'
const logoUrl = (path) => `${DEVICON}/${path}.svg`
const hideLogo = (e) => {
  e.target.style.display = 'none'
}

// 每组技能重复一次，保证内容比屏幕宽，循环时不会出现空白
const loopItems = (items) => [...items, ...items]

// 给读屏软件用的完整列表（滚动区本身是 aria-hidden）
const allNames = skillRows.flatMap((row) => row.items.map((item) => item.name))
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <SectionHeader title="My Skills" subtitle="Technical skills" />
    </div>

    <ul class="visually-hidden">
      <li v-for="name in allNames" :key="name">{{ name }}</li>
    </ul>

    <!-- 滚动区不放进 container，这样可以铺满整个屏幕宽度 -->
    <div class="skills-marquee" aria-hidden="true">
      <div
        v-for="(row, r) in skillRows"
        :key="r"
        class="marquee-row"
        :class="`marquee-row--${row.direction}`"
        :style="{ '--duration': `${row.duration}s` }"
      >
        <div class="marquee-track">
          <!-- 两份一模一样的内容，动画移动 50% 后正好无缝接上 -->
          <div v-for="copy in 2" :key="copy" class="marquee-group">
            <span v-for="(item, i) in loopItems(row.items)" :key="`${copy}-${i}`" class="skill-chip">
              <img
                v-if="item.logo"
                :src="logoUrl(item.logo)"
                alt=""
                class="skill-chip-logo"
                loading="lazy"
                @error="hideLogo"
              />
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 只给读屏软件看 */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ---------- 滚动区 ---------- */
.skills-marquee {
  display: grid;
  gap: 1.25rem;
}

.marquee-row {
  --gap: 1.25rem;
  overflow: hidden;
  /* 上下留一点空间，避免卡片阴影被裁掉 */
  padding: 0.5rem 0;
  /* 左右两边淡出 */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-left var(--duration, 50s) linear infinite;
}
/* 向右滚动 = 同一个动画倒着播 */
.marquee-row--right .marquee-track {
  animation-direction: reverse;
}
/* 鼠标移上去暂停 */
.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  flex: none;
  gap: var(--gap);
  /* 用 padding 代替 gap，让两份内容之间的间距和卡片间距一致，循环才无缝 */
  padding-right: var(--gap);
}

@keyframes marquee-left {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- 技能卡片 ---------- */
.skill-chip {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.65rem;
  padding: 0.8rem 1.4rem;
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  color: var(--color-ink);
  font-size: 1.05rem;
  font-weight: 600;
  white-space: nowrap;
}
.skill-chip-logo {
  width: 1.6rem;
  height: 1.6rem;
  object-fit: contain;
}

@media (max-width: 40rem) {
  .marquee-row {
    --gap: 1rem;
  }
  .skill-chip {
    padding: 0.65rem 1.1rem;
    font-size: 0.95rem;
  }
  .skill-chip-logo {
    width: 1.35rem;
    height: 1.35rem;
  }
}

/* 系统设置了"减少动态效果"时：不自动滚，改成手动横向滑动 */
@media (prefers-reduced-motion: reduce) {
  .marquee-row {
    overflow-x: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }
  .marquee-track {
    animation: none;
  }
  .marquee-group:nth-child(2) {
    display: none;
  }
}
</style>