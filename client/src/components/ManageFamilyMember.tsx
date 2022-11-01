import { Center } from '@chakra-ui/react'
import FamilyInfoBox from '@components/FamilyInfoBox'

type propTypes = {
  cancel?: () => void
  isEdit: 'edit' | 'add'
  data?: any
}
const ManageFamilyMember = ({ cancel, isEdit, data }: propTypes) => {
  let editmemberSuccess = {
    title: 'แก้ไขข้อมูลสำเร็จ',
    description: 'คุณได้แก้ไขข้อมูลสมาชิกในครอบครัวสำเร็จ',
    status: 'success',
  }

  return (
    <Center>
      <FamilyInfoBox
        callback={cancel}
        activeForm={true}
        data={isEdit == 'edit' ? data : null}
        toast={editmemberSuccess}
        disablecitizenId={!(isEdit == 'edit')}
      />
    </Center>
  )
}

export default ManageFamilyMember
