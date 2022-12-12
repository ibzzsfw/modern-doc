import axios from 'axios'
import { LoginDataModel } from '@models/LoginDataStore.model'

interface MemberData {
  id: string
  title: string
  firstName: string
  lastName: string
  profileURI: string
}

class MemberController {
  static editMember = async (memberId: string, memberData: MemberData) => {
    const token = LoginDataModel.getState().user?.token
    const userId = LoginDataModel.getState().user?.id
    const setFamilyMembers = LoginDataModel.getState().setFamilyMembers
    const householdId = LoginDataModel.getState().user?.householdId

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
      setFamilyMembers(updatedMember.data)
      window.location.reload()
    }
    return response.data
  }

  static getAvailableUploadedFile = async (fileId: string) => {
    const token = LoginDataModel.getState().user?.token
    const userId = LoginDataModel.getState().user?.id
    const householdId = LoginDataModel.getState().user?.householdId

    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/member/available-uploadedFile/${fileId}`,
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    return response.data
  }
}

export default MemberController
