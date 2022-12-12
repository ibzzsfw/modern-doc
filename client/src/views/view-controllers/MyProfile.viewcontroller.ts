import { LoginDataModel } from "@models/LoginDataStore.model";

class MyProfileViewController {

  private user = LoginDataModel.getState().user

  constructor() {}

  getUser = () => this.user
    
}

export default MyProfileViewController;