class Field {

  id: string = '';
  name: string = '';
  officialName: string = '';
  type: string = '';
  description?: string;
  example?: string;

  constructor(id: string, name: string, officialName: string, type: string, description?: string, example?: string) {
    this.id = id;
    this.name = name;
    this.officialName = officialName;
    this.type = type;
    this.description = description;
    this.example = example;
  }
}

export default Field;