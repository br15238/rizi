import { useAsyncData } from '#imports'
import type { BannerType } from '@@/shared/types'

export const useBanner = () => {
  return useAsyncData<BannerType[]>(
    'banner',
    () => $fetch('/api/banners'),
    {
      server: true,
      default: () => [],
    }
  )
}
