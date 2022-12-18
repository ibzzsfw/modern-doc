import axios from 'axios'
import UserModel from '@models/User.model'

interface AddMemberData {
  householdId: string
  title: string
  firstName: string
  lastName: string
  citizenId: string
  relationship: string
}
interface EditMemberData {
  id: string
  title: string
  firstName: string
  lastName: string
  profileURI: string
}
class MemberController {

  static addMember = async (memberData: AddMemberData) => {

    const token = UserModel.getState().user?.token
    const userId = UserModel.getState().user?.id
    const setFamily = UserModel.getState().setFamily
    const householdId = UserModel.getState().user?.householdId
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/member`,
      { ...memberData, householdId: householdId },
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

  static deleteMember = async (memberId: string) => {
    const token = UserModel.getState().user?.token
    const userId = UserModel.getState().user?.id
    const setFamily = UserModel.getState().setFamily
    const householdId = UserModel.getState().user?.householdId

    let response = await axios.delete(
      `${process.env.VITE_API_ENDPOINT}/member/${memberId}`,
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

  static editMember = async (memberId: string, memberData: EditMemberData) => {
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
      console.log(updatedMember.data)
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
    return response.data
  }
}

export default MemberController
