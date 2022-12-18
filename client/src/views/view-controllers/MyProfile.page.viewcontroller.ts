import UserModel from '../../models/User.model'

class MyProfileViewController {

  private user = UserModel.getState().user

  constructor() {}

  getUser = () => this.user
    
}

export default MyProfileViewController;