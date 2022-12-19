import SearchModel from '@models/Search.model';
import UserModel from '@models/User.model';
import { useState } from "react";

class HomePageViewController {

  private user = UserModel.getState().user
  searchModel = SearchModel()
  searchValueState = useState('')

  constructor() {
    this.searchValueState = useState('')
  }

  getUser = () => this.user
}

export default HomePageViewController;