import { describe, it, expect } from 'vitest'

import { getSrc } from '../../../app/utils/tool'

describe('tool utilities in node environment', () => {
  it('should fallback to default baseURL when useRuntimeConfig fails', () => {
    const result = getSrc('img/test', 'pc')
    expect(result).toBe('/img/test-pc.webp')
  })

  it('should return relative path when domain is false', () => {
    const result = getSrc('img/test', 'pc', false)
    expect(result).toBe('img/test-pc.webp')
  })
})
