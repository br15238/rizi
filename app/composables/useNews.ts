import { simulateNewsApi } from '@@/utils/simulation/news'

export const useNews = (
  params: Ref<{
    page: number;
    pageSize: number;
    type: number;
  }>,
) => {
  return useAsyncData('news', async () => simulateNewsApi(params.value), {
    default: () => ({ list: [], total: 0 }),
    watch: [params],
  })
}
