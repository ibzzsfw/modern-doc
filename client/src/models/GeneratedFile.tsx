import SystemFile from '@models/SystemFile'
import Field from '@models/Field'

type argType = {
  id: string
  lastModified: Date
  lastViewed: Date
  name: string
  dayLifeSpan: number
  officialName: string
  field: Field[]
}

class GeneratedFile extends SystemFile {
  field: Field[] = []

  constructor(arg: argType) {
    super(
      arg.id,
      arg.lastModified,
      arg.lastViewed,
      arg.name,
      arg.dayLifeSpan,
      arg.officialName
    )
    this.field = arg.field
  }
}

export default GeneratedFile
