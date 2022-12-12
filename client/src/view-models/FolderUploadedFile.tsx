import Document from '@view-models/Document'
import DocumentStatus from '@view-models/DocumentStatus'
import { differenceInDays } from 'date-fns'
class FolderUploadedFile implements Document {
  id: string
  name: string
  officialName?: string | null
  description?: String | null
  dateUploaded: Date
  dateExpires: Date
  amount?: number = 1
  isSelected: boolean = true
  url?: string | null

  constructor(
    id: string,
    name: string,
    dateUploaded: Date,
    dateExpires: Date,
    officialName?: string | null,
    description?: String | null,
    amount?: number,
    url?: string | null
  ) {
    this.id = id
    this.name = name
    this.officialName = officialName
    this.description = description
    this.dateUploaded = dateUploaded
    this.dateExpires = dateExpires
    this.amount = amount || 1
    this.url = url
  }

  getStatus = (): DocumentStatus => {
    if (this.url === null) {
      return 'ไม่มีอยู่ในคลัง'
    }
    if (new Date() > this.dateExpires) {
      return 'หมดอายุ'
    }
    if (differenceInDays(this.dateExpires, this.dateUploaded) <= 7) {
      return 'ใกล้หมดอายุ'
    }
    return 'มีอยู่ในคลัง'
  }
}

export default FolderUploadedFile
