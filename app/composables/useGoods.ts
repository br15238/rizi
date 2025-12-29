import { useAsyncData, useState, toValue } from '#imports'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
import type { GoodType, CoffeeDetailType, ApiListResponse } from '@/types'

import {
  simulateGoodsApi,
  simulateGoodsDetailApi,
} from '@/utils/simulation/goods'

export const useGoodsSharedState = () => {
  const goodsList = useState<GoodType<CoffeeDetailType>[]>('shared-goods-list', () => [])
  return { goodsList }
}

export const useGoodsList = (
  params: Ref<{
    page: number
    pageSize: number
    type?: number
  }>,
  key = 'goods-list'
) => {
  const { goodsList } = useGoodsSharedState()
  const dynamicKey = computed(() => {
    const p = toValue(params)
    return `${key}-${p.type}-${p.page}-${p.pageSize}`
  })
  return useAsyncData(
    dynamicKey,
    async () => {
      const res = (await simulateGoodsApi(
        toValue(params),
      )) as unknown as ApiListResponse<GoodType<CoffeeDetailType>>
      if (res.list && key === 'goods-list-main') goodsList.value = res.list
      return res
    },
    {
      server: true,
      default: () => ({ list: [], total: 0 }) as ApiListResponse<GoodType<CoffeeDetailType>>,
      watch: [params],
    },
  )
}

export const useGoodsDetail = (id: Ref<number>, key = 'goods-detail') => {
  const { currentTitle } = useBreadcrumb()
  const dynamicKey = computed(() => `${key}-${toValue(id)}`)
  return useAsyncData(
    dynamicKey,
    async () => {
      const res = await simulateGoodsDetailApi(String(toValue(id)))
      if (res?.name) currentTitle.value = res.name
      return res
    },
    {
      server: true,
      default: () => ({}) as GoodType<CoffeeDetailType>,
      watch: [id],
    },
  )
}
