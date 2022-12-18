type FieldList = 'text'
  | 'number'
  | 'date'
  | 'singleSelect'
  | 'multipleSelect'
  | 'phoneNumber'
  | 'email'
  | 'age'

type Choice = {
  id: string;
  name: string;
  value: string;
}

interface IField {
  id: string;
  name: string;
  type?: FieldList;
  officialName?: string;
  description?: string;
  choices?: Choice[] | any;
  userValue?: string;
  date?: Date;
  generatedFileId?: string;
  isRequired?: boolean;
  order?: number;
}

export default IField;