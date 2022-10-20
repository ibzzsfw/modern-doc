let breadcrumbConfig = [
  {
    title: 'หน้าหลัก',
    path: '/',
    history: [],
  },
  {
    title: 'เอกสารของฉัน',
    path: '/mydocument',
    history: ['หน้าหลัก'],
  },
]

const getBreadcrumbFromPath = (path: string) => {
  let config = []
  while (path !== '/') {
    config.push(breadcrumbConfig.find((item) => item.path === path))
    console.log(path)
    path = path.substring(0, path.lastIndexOf('/')) + '/'
  }
  config.push(breadcrumbConfig.find((item) => item.path === '/'))
  return config.reverse()
}

export default getBreadcrumbFromPath