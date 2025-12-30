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
  option: { writeShared: boolean } = { writeShared: false }
) => {
  const { goodsList } = useGoodsSharedState()
  const dynamicKey = computed(() => {
    const p = toValue(params)
    return `${p.type}-${p.page}-${p.pageSize}`
  })
  return useAsyncData(
    dynamicKey,
    async () => {
      const res = (await simulateGoodsApi(
        toValue(params),
      )) as unknown as ApiListResponse<GoodType<CoffeeDetailType>>
      if (res.list && option.writeShared) goodsList.value = res.list
      return res
    },
    {
      server: true,
      default: () => ({ list: [], total: 0 }) as ApiListResponse<GoodType<CoffeeDetailType>>,
      watch: [params],
    },
  )
}

export const useGoodsDetail = (id: Ref<number>) => {
  const dynamicKey = computed(() => `${toValue(id)}`)
  const { setTitle } = useBreadcrumb()
  return useAsyncData(
    dynamicKey,
    async () => {
      const res = await simulateGoodsDetailApi(String(toValue(id)))
      if (res?.name) setTitle(res.name)
      return res
    },
    {
      server: true,
      default: () => ({}) as GoodType<CoffeeDetailType>,
      watch: [id],
    },
  )
}
