interface Document {
  id: string
  officialName?: string | null
  description?: String | null
  dateUploaded?: Date
  dateExpires?: Date
}

export default Document
