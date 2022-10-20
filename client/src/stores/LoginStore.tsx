import create from 'zustand'

type LoginStore = {
  phone: string
  password: string
  setPhone: (phone: string) => void
  setPassword: (password: string) => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  phone: '',
  password: '',
  setPhone: (phone: string) => set({ phone }),
  setPassword: (password: string) => set({ password }),
}))
