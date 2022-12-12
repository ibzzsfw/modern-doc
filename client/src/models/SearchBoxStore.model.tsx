import create from 'zustand'

type SearchBoxStore = {
  search: string,
  setSearch: (value: string) => void,
  searchResult: any | any[],
  setSearchResult: (value: any) => void,
}

export const useSearchBoxStore = create<SearchBoxStore>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
  searchResult: [],
  setSearchResult: (value) => set({ searchResult: value }),
}))