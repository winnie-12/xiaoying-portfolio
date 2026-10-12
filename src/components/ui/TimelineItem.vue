<script setup>
/**
 * One entry on a vertical timeline.
 *  - date:    text shown beside the line (e.g. "Mar 2026 – Aug 2026")
 *  - current: highlights the dot and shows a status chip
 *  - boxed:   set when the content is a bordered card, so the date and dot
 *             line up with the card's title instead of its top edge
 */
defineProps({
  date: { type: String, required: true },
  current: { type: Boolean, default: false },
  boxed: { type: Boolean, default: false },
  statusLabel: { type: String, default: 'Ongoing' },
})
</script>

<template>
  <li class="timeline-item" :class="{ 'is-current': current, 'is-boxed': boxed }">
    <div class="timeline-date">
      <span class="timeline-period">{{ date }}</span>
      <span v-if="current && statusLabel" class="timeline-status">{{ statusLabel }}</span>
    </div>

    <div class="timeline-rail" aria-hidden="true">
      <span class="timeline-dot"></span>
    </div>

    <div class="timeline-body">
      <slot />
    </div>
  </li>
</template>

<style scoped>
.timeline-item {
  --dot: 1rem;
  --offset: 0rem;
  --dot-top: calc(var(--offset) + 0.42rem);

  display: grid;
  grid-template-columns: 11rem 2.75rem minmax(0, 1fr);
  grid-template-areas: 'date rail body';
}

.timeline-item.is-boxed {
  --offset: 1.1rem;
}

/* ---------- Date column ---------- */
.timeline-date {
  grid-area: date;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  padding-top: calc(var(--offset) + 0.28rem);
  text-align: right;
}

.timeline-period {
  color: var(--color-ink-soft);
  font-size: 0.95rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
}

.timeline-status {
  padding: 0.12rem 0.65rem;
  border-radius: var(--radius-pill);
  background: var(--color-teal-tint);
  color: var(--color-teal);
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.5;
}

/* ---------- Rail: line + dot ---------- */
.timeline-rail {
  grid-area: rail;
  position: relative;
}

.timeline-rail::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: var(--color-rail);
}

/* The line starts at the first dot, and fades out after the last one */
.timeline-item:first-child .timeline-rail::before {
  top: calc(var(--dot-top) + var(--dot) / 2);
}

.timeline-item:last-child .timeline-rail::before {
  background: linear-gradient(to bottom, var(--color-rail) 50%, transparent);
}

.timeline-dot {
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

.is-current .timeline-dot {
  background: var(--color-accent);
  box-shadow: 0 0 0 5px var(--color-accent-tint);
}

/* ---------- Content ---------- */
.timeline-body {
  grid-area: body;
  min-width: 0;
  /* Spacing lives here (not on the <li>) so the rail stays continuous */
  padding-bottom: 2.75rem;
}

.timeline-item:last-child .timeline-body {
  padding-bottom: 0;
}

/* ---------- Mobile: line on the left, date above content ---------- */
@media (max-width: 44rem) {
  .timeline-item {
    --offset: 0rem !important;
    --dot-top: 0.28rem;
    grid-template-columns: 1.75rem minmax(0, 1fr);
    grid-template-areas:
      'rail date'
      'rail body';
  }

  .timeline-date {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0;
    margin-bottom: 0.75rem;
    text-align: left;
  }
}
</style>
