import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which section is currently in the middle of the viewport.
 * Used by the navbar to highlight the current link.
 */
export function useActiveSection(ids) {
  const active = ref(ids[0] ?? '')
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      // A thin band around the vertical centre of the viewport
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
