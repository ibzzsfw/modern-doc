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
  amount?: string
  type?: string
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
  URI: string
  amount?: string
  type?: string

  constructor({
    id,
    lastModified,
    name,
    dayLifeSpan,
    officialName,
    isShared,
    expirationDate,
    URI,
    amount,
    type,
  }: arg) {
    this.id = id
    this.lastModified = lastModified
    this.name = name
    this.dayLifeSpan = dayLifeSpan
    this.officialName = officialName
    this.isShared = isShared
    this.expirationDate = expirationDate
    this.URI = URI
    this.amount = amount
    this.type = type
  }

  getStatus(): DocumentStatus {
    const today = new Date()
    if (this.expirationDate == null && this.URI != '' && this.URI != null) {
      return 'มีอยู่ในคลัง'
    }
    if (this.URI == '' || this.URI == null) {
      return 'ไม่มีอยู่ในคลัง'
    }
    if (this.expirationDate < today) {
      return 'หมดอายุ'
    }
    return 'มีอยู่ในคลัง'
  }
}

export default UploadedFile
