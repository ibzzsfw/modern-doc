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
  {
    title: 'บันทึกเตือนความจำของฉัน',
    path: '/alldocument/note',
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
  {
    title: 'เอกสารที่แชร์ร่วมกัน',
    path: '/alldocument/sharefile',
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
  {
    title: 'ไฟล์ของฉัน',
    path: '/alldocument/file',
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
  {
    title: 'เอกสารที่อัปโหลด',
    path: '/alldocument/uploadfile',
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
  {
    title: 'เอกสารที่อัปโหลด',
    path: '/alldocument/uploadfile',
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
  }
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
