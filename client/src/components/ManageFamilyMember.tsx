import {
  Button,
  Box,
  VStack,
  Flex,
  Center,
  Wrap,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import FamilyInfoBox from '@/components/FamilyInfoBox'
import { useState } from 'react'

type propTypes = {
  cancel?: () => void
  isEdit?: string | 'edit' | 'add'
  data?: any
}
const ManageFamilyMember = ({ cancel, isEdit, data }: propTypes) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  let addmemberSuccess = {
    title: 'เพิ่มสมาชิกในครอบครัวสำเร็จ',
    description: 'คุณได้เพิ่มสมาชิกในครอบครัวเรียบร้อยแล้ว',
    status: 'success',
    duration: 5000,
  }
  let addmemberFail = {
    title: 'เพิ่มสมาชิกในครอบครัวไม่สำเร็จ',
    description: 'คุณไม่สามารถใช้เลขบัตรประชาชนนี้ได้',
    status: 'error',
  }
  let editmemberSuccess = {
    title: 'แก้ไขข้อมูลสำเร็จ',
    description: 'คุณได้แก้ไขข้อมูลสมาชิกในครอบครัวสำเร็จ',
    status: 'success',
  }

  if (isEdit == 'add') {
    return (
      <Center>
        <FamilyInfoBox
          callback={cancel}
          activeForm={true}
          toast={addmemberSuccess}
          disablecitizenId={true}
        />
      </Center>
    )
  } else if (isEdit == 'edit') {
    return (
      <Center>
        <FamilyInfoBox
          callback={cancel}
          activeForm={true}
          data={data}
          toast={editmemberSuccess}
          disablecitizenId={false}
        />
      </Center>
    )
  }
}

export default ManageFamilyMember
