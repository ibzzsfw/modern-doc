import { Box, Button, Center, VStack, Wrap } from '@chakra-ui/react'
import FamilyInfoBox from '@components/FamilyInfoBox'
import { useLoginDataStore } from '@stores/LoginDataStore'
import { useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import shallow from 'zustand/shallow'

const FamilyPage = () => {
  const familyMembers = useLoginDataStore(
    (state) => state.familyMembers,
    shallow
  )
  //--------lockedit is a boolean state variable that is used to lock the edit button
  const [lockEdit, setLockEdit] = useState(false)
  const [addMember, setAddMember] = useState(false)

  const lockId = (id: string | null) => {
    if (id !== null) {
      setLockEdit(true)
    } else {
      setLockEdit(false)
    }
  }

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
            {(addMember || familyMembers.length == 0) && (
              <FamilyInfoBox
                onCancelButtonClick={() => {
                  setAddMember(false)
                }}
                isAdd={addMember}
              />
            )}
            {familyMembers.map((values, index) => {
              return (
                <FamilyInfoBox
                  data={values}
                  isAdd={false}
                  getId={(id: string | null) => lockId(id)} //get id from child to parent
                  handleForm={lockEdit}    //handle for one edit form at a time
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
  right: '0px',
}

export default FamilyPage
