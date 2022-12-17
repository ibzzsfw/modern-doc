import axios from 'axios'
// import { LoginDataModel } from '@models/LoginDataStore.model'
import UserModel from '../models/User.model'
import UserViewModel from './User.viewmodel'
import SystemFileViewModel from './SystemFile.viewmodel'
class MemberController {

  static editMember = async (memberId: string, memberData: UserViewModel) => {
    const token = UserModel.getState().user?.token
    const userId = UserModel.getState().user?.id
    const setFamily = UserModel.getState().setFamily
    const householdId = UserModel.getState().user?.householdId

    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/member/${memberId}`,
      memberData,
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    if (response.status === 200) {
      let updatedMember = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/member`,
        {
          headers: {
            token: token,
            'user-id': userId,
            'household-id': householdId,
          },
        }
      )
      setFamily(updatedMember.data)
      window.location.reload()
    }
    return response.data
  }

  static getAvailableUploadedFile = async (fileId: string) => {
    const token = UserModel.getState().user?.token
    const userId = UserModel.getState().user?.id

    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/member/available-uploadedFile/${fileId}`,
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    let available: object[] = []
    response.data.map((member: any) => {
      let { URI, firstName, id, lastName, profileURI, relationship } = member
      available.push({
        member: new UserViewModel({
          id,
          firstName,
          lastName,
          profileURI,
          relationship
        }),
        systemFile: new SystemFileViewModel({ URI })
      })
    })
    return available
  }
}

export default MemberController
