interface IUserService {
    checkCitizenIdStatus: (citizenId: string) => Promise<any>
    checkPhoneStatus: (phone: string) => Promise<any>
    addUser: (body: any) => Promise<any>
    checkPhonePassword: (phoneNumber: string, password: string) => Promise<any>
    login: (phoneNumber: string) => Promise<any>
    getFolders: (userId: string) => Promise<any>
    getFiles: (userId: string) => Promise<any>
    switchMember: (userId: string) => Promise<any>
    editProfile: (userId: string, body: any) => Promise<any>
    changePassword: (userId: string, oldPassword: string, newPassword: string) => Promise<any>
}

export default IUserService