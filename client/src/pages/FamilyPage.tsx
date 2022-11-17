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

  const [lockEdit, setLockEdit] = useState(false)
  const [addMember, setAddMember] = useState(false)
  const lockedit = (id: string | null) => {
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
                isAdd={true}
              />
            )}
            {familyMembers.map((values, index) => {
              return (
                <FamilyInfoBox
                  data={values}
                  isAdd={false}
                  //get id from child to parent
                  getId={(id: string | null) => lockedit(id)}
                  //handle for one
                  handleForm={lockEdit}
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
