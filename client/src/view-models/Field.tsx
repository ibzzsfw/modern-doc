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
  fieldChoice: {
    name: string
    officialName: string
  }[]
  description?: string
  example?: string
  isRequired?: boolean
  userValue?: string
}

class Field {
  id: string = ''
  name: string = ''
  officialName: string = ''
  type: string = ''
  description?: string
  example?: string
  isRequired?: boolean = false
  userValue?: string = ''
  fieldChoice: {
    name: string
    officialName: string
  }[] = []

  constructor(arg: argType) {
    this.id = arg.id
    this.name = arg.name
    this.officialName = arg.officialName
    this.type = arg.type
    this.description = arg.description
    this.example = arg.example
    this.isRequired = arg.isRequired
    this.userValue = arg.userValue
    this.fieldChoice = arg.fieldChoice
  }
}

export default Field
