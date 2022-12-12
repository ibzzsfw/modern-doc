import create from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import User from '@view-models/User'

type FamilyDataStore = {
  user: any
  setUser: (value: any) => void
}

export const useFamilyDataStore = create<FamilyDataStore>((set) => ({
  user: {
    userId: '',
    householdId: '',
    title: '',
    firstName: '',
    lastName: '',
    citizenId: '',
    phoneNumber: '',
    sex: '',
    token: '',
    relationship: '',
    profileURI: '',
  },
  setUser: (user) => {
    set({
      user: user,
    })
  },
}))
