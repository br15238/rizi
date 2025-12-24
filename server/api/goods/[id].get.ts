import db from '@@/server/data/db.json'

export default defineEventHandler(event => {
  const id = getRouterParam(event, 'id')
  return db.goods.find(item => String(item.id) === id)
})
