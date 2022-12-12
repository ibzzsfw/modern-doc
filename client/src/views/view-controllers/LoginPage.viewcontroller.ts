import shallow from "zustand/shallow";
import { useLoginPageStore } from "@models/LoginPageStore.model";

class LoginPageViewController {

  loginPageStore = useLoginPageStore(
    (state) => ({
      tabIndex: state.tabIndex,
      setTabIndex: state.setTabIndex,
    }),
    shallow
  )

  constructor() {}
}

export default LoginPageViewController;