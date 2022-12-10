let breadcrumbConfig = [
  {
    title: 'หน้าหลัก',
    path: '/home',
    history: [{}],
  },
  {
    title: 'เอกสารของฉัน',
    path: '/mydocument',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
    ],
  },
  {
    title: 'แฟ้มเอกสารของฉัน',
    path: '/alldocument/folder',
    history: [
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
    ],
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
  return []
}

export default getBreadcrumbFromPath
