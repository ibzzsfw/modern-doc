import create from 'zustand'

type LoginPageStore = {
  tabIndex: 0 | 1
  setTabIndex: (value: 0 | 1) => void
}

export const useLoginPageStore = create<LoginPageStore>((set) => ({
  tabIndex: 0,
  setTabIndex: (value) => set({ tabIndex: value }),
}))
