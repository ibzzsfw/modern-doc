import {
  Box,
  Button,
  Center,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import FamilyInfoBox from '@components/FamilyInfoBox'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useLoginDataStore } from '@stores/LoginDataStore'
import shallow from 'zustand/shallow'


const FamilyPage = () => {
  const familyMembers = useLoginDataStore(
    (state) => state.familyMembers,
    shallow
  )

  
  
  const [lockEdit, setLockEdit] = useState(false)
  const [addMember,setAddMember] = useState(false)
  const lockedit = (id:any) => {
        if(id !== null){
          setLockEdit(true)
        }else{
          setLockEdit(false)
        }
  }
  const [family, setfamily] = useState([
    {
      id: 1,
      firstName: 'ใจดี',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'น้อง',
      citizenId: '1448755284320',
      title: 'เด็กชาย',
    },
    {
      id: 2,
      firstName: 'ใจโซเซ',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'น้อง',
      citizenId: '1 4487 77554 41 7',
      title: 'เด็กหญิง',
    },
    {
      id: 3,
      firstName: 'ใจเกเร',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'พี่',
      citizenId: '5 4487 45563 21 4',
      title: 'นาย',
    },
  ])


  return (
    <Center>
      <Box width="909px">
        <VStack>
          <Box width="100%" textAlign="right">
            <Button
              disabled={addMember}
              variant="outline"
              sx={editButton}
              colorScheme="gray"
              leftIcon={<AiOutlineUserAdd />}
              onClick={() => {
                setAddMember(true)
              }}
            >
              เพิ่มสมาชิก
            </Button>
          </Box>
          <Wrap spacing="28px">
            {
              (addMember || family.length == 0) &&
              <FamilyInfoBox 
              onCancelButtonClick={()=>{setAddMember(false)}}
              isAdd = {true}
              />
            }
            {familyMembers.map((values, index) => {
              return (
                  <FamilyInfoBox
                    data={values}
                    isAdd = {false}
                    getId = {(id:any)=>lockedit(id)}
                    disabled={lockEdit}
                  />
              )
            })}
          </Wrap>
        </VStack>
      </Box>
    </Center>
  )
}

let editButton = {
  width: 'auto',
  height: '40px',
  backgroundColor: 'accent.white',
  right: '0px'
}

export default FamilyPage


