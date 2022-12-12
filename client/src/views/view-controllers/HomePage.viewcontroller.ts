import { useState } from "react";
import { LoginDataModel } from "@models/LoginDataStore.model";
import { SearchBoxModel } from "@models/SearchBoxStore.model";

class HomePageViewController {

  private user = LoginDataModel.getState().user
  searchBoxStore = SearchBoxModel()
  searchValueState = useState('')

  constructor() {
    this.searchValueState = useState('')
  }

  getUser = () => this.user
}

export default HomePageViewController;