import { useState } from "react";
import { useLoginDataStore } from "@models/LoginDataStore.model";
import { useSearchBoxStore } from "@models/SearchBoxStore.model";

class HomePageViewController {

  private user = useLoginDataStore.getState().user
  searchBoxStore = useSearchBoxStore()
  searchValueState = useState('')

  constructor() {
    this.searchValueState = useState('')
  }

  getUser = () => this.user
}

export default HomePageViewController;