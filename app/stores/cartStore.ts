import type { GoodType, CoffeeDetailType } from '@@/shared/types'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'


export type CartItem = GoodType<CoffeeDetailType> & {
  count: number
  checked: boolean
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  persist: {
    pick: ['items'],
  },

  actions: {
    add (item: GoodType<CoffeeDetailType>) {
      const target = this.items.find(i => i.id === item.id)

      if (target) {
        target.count += 1
      } else {
        this.items.push({
          ...item,
          count: 1,
          checked: true,
        })
      }
      message.success('加入成功')
    },

    remove (id: number) {
      this.items = this.items.filter(i => i.id !== id)
    },

    checkAll (value: boolean) {
      this.items.forEach(i => {
        i.checked = value
      })
    },

    toggleChecked (id: number) {
      const target = this.items.find(i => i.id === id)
      if (target) {
        target.checked = !target.checked
      }
    },
  },
})
