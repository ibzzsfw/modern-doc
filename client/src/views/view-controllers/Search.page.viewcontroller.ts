import SearchModel from '../../mvvm/models/Search.model';
import { useState } from "react";

class SearchPageViewController {

  searchModel = SearchModel()
  showFileState = useState(true)
  showFolderState = useState(true)

  constructor() { }

}

export default SearchPageViewController;