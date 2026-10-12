<script setup>
import { ref } from 'vue'
import { profile } from '@/data/profile'
import AppIcon from '@/components/ui/AppIcon.vue'

const avatarSrc = ref(profile.avatar)
const useFallback = () => {
  if (avatarSrc.value !== profile.avatarFallback) avatarSrc.value = profile.avatarFallback
}
</script>

<template>
  <section id="home" class="hero">
    <!-- Elliptical grid background -->
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="container hero-container">
      <div class="hero-avatar" style="--i: 0">
        <img
          :src="avatarSrc"
          :alt="`${profile.name}'s profile photo`"
          width="144"
          height="144"
          @error="useFallback"
        />
      </div>

      <h1 class="hero-heading" style="--i: 1">{{ profile.name }}</h1>
      <p class="hero-subtitle" style="--i: 2">{{ profile.role }}</p>
      <p class="hero-description" style="--i: 3">{{ profile.intro }}</p>

      <a href="#about" class="hero-scroll" style="--i: 4" aria-label="Scroll to About section">
        <AppIcon name="arrow-down" :size="20" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: center;
  padding-block: clamp(4rem, 12vh, 8rem);
  overflow: hidden;
}

/* Grid lines fading out toward the edges */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(ellipse 62% 58% at 50% 42%, #000 15%, transparent 75%);
  mask-image: radial-gradient(ellipse 62% 58% at 50% 42%, #000 15%, transparent 75%);
}

.hero-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* The one orchestrated moment on the page: a staggered entrance */
.hero-container > * {
  animation: hero-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i) * 90ms);
}
@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

.hero-avatar {
  width: 9rem;
  height: 9rem;
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-accent-tint);
  box-shadow: 0 18px 40px -18px rgba(45, 91, 227, 0.45);
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-heading {
  margin-top: 1.75rem;
  font-size: clamp(2.6rem, 7.5vw, 4.75rem);
  font-weight: 800;
  letter-spacing: -0.035em;
}

.hero-subtitle {
  margin-top: 0.75rem;
  background: linear-gradient(90deg, var(--color-accent), var(--color-teal));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.4vw, 1.4rem);
  font-weight: 600;
}

.hero-description {
  max-width: 50rem;
  margin-top: 1.25rem;
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
}

.hero-scroll {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-top: 2.5rem;
  border: 1.5px solid var(--color-accent);
  border-radius: 50%;
  background: #fff;
  color: var(--color-accent);
  transition: border-color 0.18s, color 0.18s;
}
.hero-scroll:hover {
  border-color: var(--color-accent);
  background: linear-gradient(90deg, var(--color-accent), var(--color-teal));
  color: #fff;
}
</style>
