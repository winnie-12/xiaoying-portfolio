<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ConnectSection from '@/components/sections/ConnectSection.vue'
</script>

<template>
  <a href="#about" class="skip-link">Skip to content</a>
  <Navbar />

  <main>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <EducationSection />
    <ProjectsSection />
    <SkillsSection />
    <ConnectSection />
  </main>

  <SiteFooter />
</template>
