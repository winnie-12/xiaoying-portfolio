<script setup>
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p class="footer-copy">© {{ year }} {{ profile.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-line);
  padding-block: 2rem;
  background: var(--color-surface);
}

.footer-copy {
  color: var(--color-muted);
  font-size: 0.9rem;
  text-align: center;
}
</style>