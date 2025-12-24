import { useAsyncData } from '#imports'
import type { GoodType, CakeDetailType, ApiListResponse } from '@@/shared/types'

import { useBreadcrumb } from '@/composables/useBreadcrumb'

export const useMenuSharedState = () => {
  const menuList = useState<GoodType<CakeDetailType>[]>('shared-menu-list', () => [])
  return { menuList }
}

export const useMenuList = (params: Ref<{
  type?: number,
  page: number,
  pageSize: number
}>) => {
  const { menuList } = useMenuSharedState()
  return useAsyncData(
    `menu:${JSON.stringify(toValue(params))}`,
    async () => {
      const res = await $fetch('/api/menu', { params: params.value })
      menuList.value = res.list
      return res
    },
    {
      server: true,
      default: () => ({ list: [], total: 0 }) as ApiListResponse<GoodType<CakeDetailType>>,
      watch: [() => ({ ...params.value })]
    }
  )
}

export const useMenuDetail = (id: Ref<number>) => {
  const { currentTitle } = useBreadcrumb()
  return useAsyncData(
    `menu:${id.value}`,
    async () => {
      const res = await $fetch(`/api/menu/${id.value}`)
      if (res?.name) currentTitle.value = res.name
      return res
    },
    {
      server: true,
      default: () => ({} as GoodType<CakeDetailType>),
      watch: [id]
    }
  )
}
