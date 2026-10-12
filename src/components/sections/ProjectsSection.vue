<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { projects } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import ProjectModal from '@/components/ui/ProjectModal.vue'

// 固定的筛选按钮（即使某个分类暂时没有项目也会显示）
const categories = ['All', 'Web', 'Mobile', 'Game', 'AR/VR']
const activeCategory = ref('All')
const selected = ref(null)

const scroller = ref(null)
const perView = ref(3) // 桌面 3 张，平板 2 张，手机 1 张
const page = ref(0)

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory.value),
)
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perView.value)))

// 翻一页要滚动的距离 = 一页卡片的宽度 + 间距
const getStep = () => {
  const el = scroller.value
  const card = el?.firstElementChild
  if (!el || !card) return 0
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  return (card.offsetWidth + gap) * perView.value
}

// 根据滚动位置更新当前是第几页
const updatePage = () => {
  const el = scroller.value
  if (!el) {
    page.value = 0
    return
  }
  const step = getStep()
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
  page.value = atEnd ? pages.value - 1 : step ? Math.round(el.scrollLeft / step) : 0
}

const syncLayout = () => {
  const w = window.innerWidth
  perView.value = w >= 1024 ? 3 : w >= 640 ? 2 : 1
  nextTick(updatePage)
}

const goTo = (target) => {
  const el = scroller.value
  if (!el) return
  const next = Math.min(Math.max(target, 0), pages.value - 1)
  el.scrollTo({ left: next * getStep(), behavior: 'smooth' })
}

watch(activeCategory, async () => {
  await nextTick()
  updatePage()
})

onMounted(() => {
  syncLayout()
  window.addEventListener('resize', syncLayout)
})
onBeforeUnmount(() => window.removeEventListener('resize', syncLayout))
</script>

<template>
  <section id="projects" class="section section--alt">
    <div class="container">
      <SectionHeader title="Projects" subtitle="Some of my work" />

      <div class="project-filters" role="group" aria-label="Filter projects by category">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="project-filter"
          :class="{ 'is-active': activeCategory === category }"
          :aria-pressed="activeCategory === category"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- 切换分类时 key 变化：回到第一页，卡片重新淡入 -->
      <div
        v-if="filtered.length"
        ref="scroller"
        :key="activeCategory"
        class="project-scroller"
        :style="{ '--per-view': perView }"
        @scroll.passive="updatePage"
      >
        <ProjectCard
          v-for="(project, i) in filtered"
          :key="project.title"
          :project="project"
          :index="projects.indexOf(project)"
          :style="{ '--delay': `${i * 50}ms` }"
          @open="selected = project"
        />
      </div>

      <p v-else class="project-empty">No projects in this category yet.</p>

      <!-- 翻页器：只有圆点，可以点击跳页 -->
      <div v-if="pages > 1" class="project-pager">
        <div class="project-dots">
          <button
            v-for="n in pages"
            :key="n"
            type="button"
            class="project-dot"
            :class="{ 'is-active': page === n - 1 }"
            :aria-label="`Go to page ${n}`"
            :aria-current="page === n - 1 ? 'true' : undefined"
            @click="goTo(n - 1)"
          ></button>
        </div>
      </div>
    </div>

    <ProjectModal :project="selected" :index="projects.indexOf(selected)" @close="selected = null" />
  </section>
</template>

<style scoped>
.project-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.project-filter {
  padding: 0.55rem 1.4rem;
  border: 1.5px solid var(--color-line);
  border-radius: var(--radius-pill);
  background: #fff;
  color: var(--color-ink-soft);
  font-size: 0.92rem;
  font-weight: 500;
  transition: border-color 0.18s, background-color 0.18s, color 0.18s;
}
.project-filter:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.project-filter.is-active {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: #fff;
}

/* ---------- 横向滚动：一页正好 --per-view 张 ---------- */
.project-scroller {
  --gap: 1.75rem;
  display: flex;
  gap: var(--gap);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  /* 四周留白，避免阴影、hover 上移和 focus 外框被裁掉；负 margin 把位置补回来 */
  padding: 1rem 0.75rem 1.5rem;
  margin: -1rem -0.75rem 0;
  scroll-padding-inline: 0.75rem;
}
.project-scroller::-webkit-scrollbar {
  display: none;
}

.project-scroller :deep(.project-card) {
  flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
  min-width: 0;
  scroll-snap-align: start;
  animation: project-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--delay, 0ms);
}
@keyframes project-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

@media (max-width: 40rem) {
  .project-scroller {
    --gap: 1.25rem;
  }
}

/* ---------- 翻页器：圆点 ---------- */
.project-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.project-dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.project-dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: var(--radius-pill);
  background: #cbd3e1;
  cursor: pointer;
  transition: width 0.3s ease, background-color 0.3s ease;
}
.project-dot:hover {
  background: #a9b4c9;
}
.project-dot.is-active {
  width: 1.6rem;
  background: var(--color-accent);
}

.project-empty {
  text-align: center;
  color: var(--color-muted);
}

/* 系统设置了"减少动态效果"时，关掉动画 */
@media (prefers-reduced-motion: reduce) {
  .project-scroller :deep(.project-card) {
    animation: none;
  }
}
</style>