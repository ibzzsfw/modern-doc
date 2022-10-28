import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Icon,
  Button,
  VStack,
} from '@chakra-ui/react'
import FamilyInputform from './FamilyInputform'
import MenuProvider from './MenuProvider'

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
  menuComponent : any
}

const FamilyInfoBox = ({ data, activeForm, menuActive, menuComponent }: propsType) => {
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
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default FamilyInfoBox
