type FieldList = 'text'
  | 'number'
  | 'date'
  | 'singleSelect'
  | 'multipleSelect'
  | 'phoneNumber'
  | 'email'
  | 'age'

interface FieldType {
  id: string;
  name?: string;
  type?: FieldList;
  officialName?: string;
  description?: string;
  value?: string;
}

export default FieldType;