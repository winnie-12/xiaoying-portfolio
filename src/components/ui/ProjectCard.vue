<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
})
const emit = defineEmits(['open'])

// 没有封面图时，封面上显示的图标
const categoryIcons = {
  Web: 'code',
  Mobile: 'smartphone',
  Game: 'gamepad',
  'AR/VR': 'cube',
}
const coverIcon = categoryIcons[props.project.category] ?? 'code'
const coverVariant = props.index % 4
const techLine = props.project.tags.slice(0, 3).join(' / ')
</script>

<template>
  <article
    class="project-card"
    role="button"
    tabindex="0"
    :aria-label="`View details of ${project.title}`"
    @click="emit('open')"
    @keydown.enter="emit('open')"
    @keydown.space.prevent="emit('open')"
  >
    <div class="project-cover" :class="`cover-${coverVariant}`">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="`${project.title} preview`"
        loading="lazy"
      />
      <span v-else class="cover-icon">
        <AppIcon :name="coverIcon" :size="30" :stroke-width="1.6" />
      </span>
    </div>

    <div class="project-info">
      <div class="project-text">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-tech">{{ techLine }}</p>
      </div>

      <span class="project-arrow" aria-hidden="true">
        <AppIcon name="arrow-up-right" :size="18" :stroke-width="2" />
      </span>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  cursor: pointer;
  outline: none;
}
.project-card:focus-visible .project-cover {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

/* ---------- Cover ---------- */
.project-cover {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-inner);
  background: var(--cover-bg);
  transition: transform 0.18s;
}
.project-card:hover .project-cover {
  transform: translateY(-3px);
}
.cover-0 { --cover-bg: linear-gradient(135deg, #2d5be3, #6f9bff); }
.cover-1 { --cover-bg: linear-gradient(135deg, #0b7a6f, #3cc5b2); }
.cover-2 { --cover-bg: linear-gradient(135deg, #5b3fd1, #9887ff); }
.cover-3 { --cover-bg: linear-gradient(135deg, #1f44b8, #14a08f); }

.project-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
  background-size: 28px 28px;
}
.project-cover img {
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

/* ---------- Info row ---------- */
.project-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 0.15rem 0;
}

.project-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}

.project-tech {
  margin-top: 0.25rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.project-arrow {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-teal));
  color: #fff;
  transition: background-color 0.18s, transform 0.18s;
}
.project-card:hover .project-arrow {
  border-color: solid 1px var(--color-accent);
  color: var(--color-accent);
  background: transparent;
  transform: translate(2px, -2px);
}
</style>