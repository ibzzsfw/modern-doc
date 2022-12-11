import Tag from '@models/Tag'
import Field from '@models/Field'

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
}

export default File
