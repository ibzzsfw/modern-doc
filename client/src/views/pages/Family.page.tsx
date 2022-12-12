import { Box, Button, Center, VStack, Wrap } from '@chakra-ui/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import FamilyInfoBox from 'src/views/components/FamilyInfoBox.component'
import FamilyPageViewController from '../view-controllers/FamilyPage.viewcontroller'

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
              sx={addMemberButton}
              colorScheme="gray"
              leftIcon={<AiOutlineUserAdd />}
              onClick={() => setAddMember(true)}
            >
              เพิ่มสมาชิก
            </Button>
          </Box>
          <Wrap spacing="28px">
            {(addMember || viewController.familyMembers.length == 0) && (
              <FamilyInfoBox
                onCancelButtonClick={() => {
                  setAddMember(false)
                }}
                isAdd={addMember}
              />
            )}
            {viewController.familyMembers.map((values, index) => {
              return (
                <FamilyInfoBox
                  data={values}
                  isAdd={false}
                  getId={(id: string | null) => viewController.lockId(id)}
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

let addMemberButton = {
  width: 'auto',
  height: '40px',
  backgroundColor: 'accent.white',
  right: '0px',
}

export default FamilyPage
