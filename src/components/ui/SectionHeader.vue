<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <header class="section-header">
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.section-header {
  margin-bottom: clamp(2.5rem, 6vw, 3.75rem);
  text-align: center;
}

.section-title {
  font-size: clamp(2.1rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.section-subtitle {
  width: fit-content;
  margin: 0.6rem auto 0;
  background: linear-gradient(90deg, var(--color-accent), var(--color-teal));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-size: 1rem;
  font-weight: 500;
}
</style>
