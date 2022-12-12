import Tag from '@view-models/Tag'
import Field from '@view-models/Field'

class File {
  id: string = ''
  name: string = ''
  officialName: string = ''
  description: string = ''
  dayLifeSpan: number = -1
  URI: string = ''
  tags: Tag[] = []
  fields: Field[] = []
  type?: string
  date?: Date
  note?: string
  previewURI?: string
}

export default File
