interface IFieldService {
    createField(name: string, officialName: string, description: string, type: any): Promise<any>
    getAllField(): Promise<any>
    createFieldMany(fields: any): Promise<any>
    editFieldOfficialName(id: string, officialName: string): Promise<any>
    addChoice(fieldId: string, name: string, officialName: string): Promise<any>
    deleteChoice(choiceId: string): Promise<any>
}

export default IFieldService