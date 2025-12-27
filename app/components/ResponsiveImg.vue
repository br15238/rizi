<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import type { PropType, CSSProperties } from 'vue'

const props = defineProps({
  src: String,
  alt: String,
  imgClass: {
    type: [String, Array, Object] as PropType<
      | string
      | string[]
      | Record<string, boolean>
    >,
    default: undefined,
  },
  imgStyle: Object as PropType<CSSProperties>,
  media: { type: Number, default: 413 },
  loading: { type: String as PropType<undefined | 'lazy' | 'eager'>, default: undefined },
  fetchpriority: { type: String as PropType<'high' | 'low' | 'auto'>, default: 'lazy' },
})

const { app: { baseURL } } = useRuntimeConfig()
</script>

<template>
  <picture>
    <source media="(max-width: 412px)" :srcset="`${baseURL}${props.src}-phone.webp`" type="image/webp">
    <source :media="`(min-width: ${props.media}px)`" :srcset="`${baseURL}${props.src}-pc.webp`" type="image/webp">
    <source :srcset="`${baseURL}${props.src}.jpg`" type="image/jpeg">
    <img
      :src="`${baseURL}${props.src}.jpg`"
      :alt="props.alt"
      :fetchpriority="props.fetchpriority"
      :loading="props.loading"
      :class="[props.imgClass]"
      :style="props.imgStyle"
    >
  </picture>
</template>
