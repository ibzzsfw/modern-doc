import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Icon,
  Button,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import FamilyInputform from './FamilyInputform'
import ModalProvider from './ModalProvider'
import { useState } from 'react'

type dataTypes = {
  id: number
  prefix: string
  firstName: string
  lastName: string
  relationship: string
  citizenId: string
}

type propsType = {
  data?: dataTypes
  activeForm?: boolean | 'true' | 'false'
  menuActive?: boolean | 'false' | 'true'
  disablecitizenId?: boolean | 'false' | 'true'
  menuComponent?: any
  toast?: {} | []
  callback?: () => void
}
const FamilyInfoBox = ({
  data,
  activeForm,
  disablecitizenId,
  menuActive,
  menuComponent,
  callback,
  toast,
}: propsType) => {
  const [editFamily, setEditFamily] = useState(false)

  let boxLayout = {
    backgroundColor: 'background.white',
    margin: 'auto',
    borderRadius: '8px',
    position: 'relative',
    padding: '20px',
  }

  return (
    <Box sx={boxLayout}>
      <Flex height="100%">
        <HStack gap="32px">
          <Image
            src="https://bit.ly/sage-adebayo"
            boxSize="206px"
            borderRadius="8px"
          />
          <FamilyInputform
            menu={menuActive ? menuComponent : ''}
            disable={activeForm || editFamily}
            id={data?.id}
            prefix={data?.prefix}
            firstName={data?.firstName}
            lastName={data?.lastName}
            relationship={data?.relationship}
            citizenId={data?.citizenId}
            closeForm={callback}
            toast={toast}
            citizenIdDisable={disablecitizenId}
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default FamilyInfoBox
