import { useSearchBoxStore } from "@models/SearchBoxStore.model";
import { useState } from "react";

class SearchPageViewController {

  searchBoxStore = useSearchBoxStore()
  showFileState = useState(true)
  showFolderState = useState(true)

  constructor() {
    this.showFileState = useState(true)
    this.showFolderState = useState(true)
  }

}

export default SearchPageViewController;