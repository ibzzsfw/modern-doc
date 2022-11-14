import create from 'zustand'

type SearchDocumentStore = {
  search: string,
  setSearch: (value: string) => void,
  searchResult: any | any[],
  setSearchResult: (value: any) => void,
}

export const useSearchDocumentStore = create<SearchDocumentStore>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
  searchResult: [],
  setSearchResult: (value) => set({ searchResult: value }),
}))