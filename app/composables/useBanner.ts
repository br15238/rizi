import { useAsyncData } from '#imports'

import { simulateBannersApi } from '@@/utils/simulation/banners'

import type { BannerType } from '@/types'

export const useBanner = () => {
  return useAsyncData<BannerType[]>(
    'banner',
    async () => simulateBannersApi(),
    {
      server: true,
      default: () => [],
    }
  )
}
