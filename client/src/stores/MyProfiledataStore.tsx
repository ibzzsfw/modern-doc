import create from 'zustand'
import User from '@models/User'


type MyProfiledataStore = {
    user: any
    setUser(user: any): void
    profileUrl : string
    setUrl (url : string) : void
}


export const useProfiledataStore = create<MyProfiledataStore>((set)=> ({
      user: {
        id: '',
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
        password: '',
      },
    setUser : (value : any) => set({user : value }),
    profileUrl : '',
    setUrl : (value : string) => set({profileUrl : value})
})) 


