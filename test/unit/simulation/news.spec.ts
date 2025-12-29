import { describe, it, expect } from 'vitest'

import { simulateNewsApi } from '../../../app/utils/simulation/news'

describe('news simulation', () => {
  it('should return paginated list', () => {
    const result = simulateNewsApi({ page: 1, pageSize: 3, type: 0 })
    expect(result.list.length).toBeLessThanOrEqual(3)
    expect(result.total).toBeGreaterThan(0)
  })

  it('should filter by type', () => {
    const result = simulateNewsApi({ page: 1, pageSize: 10, type: 1 })
    result.list.forEach((item: any) => {
      expect(item.type).toBe(1)
    })
  })
})
