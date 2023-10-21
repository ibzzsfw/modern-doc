interface IFileService {
    getFileById(id: string, type: string, userId: string): Promise<any>
    getLatestFiles(type: string, userId: string): Promise<any>
    searchByName(name: string, userId: string): Promise<any>
    getAll(userId: string): Promise<any>
    newGeneratedFile(fileId: string, fields: any[], userId: string): Promise<any>
    newUploadedFile(fileId: string, URI: string, note: string, expired: Date | null, userId: string): Promise<any>
    addNote(fileId: string, type: string, note: string, userId: string): Promise<any>
    shareFile(fileId: string, type: string, userId: string): Promise<any>
    unShareFile(fileId: string, type: string, userId: string): Promise<any>
    deleteFile(fileId: string, type: string, userId: string): Promise<any>
    newUserFreeUploadFile(officialName: string, note: string, expirationDate: any, URI: string, userId: string): Promise<any>
    getFreeUploadFile(fileId: string): Promise<any>
    getSharedFile(fileId: string, type: string): Promise<any>
}

export default IFileService