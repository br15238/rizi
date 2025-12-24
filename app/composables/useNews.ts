import { useFetch } from '#imports'
import type { Ref } from 'vue'

export const useNews = (params: Ref<{
  page: number,
  pageSize: number,
  type: number
}>) => {
  return useFetch('/api/news', {
    query: params,
    default: () => ({ list: [], total: 0 }),
  })
}
