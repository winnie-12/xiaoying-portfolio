<script setup>
import { profile } from '@/data/profile'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <SectionHeader title="About Me" subtitle="Get to know me" />

      <div class="about-text">
        <p v-for="paragraph in profile.about" :key="paragraph">{{ paragraph }}</p>
      </div>

      <div class="about-actions">
        <a :href="profile.resume" class="btn btn--solid" download>
          Download Resume
          <AppIcon name="download" :size="17" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-text {
  display: grid;
  gap: 1.25rem;
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
  line-height: 1.8;
  text-align: justify;
  hyphens: auto;
}


.about-actions {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}
</style>
