<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'

const { app: { baseURL } } = useRuntimeConfig()

</script>

<template>
  <section class="overflow-x-clip">
    <Divider title="品牌精神" />
    <div class="w-full flex flex-col items-center m-auto conceptFull:flex-row">
      <div
        class="w-full conceptFull:w-[58.44%]"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <img
          :src="`${baseURL}img/brand/index.gif`"
          alt="環境氛圍"
          class="w-full w-[421px] aspect-[748/387]"
        >
      </div>
      <div
        class="w-[80%] conceptFull:w-[234px] ml-0 conceptFull:ml-[9%] text-justify"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <h3
          dir="rtl"
          class="text-[20px] font-[300] tracking-[.08em] leading-[1.5em] text-[var(--mainRed)] h-[80px] justify-center indent-[-.7em] conceptFull:indent-[-.5em] flex items-center text-center"
        >
          享受生活，過「好日子」
        </h3>
        <p class="text-[16px] tracking-[.1em] leading-[35px] font-[100] text-[var(--mainTxt)] indent-[2em]">
          好日子咖啡輕食店追求品質與效率的完美配方，採用自家烘焙的頂級莊園咖啡豆沖煮新鮮的好咖啡，堅持健康、天然、不添加人工香料的現做輕食，用最短的等待時間萃取最優質的飲食品味。
        </p>
      </div>
    </div>
  </section>
</template>
