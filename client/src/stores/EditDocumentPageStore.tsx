import create from "zustand";


type EditDocumentPageStore = {
    page : number,
    setPage : (page : number) => void,
    field : any,
    setField : (field : any) => void,
}

export const useEditDocumentPageStore = create<EditDocumentPageStore>((set) => ({
    page : 0,
    setPage : (page) => set({page}),
    field : null,
    setField : (field) => set({field})
    
}) )  