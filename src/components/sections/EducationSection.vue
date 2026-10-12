<script setup>
import { education } from '@/data/education'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <SectionHeader title="Education" subtitle="My academic background" />

      <ol class="edu-timeline">
        <li
          v-for="(edu, i) in education"
          :key="edu.school"
          class="edu-item"
          :class="{ 'is-current': edu.current, 'is-flipped': i % 2 === 1 }"
        >
          <!-- 日期 -->
          <p class="edu-date">{{ edu.period }}</p>

          <!-- 中间的线 + 圆点 -->
          <div class="edu-rail" aria-hidden="true">
            <span class="edu-dot"></span>
          </div>

          <!-- 学历资料 -->
          <article class="edu-info">
            <h3 class="edu-school">{{ edu.school }}</h3>
            <p class="edu-degree">{{ edu.degree }}</p>
            <p class="edu-cgpa">
              <span class="edu-cgpa-label">CGPA</span>
              <span class="edu-cgpa-value">{{ edu.cgpa }}</span>
            </p>

            <!-- 奖项：有 achievements 才显示 -->
            <div v-if="edu.achievements?.length" class="edu-honors">
              <h4 class="edu-honors-title">Achievements &amp; Honors</h4>
              <ul class="edu-honors-list">
                <li v-for="item in edu.achievements" :key="item.title" class="edu-honor">
                  <AppIcon name="award" :size="16" :stroke-width="2" class="edu-honor-icon" />
                  <p class="edu-honor-text">
                    <span class="edu-honor-name">{{ item.title }}</span>
                    <span v-if="item.detail" class="edu-honor-detail">{{ item.detail }}</span>
                  </p>
                </li>
              </ul>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.edu-timeline {
  --dot: 1rem;
  --dot-top: 0.42rem;
}

/* 每一行：左 | 中线 | 右 */
.edu-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2.75rem minmax(0, 1fr);
  grid-template-areas: 'date rail info';
  column-gap: 1rem;
}

/* 偶数行（第 2、4…个）左右对调：资料 | 线 | 日期 */
.edu-item.is-flipped {
  grid-template-areas: 'info rail date';
}

/* ---------- 日期 ---------- */
.edu-date {
  grid-area: date;
  padding-top: 0.28rem;
  color: var(--color-ink-soft);
  font-size: 0.95rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
  text-align: right; /* 日期在左边 → 靠右，贴近中线 */
}
.edu-item.is-flipped .edu-date {
  text-align: left; /* 日期在右边 → 靠左，贴近中线 */
}

/* ---------- 中线 + 圆点 ---------- */
.edu-rail {
  grid-area: rail;
  position: relative;
}
.edu-rail::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: var(--color-rail);
}
/* 线从第一个圆点开始，最后一个之后渐隐 */
.edu-item:first-child .edu-rail::before {
  top: calc(var(--dot-top) + var(--dot) / 2);
}
.edu-item:last-child .edu-rail::before {
  background: linear-gradient(to bottom, var(--color-rail) 50%, transparent);
}

.edu-dot {
  position: absolute;
  left: 50%;
  top: var(--dot-top);
  z-index: 1;
  width: var(--dot);
  height: var(--dot);
  transform: translateX(-50%);
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  background: #fff;
}
.is-current .edu-dot {
  background: var(--color-accent);
  box-shadow: 0 0 0 5px var(--color-accent-tint);
}

/* ---------- 学历资料 ---------- */
.edu-info {
  grid-area: info;
  min-width: 0;
  padding-bottom: 2.75rem;
}
.edu-item:last-child .edu-info {
  padding-bottom: 0;
}
/* 资料在左边时，文字靠右对齐，贴近中线 */
.edu-item.is-flipped .edu-info {
  text-align: right;
}

.edu-school {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}

.edu-degree {
  margin-top: 0.4rem;
  color: var(--color-ink-soft);
  font-size: 0.98rem;
  line-height: 1.6;
}

.edu-cgpa {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: 0.75rem;
}
.edu-item.is-flipped .edu-cgpa {
  justify-content: flex-end;
}
.edu-cgpa-label {
  color: var(--color-accent-strong);
  font-size: 0.85rem;
  font-weight: 600;
}
.edu-cgpa-value {
  color: var(--color-accent-strong);
  font-size: 0.95rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* ---------- 奖项 ---------- */
.edu-honors {
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-line);
}
.edu-honors-title {
  color: var(--color-muted);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.edu-honors-list {
  display: grid;
  gap: 0.7rem;
  margin-top: 0.75rem;
}
.edu-honor {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}
.edu-honor-icon {
  flex: none;
  margin-top: 0.18rem;
  color: var(--color-accent);
}
.edu-honor-text {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}
.edu-honor-name {
  color: var(--color-ink-soft);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.4;
}
.edu-honor-detail {
  color: var(--color-ink-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}

/* 资料在左边（翻转行）时：图标放在右边，文字靠右 */
.edu-item.is-flipped .edu-honor {
  flex-direction: row-reverse;
  text-align: right;
}

/* ---------- 手机：全部改成线在左边，日期在上，资料在下 ---------- */
@media (max-width: 44rem) {
  .edu-item,
  .edu-item.is-flipped {
    --dot-top: 0.28rem;
    grid-template-columns: 1.75rem minmax(0, 1fr);
    grid-template-areas:
      'rail date'
      'rail info';
    column-gap: 0;
  }

  .edu-date,
  .edu-item.is-flipped .edu-date {
    padding-top: 0;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .edu-item.is-flipped .edu-info,
  .edu-item.is-flipped .edu-cgpa {
    text-align: left;
    justify-content: flex-start;
  }
  .edu-item.is-flipped .edu-honor {
    flex-direction: row;
    text-align: left;
  }
}
</style>