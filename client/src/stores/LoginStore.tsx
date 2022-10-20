import create from 'zustand'

type LoginStore = {
  tabIndex: 0 | 1
  setTabIndex: (value: 0 | 1) => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  tabIndex: 0,
  setTabIndex: (value) => set({ tabIndex: value }),
}))
