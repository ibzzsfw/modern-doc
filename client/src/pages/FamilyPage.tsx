import FamilyInfo from '@/components/FamilyInfo'
import { Button, Box, VStack, Flex, Center, Wrap } from '@chakra-ui/react'

const FamilyPage = () => {
  return (
    <Center>
      <Box width="909px">
        <VStack>
          <Box width="100%" textAlign="right">
            <Button variant="solid" color="accent.blue">
              เพิ่มสามาชิก
            </Button>
          </Box>

          <Wrap spacing="28px">
            <FamilyInfo />
            <FamilyInfo />
          </Wrap>
        </VStack>
      </Box>
    </Center>
  )
}

export default FamilyPage
