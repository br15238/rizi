import { describe, it, expect, vi, beforeEach } from 'vitest'

import { getSrc, getSrcSet, sendEmail } from './tool'

vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    app: {
      baseURL: '/'
    },
    public: {
      emailServiceId: 'service_test',
      emailPublicKey: 'key_test'
    }
  })
}))

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}))

// Mock ant-design-vue message
vi.mock('ant-design-vue', () => ({
  message: {
    loading: vi.fn(),
    success: vi.fn(),
    error: vi.fn()
  }
}))

import emailjs from '@emailjs/browser'
import { message } from 'ant-design-vue'

describe('tool.ts utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getSrc', () => {
    it('should return correct pc source with domain by default', () => {
      const result = getSrc('img/test', 'pc')
      expect(result).toBe('/img/test-pc.webp')
    })

    it('should return correct phone source', () => {
      const result = getSrc('img/test', 'phone')
      expect(result).toBe('/img/test-phone.webp')
    })

    it('should return source without domain when domain is false', () => {
      const result = getSrc('img/test', 'pc', false)
      expect(result).toBe('img/test-pc.webp')
    })
  })

  describe('getSrcSet', () => {
    it('should return correct srcset string', () => {
      const result = getSrcSet('img/test', [600, 1200])
      expect(result).toBe('/img/test-phone.webp 600w, /img/test-pc.webp 1200w')
    })
  })

  describe('sendEmail', () => {
    it('should call emailjs.send and handle success with callback', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({})
      const callback = vi.fn()
      await sendEmail('test', {}, callback)
      expect(emailjs.send).toHaveBeenCalled()
      expect(callback).toHaveBeenCalled()
      expect(message.success).toHaveBeenCalled()
    })

    it('should call emailjs.send and handle success without callback', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({})
      await sendEmail('test', {})
      expect(emailjs.send).toHaveBeenCalled()
      expect(message.success).toHaveBeenCalled()
    })

    it('should handle failure', async () => {
      vi.mocked(emailjs.send).mockRejectedValueOnce({ text: 'error' })
      await sendEmail('test', {}, () => {})
      expect(message.error).toHaveBeenCalled()
    })

    it('should show loading without messageDOM', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({})
      const spy = vi.spyOn(document, 'querySelector').mockReturnValue(null)
      await sendEmail('test', {}, () => {})
      expect(message.loading).toHaveBeenCalledTimes(2) // once without key, once with key
      spy.mockRestore()
    })

    it('should show loading with messageDOM', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({})
      const mockElement = { length: 1 }
      const spy = vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any)
      await sendEmail('test', {}, () => {})
      expect(message.loading).toHaveBeenCalledTimes(1) // only one call with key
      spy.mockRestore()
    })
  })
})
