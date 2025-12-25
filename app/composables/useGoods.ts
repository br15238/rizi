import { useAsyncData } from '#imports'

import {
  simulateGoodsApi,
  simulateGoodsDetailApi,
} from '@@/utils/simulation/goods'

import { useBreadcrumb } from '@/composables/useBreadcrumb'

import type { GoodType, CoffeeDetailType, ApiListResponse } from '@/types'

export const useGoodsSharedState = () => {
  const goodsList = useState<GoodType<CoffeeDetailType>[]>('shared-goods-list', () => [])
  return { goodsList }
}

export const useGoodsList = (params: Ref<{
  page: number
  pageSize: number
  type?: number
}>) => {
  const { goodsList } = useGoodsSharedState()
  return useAsyncData(
    `goods:${JSON.stringify(toValue(params))}`,
    async () => {
      const res = (await simulateGoodsApi(
        params.value,
      )) as unknown as ApiListResponse<GoodType<CoffeeDetailType>>
      if (res.list) goodsList.value = res.list
      return res
    },
    {
      server: true,
      default: () => ({ list: [], total: 0 }) as ApiListResponse<GoodType<CoffeeDetailType>>,
      watch: [() => ({ ...params.value })]
    }
  )
}

export const useGoodsDetail = (id: Ref<number>) => {
  const { currentTitle } = useBreadcrumb()
  return useAsyncData(
    `goods:${JSON.stringify(toValue(id.value))}`,
    async () => {
      const res = await simulateGoodsDetailApi(String(id.value))
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
