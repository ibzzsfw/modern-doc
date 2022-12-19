import { Box, Button, Center, VStack, Wrap } from '@chakra-ui/react'
import FamilyInfoBox from '@components/FamilyInfoBox.component'
import FamilyPageViewController from '@view-controllers/Family.page.viewcontroller'
import { AiOutlineUserAdd } from 'react-icons/ai'

const FamilyPage = () => {

  const viewController = new FamilyPageViewController()
  const [lockEdit, setLockEdit] = viewController.lockEditState
  const [addMember, setAddMember] = viewController.addMemberState

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
            {(addMember || viewController.family.length == 0) && (
              <FamilyInfoBox
                onCancelButtonClick={() => {
                  setAddMember(false)
                }}
                isAdd={addMember}
              />
            )}
            {viewController.family.map((values) => {
              return (
                <FamilyInfoBox
                  data={values}
                  isAdd={false}
                  getId={(id: string | null) => viewController.lockId(id)} //get id from child to parent
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
