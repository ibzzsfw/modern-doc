import { useLoginDataStore } from "@models/LoginDataStore.model";

class MyProfileViewController {

  private user = useLoginDataStore.getState().user

  constructor() {}

  getUser = () => this.user
    
}

export default MyProfileViewController;