interface IFolderService {
    getFolderById: (id: string, userId: string) => Promise<any>
    getLatestFolder: (userId: string) => Promise<any>
    searchByName: (name: string, userId: string) => Promise<any>
    getAll: (userId: string) => Promise<any>
    addNote: (userFolderId: string, note: string, userId: string) => Promise<any>
    getField: (generatedFileIds: any, userId: string) => Promise<any>
    saveFolder: (folderId: string, fields: any, generatedFiles: any, userId: string) => Promise<any>
}

export default IFolderService