import { useAsyncData, useState, toValue } from '#imports'

import {
  simulateMenuApi,
  simulateMenuDetailApi,
} from '@@/utils/simulation/menu'

import { useBreadcrumb } from '@/composables/useBreadcrumb'

import type { GoodType, CakeDetailType, ApiListResponse } from '@/types'

export const useMenuSharedState = () => {
  const menuList = useState<GoodType<CakeDetailType>[]>('shared-menu-list', () => [])
  return { menuList }
}

export const useMenuList = (
  params: Ref<{
    type?: number
    page: number
    pageSize: number
  }>,
  key = 'menu-list'
) => {
  const { menuList } = useMenuSharedState()
  return useAsyncData(
    key,
    async () => {
      const res = (await simulateMenuApi(
        toValue(params),
      )) as unknown as ApiListResponse<GoodType<CakeDetailType>>
      if (res.list) menuList.value = res.list
      return res
    },
    {
      server: true,
      default: () =>
        ({ list: [], total: 0 }) as ApiListResponse<GoodType<CakeDetailType>>,
      watch: [params],
    },
  )
}

export const useMenuDetail = (id: Ref<number>, key = 'menu-detail') => {
  const { currentTitle } = useBreadcrumb()
  return useAsyncData(
    key,
    async () => {
      const res = await simulateMenuDetailApi(String(toValue(id)))
      if (res?.name) currentTitle.value = res.name
      return res
    },
    {
      server: true,
      default: () => ({}) as GoodType<CakeDetailType>,
      watch: [id],
    },
  )
}
