import create from 'zustand'

/**
 * @interface ISearchBoxModel
 * @description SearchBoxModel interface for search box
 * @property {string} search - current search
 * @property {any | any[]} searchResult - current search result
 * @property {function} setSearch - set current search
 * @property {function} setSearchResult - set current search result
  */
interface ISearchBoxModel {
  search: string,
  searchResult: any | any[],
  setSearch: (value: string) => void,
  setSearchResult: (value: any) => void,
}

export const SearchBoxModel = create<ISearchBoxModel>((set) => ({
  search: '',
  searchResult: [],
  setSearch: (value) => set({ search: value }),
  setSearchResult: (value) => set({ searchResult: value }),
}))