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
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
    ],
  },
  {
    title: 'บันทึกเตือนความจำของฉัน',
    path: '/alldocument/note',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
    ],
  },
  {
    title: 'เอกสารที่แชร์ร่วมกัน',
    path: '/alldocument/sharefile',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
    ],
  },
  {
    title: 'ไฟล์ของฉัน',
    path: '/alldocument/file',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
    ],
  },
  {
    title: 'เอกสารที่อัปโหลด',
    path: '/alldocument/uploadfile',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
    ],
  },
  {
    title: 'ดูรายละเอียดไฟล์',
    path: '/alldocument/xxx',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
      {
        title: 'ไฟล์ของฉัน',
        path: '/file',
      },
    ],
  },
  {
    title: 'ดูรายละเอียด',
    path: '/alldocument/xxx',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
      {
        title: 'แฟ้มเอกสารของฉัน',
        path: '/folder',
      },
    ],
  },
  {
    title: 'ดูรายละเอียด',
    path: '/alldocument/xxx',
    history: [
      {
        title: 'หน้าหลัก',
        path: '/home',
      },
      {
        title: 'เอกสารของฉัน',
        path: '/mydocument',
      },
      {
        title: 'เอกสารที่อัปโหลด',
        path: '/uploadfile',
      },
    ],
  },
]

const getBreadcrumbFromPath = (path: string) => {

  let current = breadcrumbConfig.filter((item) => item.path === path)[0]
  let history = [...current.history, current]
  return history
}

export default getBreadcrumbFromPath
