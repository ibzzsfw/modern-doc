import { LoginPageModel } from "@models/LoginPage.state.model";
import shallow from "zustand/shallow";

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