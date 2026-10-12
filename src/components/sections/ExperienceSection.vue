<script setup>
import { experiences } from '@/data/experience'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import TimelineItem from '@/components/ui/TimelineItem.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section id="experience" class="section section--alt">
    <div class="container">
      <SectionHeader title="Experience" subtitle="Where I've worked" />

      <ol>
        <TimelineItem v-for="job in experiences" :key="job.company" :date="job.period">
          <h3 class="experience-company">{{ job.company }}</h3>
          <p class="experience-role">{{ job.role }}</p>

          <div class="experience-projects">
            <article v-for="project in job.projects" :key="project.name" class="card experience-project">
              <div class="experience-project-head">
                <h4 class="experience-project-name">{{ project.name }}</h4>
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener"
                  class="experience-link"
                >
                  Visit Site
                  <AppIcon name="arrow-up-right" :size="14" :stroke-width="2" />
                </a>
              </div>

              <ul class="experience-list">
                <li v-for="point in project.points" :key="point">{{ point }}</li>
              </ul>

              <ul class="experience-tags" aria-label="Technologies used">
                <li v-for="tag in project.tags" :key="tag" class="experience-tag">{{ tag }}</li>
              </ul>
            </article>
          </div>
        </TimelineItem>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience-company {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.experience-role {
  margin-top: 0.15rem;
  color: var(--color-accent);
  font-weight: 600;
}

.experience-projects {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.experience-project {
  padding: 1.5rem 2rem;
  border-radius: var(--radius-inner);
}

.experience-project-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}

.experience-project-name {
  font-size: 1.1rem;
  font-weight: 700;
}

.experience-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-teal-strong);
  font-size: 0.9rem;
  font-weight: 600;
}
.experience-link:hover {
  color: var(--color-accent-strong);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.experience-list {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.9rem;
  color: var(--color-ink-soft);
  font-size: 0.98rem;
  line-height: 1.6;
}
.experience-list li {
  position: relative;
  padding-left: 1.1rem;
}
.experience-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.55;
}

.experience-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.1rem;
}
.experience-tag {
  padding: 0.2rem 0.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-ink-soft);
  font-size: 0.82rem;
  font-weight: 500;
}

</style>
