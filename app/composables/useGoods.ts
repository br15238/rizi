import { useAsyncData } from '#imports'
import type { GoodType, CoffeeDetailType, ApiListResponse } from '@@/shared/types'

import { useBreadcrumb } from '@/composables/useBreadcrumb'

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
      const res = await $fetch('/api/goods', { params: params.value })
      goodsList.value = res.list
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
      const res = await $fetch(`/api/goods/${id.value}`)
      if (res?.name) currentTitle.value = res.name
      return res
    },
    {
      server: true,
      default: () => ({} as GoodType<CoffeeDetailType>),
      watch: [id]
    }
  )
}
