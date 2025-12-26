<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'
import { computed } from 'vue'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

import { useBanner } from '@/composables/useBanner'
import { getSrc, getSrcSet } from '@/utils/tool'

const { app: { baseURL } } = useRuntimeConfig()
const { data: banners } = await useBanner()

const bannerList = computed(() => banners.value ?? [])
const ARROW_COMPONENT = [
  { id: 'prevArrow', class: '!left-[10px]', component: LeftCircleOutlined },
  { id: 'nextArrow', class: '!right-[10px]', component: RightCircleOutlined },
]

const handleOpenNewTab = (link: string) => window.open(baseURL + link, '_blank')
</script>

<template>
  <section class="mt-[2%] aspect-[1280/533]">
    <a-carousel arrows autoplay>
      <div
        v-for="(item, index) in bannerList"
        :key="item.id"
        :class="{ 'cursor-pointer': item.link }"
        role="button"
        tabindex="0"
        @click="item.link && handleOpenNewTab(item.link)"
        @keyup.enter="item.link && handleOpenNewTab(item.link)"
      >
        <img
          class="w-full h-auto aspect-[1280/533]"
          :src="getSrc(item.img, 'phone', false)"
          :srcset="getSrcSet(item.img, [412, 1280])"
          sizes="(max-width: 412px) 100vw, 1280px"
          :alt="item.alt || 'Banner'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          :loading="index === 0 ? 'eager' : 'lazy'"
        >
      </div>
      <template v-for="arrow in ARROW_COMPONENT" :key="arrow.id" #[arrow.id]>
        <div
          :class="['w-[30px] !h-[30px] !text-[30px] !text-[var(--mainWhite)] transtiion duration-[.3s] ease-in-out opacity-50 z-[var(--zIndexDefault)] before:sr-only hover:opacity-100', arrow.class]"
          role="button"
          :aria-label="arrow.id === 'prevArrow' ? '上一張' : '下一張'"
          tabindex="0"
        >
          <component :is="arrow.component" />
        </div>
      </template>
    </a-carousel>
  </section>
</template>
