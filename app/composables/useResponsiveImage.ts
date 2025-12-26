import { useRuntimeConfig } from '#imports'
import { ref, onMounted, onUnmounted } from 'vue'

export const useResponsiveImage = () => {
  const { app: { baseURL } } = useRuntimeConfig()
  const isMobile = ref(false)

  const updateBreakpoint = () => {
    isMobile.value = window.innerWidth <= 412
  }

  onMounted(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })

  const getResponsiveSrc = (src: string) => {
    const base = src.replace('.webp', '')
    const suffix = isMobile.value ? '-phone' : '-pc'
    return `${baseURL}${base}${suffix}.webp`
  }

  const getResponsiveAttrs = (src: string) => {
    const base = src.replace('.webp', '')
    return {
      src: `${baseURL}${base}-pc.webp`, // 後備方案
      srcset: `
        ${baseURL}${base}-phone.webp 412w,
        ${baseURL}${base}-pc.webp 1280w
      `.trim(),
      sizes: '(max-width: 412px) 412px, 1280px',
    }
  }

  return {
    isMobile,
    getResponsiveSrc,
    getResponsiveAttrs,
    baseURL,
  }
}
