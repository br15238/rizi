import type { GoodType, CoffeeDetailType } from '@@/shared/types'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'


export const useFavouriteStore = defineStore('favourite', {
  state: () => ({
    items: [] as GoodType<CoffeeDetailType>[],
  }),

  persist: {
    pick: ['items'],
  },

  actions: {
    add (item: GoodType<CoffeeDetailType>) {
      const exists = this.items.some(i => i.id === item.id)
      if (exists) return

      this.items.push(item)

      if (process.client) {
        message.success('加入成功')
      }
    },

    remove (id: number) {
      this.items = this.items.filter(i => i.id !== id)
    },

    toggle (item: GoodType<CoffeeDetailType>) {
      const exists = this.items.some(i => i.id === item.id)
      if (exists) {
        this.remove(item.id)
      } else {
        this.add(item)
      }
    },

    clear () {
      this.items = []
    },
  },
})
