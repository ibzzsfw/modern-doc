import { useState } from "react";
import UserModel from '../../models/User.model'
import SearchModel from '../../models/Search.model';

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