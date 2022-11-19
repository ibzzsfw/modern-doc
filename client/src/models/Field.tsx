type argType = {
  id: string
  name: string
  officialName: string
  type:
    | 'text'
    | 'number'
    | 'age'
    | 'date'
    | 'singleSelect'
    | 'multipleSelect'
    | 'phoneNumber'
    | 'email'
  fieldChoice: string[]
  description?: string
  example?: string
  userValue?: string
}

class Field {
  id: string = ''
  name: string = ''
  officialName: string = ''
  type: string = ''
  description?: string
  example?: string
  userValue?: string = ''
  fieldChoice: string[] = []

  constructor(arg: argType) {
    this.id = arg.id
    this.name = arg.name
    this.officialName = arg.officialName
    this.type = arg.type
    this.description = arg.description
    this.example = arg.example
    this.userValue = arg.userValue
    this.fieldChoice = arg.fieldChoice
  }
}

export default Field
