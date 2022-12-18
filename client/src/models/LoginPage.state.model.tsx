import create from 'zustand'

/**
 * @interface ILoginPageModel
 * @description store for login page
 * @property {0 | 1} tabIndex - current tab index, 0 for login, 1 for register
 * @property {function} setTabIndex - set current tab index
 */
interface ILoginPageModel {
  tabIndex: 0 | 1
  setTabIndex: (value: 0 | 1) => void
}

export const LoginPageModel = create<ILoginPageModel>((set) => ({
  tabIndex: 0,
  setTabIndex: (value) => set({ tabIndex: value }),
}))
