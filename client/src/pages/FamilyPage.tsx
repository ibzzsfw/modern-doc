import {
  Box,
  Button,
  Center,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useState } from 'react'
import FamilyInfoBox from '@components/FamilyInfoBox'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useFamilyPageStore } from '@stores/FamilyPageStore'

const FamilyPage = () => {
  
  const { page, setPage, mode, setMode } = useFamilyPageStore()
  const [family, setfamily] = useState([
    {
      id: 1,
      prefix: 'เด็กชาย',
      firstName: 'ใจดี',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'น้อง',
      citizenId: '1 4487 55284 32 0',
    },
    {
      id: 2,
      prefix: 'เด็กหญิง',
      firstName: 'ใจโซเซ',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'น้อง',
      citizenId: '1 4487 77554 41 7',
    },
    {
      id: 3,
      prefix: 'นาย',
      firstName: 'ใจเกเร',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'พี่',
      citizenId: '5 4487 45563 21 4',
    },
  ])

  let editButton = {
    width: 'auto',
    height: '40px',
    backgroundColor: 'accent.white',
    // color: 'black',
    right: '0px',
    // border: '1px solid',
    // borderColor: '#E2E8F0',

    // _hover: {
    //   backgroundColor: 'hover.gray',
    //   color: 'white',
    // },
    // _active: {
    //   backgroundColor: 'hover.white',
    // },
  }

  return (
    <Center>
      <Box width="909px">
        <VStack>
          <Box width="100%" textAlign="right">
            <Button
              disabled={page == 0}
              variant="outline"
              // color="accent.blue"
              sx={editButton}
              colorScheme='gray'
              leftIcon={<AiOutlineUserAdd />}
              onClick={() => {
                setMode('add')
                setPage(0)
              }}
            >
              เพิ่มสมาชิก
            </Button>
          </Box>
          <Wrap spacing="28px">
            {
              (page == 0 || family.length == 0) &&
              <FamilyInfoBox activeForm="true" menuActive={false} />
            }
            {family.map((values, index) => {
              return (
                <>
                  <FamilyInfoBox
                    menuActive={true}
                    data={values}
                    activeForm={false}
                  />
                </>
              )
            })}
          </Wrap>
        </VStack>
      </Box>
    </Center>
  )
}

export default FamilyPage
