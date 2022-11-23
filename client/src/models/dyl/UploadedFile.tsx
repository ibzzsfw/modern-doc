import DocumentStatus from '@models/DocumentStatus'
import SystemFile from '@models/SystemFile'

type arg = {
  id: string
  lastModified: Date
  name: string
  dayLifeSpan: number
  officialName: string
  isShared: boolean
  expirationDate: Date
  URI: string
  fileURI: string
  amount?: string
}
class UploadedFile {
  isShare: boolean = false
  id: string
  lastModified: Date
  name: string
  dayLifeSpan: number
  officialName: string
  isShared: boolean
  expirationDate: Date
  fileURI: string
  amount?: string

  constructor({
    id,
    lastModified,
    name,
    dayLifeSpan,
    officialName,
    isShared,
    expirationDate,
    fileURI,
    amount,
  }: arg) {
    this.id = id
    this.lastModified = lastModified
    this.name = name
    this.dayLifeSpan = dayLifeSpan
    this.officialName = officialName
    this.isShared = isShared
    this.expirationDate = expirationDate
    this.fileURI = fileURI
    this.amount = amount
  }

  getStatus(): DocumentStatus {
    const today = new Date()
    if (this.expirationDate == null && this.fileURI != '') {
      return 'มีอยู่ในคลัง'
    }
    if (this.fileURI == '') {
      return 'ไม่มีอยู่ในคลัง'
    }
    if (this.expirationDate < today) {
      return 'หมดอายุ'
    }
    return 'มีอยู่ในคลัง'
  }
}

export default UploadedFile
