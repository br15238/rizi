import db from '@/assets/db.json'

export const simulateNewsApi = (
  query: {
    page?: number | string;
    pageSize?: number | string;
    type?: number | string;
  } = {},
) => {
  console.log('simulateNewsApi')
  
  const { pageSize, page, type } = query
  const _pageSize = Number(pageSize) || 10
  const _page = Number(page) || 1
  const _type = Number(type)
  const start = (_page - 1) * _pageSize
  let data = db.news

  if (_type && _type !== 0) {
    data = data.filter((x) => x.type === _type)
  }

  return {
    list: data.slice(start, start + _pageSize),
    total: data.length,
  }
}
