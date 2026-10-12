<script setup>
import { contacts } from '@/data/contact'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section id="contact" class="section section--alt">
    <div class="container">
      <SectionHeader title="Contact" subtitle="Let's connect" />

      <ul class="contact-grid">
        <li v-for="item in contacts" :key="item.label">
          <a
            class="card contact-card"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener' : undefined"
            :aria-label="`${item.label}: ${item.value}`"
          >
            <span class="contact-top">
              <span class="contact-icon">
                <AppIcon :name="item.icon" :size="22" />
              </span>
              <AppIcon name="arrow-up-right" :size="18" :stroke-width="2" class="contact-arrow" />
            </span>

            <span class="contact-text">
              <span class="contact-label">{{ item.label }}</span>
              <span class="contact-value">{{ item.value }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  padding: 1.6rem;
  color: inherit;
  text-decoration: none;
  transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
}
.contact-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-accent);
}
.contact-card:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.contact-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.contact-icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.8rem;
  background: var(--color-accent-tint);
  color: var(--color-accent);
}

.contact-arrow {
  color: var(--color-muted);
  transition: color 0.18s, transform 0.18s;
}
.contact-card:hover .contact-arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

.contact-text {
  display: grid;
  gap: 0.2rem;
  min-width: 0;
}
.contact-label {
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 600;
}
.contact-value {
  color: var(--color-ink);
  font-size: 1.05rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

@media (max-width: 52rem) {
  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>