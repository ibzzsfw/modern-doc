interface IMemberService {
    getUserHouseholdId(userId: string): Promise<string>
    getAllMembers(householdId: string, userId: string): Promise<any>
    addMember(householdId: any, title: any, firstName: any, lastName: any, citizenId: any, relationship: any): Promise<any>
    editMember(id: string, body: any): Promise<any>
    deleteMember(id: string): Promise<any>
    getMemberAvailableUploadedFile(fileId: string, userId: string): Promise<any>
}

export default IMemberService