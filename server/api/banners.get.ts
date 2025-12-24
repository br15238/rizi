import db from '@@/server/data/db.json'

export default defineEventHandler(() => {
  return db.banners
})
