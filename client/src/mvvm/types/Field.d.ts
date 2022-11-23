enum FieldList {
  Text = 'text',
  Number = 'number',
  Date = 'date',
  SingleSelect = 'singleSelect',
  MultipleSelect = 'multipleSelect',
}

interface FieldTypes {
  id: string;
  name: string;
  type: FieldList;
  officialName: string;
  description: string;
  value: string;
}

export default FieldTypes;