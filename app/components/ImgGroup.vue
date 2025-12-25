<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'
import { ref, watch } from 'vue'

import type { CakeDetailType, CoffeeDetailType, GoodType } from '@@/shared/types'

const props = defineProps<{
  data: GoodType<CakeDetailType | CoffeeDetailType>
}>()
const { app: { baseURL } } = useRuntimeConfig()
const largePicSrc = ref<string | undefined>(props.data.detail.imgs[ 0 ])
const currentIndex = ref(0)
const isAlbumOpen = ref(false)

const updateLargePicSrc = (path: string, index: number) => {
  largePicSrc.value = path
  currentIndex.value = index
}

watch(() => props.data, (newValue) => {
  currentIndex.value = 0
  if (typeof newValue === 'string') {
    largePicSrc.value = undefined
  } else {
    largePicSrc.value = newValue.img
  }
})
</script>

<template>
  <div class="flex flex-col-reverse mainPicCol:flex-row w-full h-fit justify-between mainWrapCol:w-[60%]">
    <div
      class="flex mainPicCol:flex-col flex-wrap mainSmallPicCol:flex-nowrap justify-between w-[100%] mainPicCol:w-[18%]"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-easing="ease-in-sine"
    >
      <img
        v-for="(img, index) in props.data.detail.imgs"
        :key="img + props.data.id"
        :src="`${baseURL}${img}`"
        class="cursor-pointer aspect-square w-[48.65%] mainSmallPicCol:w-[23%] mainPicCol:w-full nth-[-n+2]:mb-[2.86%] mainSmallPicCol:nth-[-n+2]:mb-0"
        :alt="props.data.name"
        role="button"
        tabindex="0"
        @click="updateLargePicSrc(img, index)"
        @keyup.enter="updateLargePicSrc(img, index)"
      >
    </div>
    <div
      class="w-full mainPicCol:w-[79.24%] max-w-[580px] mainPicCol:max-w-[500px] mb-[2.66%] mainPicCol:mb-0"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-easing="ease-in-sine"
    >
      <a-image
        :key="`${largePicSrc}${data.id}`"
        :src="`${baseURL}${largePicSrc}`"
        :preview="{ visible: isAlbumOpen }"
        class="aspect-square w-full"
        @click="isAlbumOpen = true"
      />
      <div style="display: none">
        <a-image-preview-group
          :key="props.data.id + currentIndex"
          :preview="{ visible: isAlbumOpen, onVisibleChange: (visible: boolean) => (isAlbumOpen = visible), current: currentIndex }"
        >
          <a-image
            v-for="(img, index) in props.data.detail.imgs"
            :key="img + props.data.id"
            :src="`${baseURL}${img}`"
            :alt="`${props.data.name}-${index + 1}`"
          />
        </a-image-preview-group>
      </div>
    </div>
  </div>
</template>
