interface Document {
  id: string
  name: string
  officialName?: string | null
  description?: String | null
  dateUploaded?: Date
  isExpired?: boolean = false
}

export default Document
