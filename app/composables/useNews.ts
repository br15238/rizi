import { toValue } from '#imports'

import { simulateNewsApi } from '@/utils/simulation/news'

export const useNews = (
  params: Ref<{
    page: number;
    pageSize: number;
    type: number;
  }>,
  key = 'news-list'
) => {
  const dynamicKey = computed(() => {
    const p = toValue(params)
    return `${key}-${p.type}-${p.page}-${p.pageSize}`
  })
  
  return useAsyncData(
    dynamicKey,
    async () => simulateNewsApi(toValue(params)),
    {
      default: () => ({ list: [], total: 0 }),
      watch: [params],
    }
  )
}
