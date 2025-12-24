import db from '@@/server/data/db.json'

export default defineEventHandler((event) => {
  const { page, type, pageSize } = getQuery(event)
  const _pageSize = Number(pageSize)
  const _page = Number(page) || 1
  const _type = Number(type)
  const start = (_page - 1) * _pageSize
  let data = db.menu

  if (_type !== 0) data = data.filter(x => x.type === _type)

  data.map(({ detail: _detail, ...rest }) => rest)

  return {
    list: data.slice(start, start + _pageSize),
    total: data.length
  }
})
