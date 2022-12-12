import create from "zustand";

/**
 * @interface IEditDocumentPageModel
 * @description EditDocumentPageModel interface for edit document in pages
 * @property {number} page - current page
 * @property {any} field - current field
 * @property {function} setPage - set current page
 * @property {function} setField - set current field
 */
interface IEditDocumentPageModel {
    page: number,
    field: any,
    setPage: (page: number) => void,
    setField: (field: any) => void,
}

export const EditDocumentPageModel = create<IEditDocumentPageModel>((set) => ({
    page: 0,
    field: null,
    setPage: (page) => set({ page }),
    setField: (field) => set({ field })
}))