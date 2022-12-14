import FreeUploadedFileViewModel from "@view-models/FreeUploadFile.viewmodel";
import GenerateFileViewModel from "@view-models/GenerateFiles.viewmodel";
import UploadFileViewModel from "@view-models/UploadFile.viewmodel";
import create from "zustand";

type searchResultType = GenerateFileViewModel
  | UploadFileViewModel
  | FreeUploadedFileViewModel

interface ISearchModel {
  search: string;
  searchResult: searchResultType[];
  setSearch: (search: string) => void;
  setSearchResult: (searchResult: searchResultType[]) => void;
}

const SearchModel = create<ISearchModel>((set) => ({
  search: "",
  searchResult: [],
  setSearch: (search: string) => set({ search }),
  setSearchResult: (searchResult: searchResultType[]) =>
    set({ searchResult }),
}));

export default SearchModel;