interface INoteService {
    addFreeNote: (heading: string, content: string, userId: string) => Promise<{ status: number; json: any }>
    editNote: (noteId: string, heading: string, content: string, userId: string) => Promise<{ status: number; json: any }>
    deleteNote: (noteId: string, userId: string) => Promise<{ status: number; json: any }>
    getAllNote: (userId: string) => Promise<{ status: number; json: any }>
}

export default INoteService