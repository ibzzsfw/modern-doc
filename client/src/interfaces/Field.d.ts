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
  private id: string;
  private name: string;
  private type?: FieldList;
  private officialName?: string;
  private description?: string;
  private choices?: Choice[] | any;
  private userValue?: string;
  private date?: Date;
  private generatedFileId?: string;
  private isRequired?: boolean;
  private order?: number;
}

export default IField;