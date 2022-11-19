import Document from '@models/Document'

abstract class Files implements Document {
  id: string
  lastModified: Date
  lastViewed: Date
  officialName: string
  description?: String | null
  dateUploaded?: Date
  dateExpires?: Date

  constructor(
    id: string,
    lastModified: Date,
    lastViewed: Date,
    officialName: string
  ) {
    this.id = id
    this.lastModified = lastModified
    this.lastViewed = lastViewed
    this.officialName = officialName
  }
}

export default Files
