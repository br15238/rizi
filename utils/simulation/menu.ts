import db from '@/assets/db.json'

export const simulateMenuApi = (
  query: {
    page?: number | string;
    pageSize?: number | string;
    type?: number | string;
  } = {},
) => {
  const { page, type, pageSize } = query
  const _pageSize = Number(pageSize) || 12
  const _page = Number(page) || 1
  const _type = Number(type)
  const start = (_page - 1) * _pageSize
  let data = db.menu

  if (_type && _type !== 0) {
    data = data.filter((x) => x.type === _type)
  }

  const list = data.map(({ detail: _detail, ...rest }) => rest)

  return {
    list: list.slice(start, start + _pageSize),
    total: data.length,
  }
}

export const simulateMenuDetailApi = (id: string) => {
  return db.menu.find((item) => String(item.id) === id)
}
