<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/composables/useActiveSection'
import AppIcon from '@/components/ui/AppIcon.vue'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
]

const mobileOpen = ref(false)
const scrolled = ref(false)
const activeId = useActiveSection(['home', ...navLinks.map((l) => l.id), 'contact'])

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': scrolled || mobileOpen, 'is-open': mobileOpen }">
    <nav class="navbar-inner container" aria-label="Main navigation">
      <a href="#home" class="navbar-brand">{{ profile.name }}</a>

      <div class="navbar-links">
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="navbar-link"
          :class="{ 'is-active': activeId === link.id }" :aria-current="activeId === link.id ? 'true' : undefined">
          {{ link.label }}
        </a>
      </div>

      <a href="#contact" class="navbar-contact btn btn--outline">
        Contact Me
      </a>

      <button class="navbar-menu-button" type="button" :aria-expanded="mobileOpen" aria-controls="mobile-menu"
        aria-label="Toggle navigation menu" @click="mobileOpen = !mobileOpen">
        <AppIcon :name="mobileOpen ? 'close' : 'menu'" :size="22" />
      </button>
    </nav>

    <div v-if="mobileOpen" id="mobile-menu" class="navbar-mobile-menu container">
      <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="navbar-link"
        :class="{ 'is-active': activeId === link.id }" @click="mobileOpen = false">
        {{ link.label }}
      </a>
      <a href="#contact" class="btn btn--solid mobile-contact" @click="mobileOpen = false">
        Contact Me
      </a>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(1.4) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.navbar.is-open {
  background: #fff;
}

.navbar.is-scrolled {
  border-bottom-color: var(--color-line);
  box-shadow: 0 6px 20px -16px rgba(15, 27, 45, 0.25);
}

.navbar-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: var(--nav-h);
}

.navbar-brand {
  justify-self: start;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  gap: 2.25rem;
}

.navbar-link {
  position: relative;
  padding-block: 0.35rem;
  color: var(--color-ink-soft);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.18s;
}

.navbar-link:hover {
  color: var(--color-ink);
}

.navbar-link.is-active {
  color: var(--color-accent);
}

.navbar-links .navbar-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.1rem;
  height: 2px;
  border-radius: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.2s;
}

.navbar-links .navbar-link.is-active::after {
  transform: scaleX(1);
}

.navbar-contact {
  justify-self: end;
  padding: 0.5rem 1.15rem;
  font-size: 0.875rem;
}

.navbar-menu-button {
  display: none;
  justify-self: end;
  padding: 0.5rem;
  border: 0;
  background: none;
  color: var(--color-ink);
}

.navbar-mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-block: 0.5rem 1.5rem;
}

.navbar-mobile-menu .navbar-link {
  padding-block: 0.75rem;
  font-size: 1.05rem;
  border-bottom: 1px solid var(--color-line);
}

.mobile-contact {
  margin-top: 1rem;
}

@media (max-width: 52rem) {
  .navbar-inner {
    grid-template-columns: 1fr auto;
  }

  .navbar-links,
  .navbar-contact {
    display: none;
  }

  .navbar-menu-button {
    display: block;
  }
}
</style>
