<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps({
  project: { type: Object, default: null },
  index: { type: Number, default: 0 },
})
const emit = defineEmits(['close'])

// 和 ProjectCard 保持一致：没有封面图时显示的图标
const categoryIcons = {
  Web: 'code',
  Mobile: 'smartphone',
  Game: 'gamepad',
  'AR/VR': 'cube',
}
const coverIcon = computed(() => categoryIcons[props.project?.category] ?? 'code')
const coverVariant = computed(() => Math.max(0, props.index) % 4)

// 源码是 GitHub 链接就显示 GitHub 图标，否则显示代码图标
const sourceIcon = computed(() =>
  props.project?.source?.includes('github.com') ? 'github' : 'code',
)

const onKeydown = (e) => {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  (project) => {
    document.body.style.overflow = project ? 'hidden' : ''
    if (project) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="project" class="modal-backdrop" @click.self="emit('close')">
        <div
          class="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <!-- 关闭按钮在滚动区外面，内容滚动时不会跟着走 -->
          <button type="button" class="modal-close" aria-label="Close" @click="emit('close')">
            <AppIcon name="close" :size="18" :stroke-width="2" />
          </button>

          <div class="modal-scroll">
            <!-- 封面：和卡片同款 -->
            <div class="modal-cover" :class="`cover-${coverVariant}`">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="`${project.title} preview`"
              />
              <span v-else class="cover-icon">
                <AppIcon :name="coverIcon" :size="30" :stroke-width="1.6" />
              </span>
            </div>

            <div class="modal-body">
              <p class="modal-category">{{ project.category }}</p>
              <h3 id="project-modal-title" class="modal-title">{{ project.title }}</h3>
              <p class="modal-description">{{ project.description }}</p>

              <template v-if="project.points?.length">
                <h4 class="modal-heading">What I did</h4>
                <ul class="modal-list">
                  <li v-for="point in project.points" :key="point">{{ point }}</li>
                </ul>
              </template>

              <ul v-if="project.tags?.length" class="modal-tags" aria-label="Technologies used">
                <li v-for="tag in project.tags" :key="tag" class="modal-tag">{{ tag }}</li>
              </ul>

              <div
                v-if="project.link || project.source || project.apk || project.play || project.demo"
                class="modal-actions"
              >
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener"
                  class="modal-btn"
                >
                  Visit Site
                  <AppIcon name="arrow-up-right" :size="16" :stroke-width="2" />
                </a>
                <a
                  v-if="project.source"
                  :href="project.source"
                  target="_blank"
                  rel="noopener"
                  class="modal-btn modal-btn--outline"
                >
                  <AppIcon :name="sourceIcon" :size="16" :stroke-width="2" />
                  Source Code
                </a>
                <a
                  v-if="project.apk"
                  :href="project.apk"
                  download
                  class="modal-btn modal-btn--outline"
                >
                  <AppIcon name="download" :size="16" :stroke-width="2" />
                  Download APK
                </a>
                <a
                  v-if="project.play"
                  :href="project.play"
                  target="_blank"
                  rel="noopener"
                  class="modal-btn modal-btn--outline"
                >
                  <AppIcon name="play" :size="16" :stroke-width="2" />
                  Play Game
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener"
                  class="modal-btn modal-btn--outline"
                >
                  <AppIcon name="play" :size="16" :stroke-width="2" />
                  Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  overflow-y: auto;
}

.modal-panel {
  position: relative;
  width: min(100%, 38rem);
  overflow: hidden;
  border-radius: var(--radius-inner);
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
}

/* 只有这一层滚动 */
.modal-scroll {
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
}

/* ---------- 关闭按钮：白色半透明圆形，固定在弹窗右上角 ---------- */
.modal-close {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
  color: var(--color-ink);
  cursor: pointer;
  transition: transform 0.18s, background-color 0.18s;
}
.modal-close:hover {
  background: #fff;
  transform: scale(1.06);
}

/* ---------- 封面 ---------- */
.modal-cover {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  background: var(--cover-bg);
}
.cover-0 { --cover-bg: linear-gradient(135deg, #2d5be3, #6f9bff); }
.cover-1 { --cover-bg: linear-gradient(135deg, #0b7a6f, #3cc5b2); }
.cover-2 { --cover-bg: linear-gradient(135deg, #5b3fd1, #9887ff); }
.cover-3 { --cover-bg: linear-gradient(135deg, #1f44b8, #14a08f); }

.modal-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
  background-size: 28px 28px;
}
.modal-cover img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  backdrop-filter: blur(4px);
}

/* ---------- 内容 ---------- */
.modal-body {
  padding: 1.75rem 2rem 2rem;
}

.modal-category {
  color: var(--color-teal);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.modal-title {
  margin-top: 0.4rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.modal-description {
  margin-top: 0.75rem;
  color: var(--color-ink-soft);
  line-height: 1.7;
}

.modal-heading {
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
}

.modal-list {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.7rem;
  color: var(--color-ink-soft);
  font-size: 0.98rem;
  line-height: 1.6;
}
.modal-list li {
  position: relative;
  padding-left: 1.1rem;
}
.modal-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.55;
}

/* ---------- 标签：灰色，不用 accent ---------- */
.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
.modal-tag {
  padding: 0.2rem 0.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-ink-soft);
  font-size: 0.82rem;
  font-weight: 500;
}

/* ---------- 按钮区：分隔线在标签下面（没有按钮时线也不会出现） ---------- */
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-line);
}

/* accent 只用在按钮上 */
.modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  border: 1.5px solid var(--color-accent);
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: #fff;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.2;
  transition: background-color 0.18s, border-color 0.18s, color 0.18s;
}
.modal-btn:hover {
  border-color: var(--color-accent-strong);
  background: var(--color-accent-strong);
}
.modal-btn--outline {
  background: #fff;
  color: var(--color-accent);
}
.modal-btn--outline:hover {
  background: var(--color-accent-tint);
  color: var(--color-accent-strong);
}

/* ---------- 打开/关闭动画 ---------- */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: translateY(12px) scale(0.98);
}
</style>