import shallow from "zustand/shallow";
import { LoginPageModel } from "@models/LoginPage.state.model";

class LoginPageViewController {

  loginPageStore = LoginPageModel(
    (state) => ({
      tabIndex: state.tabIndex,
      setTabIndex: state.setTabIndex,
    }),
    shallow
  )

  constructor() {}
}

export default LoginPageViewController;