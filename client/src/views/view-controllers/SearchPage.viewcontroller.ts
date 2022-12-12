import { SearchBoxModel } from "@models/SearchBoxStore.model";
import { useState } from "react";

class SearchPageViewController {

  searchBoxStore = SearchBoxModel()
  showFileState = useState(true)
  showFolderState = useState(true)

  constructor() {
    this.showFileState = useState(true)
    this.showFolderState = useState(true)
  }

}

export default SearchPageViewController;