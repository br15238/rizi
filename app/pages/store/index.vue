<script lang="ts" setup>
import { useSeoMeta, definePageMeta } from '#imports'
import { computed, ref } from 'vue'

import { useGoodsList } from '@/composables/useGoods'
import { STORE_TAB_TYPE } from '@/utils/constants'

useSeoMeta({
  title: '線上購物',
  description: '好日子咖啡輕食線上購物，提供多款優質咖啡豆、禮盒選購。',
})
definePageMeta({ title: '線上購物' })

const pageConfig = ref({
  current: 1,
  pageSize: 8,
})
const activeTab = ref(0)
const queryParams = computed(() => ({
  type: activeTab.value,
  page: pageConfig.value.current,
  pageSize: pageConfig.value.pageSize
}))
const { data } = useGoodsList(queryParams)
const goodList = computed(() => data.value?.list || [])
const total = computed(() => data.value?.total || 0)

const handleTabClick = (index: number) => {
  queryParams.value.type = index
  queryParams.value.page = 1
}
</script>

<template>
  <section class="contentWrap">
    <Divider title="線上購物" />
    <div class="flex flex-col md:flex-row justify-between m-auto">
      <Tab
        v-model="activeTab"
        :tab-data="STORE_TAB_TYPE"
        @handle-tab-click="handleTabClick"
      />
      <div
        class="shopWrap"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <div class="shopItem">
          <GoodCard v-for="good in goodList" :key="good.name" :data="good" />
        </div>
        <Pagination v-model="pageConfig" :total="total" />
      </div>
    </div>
  </section>
</template>
