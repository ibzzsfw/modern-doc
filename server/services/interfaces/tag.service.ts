interface ITagService {
    addTag: (name: string) => Promise<{ status: number; json: any }>
    addTagMany: (tags: any) => Promise<{ status: number; json: any }>
    getAllTag: () => Promise<{ status: number; json: any }>
    getTagByName: (name: any) => Promise<{ status: number; json: any }>
    getTagById: (id: string) => Promise<{ status: number; json: any }>
    editTagName: (id: string, name: string) => Promise<{ status: number; json: any }>
}

export default ITagService