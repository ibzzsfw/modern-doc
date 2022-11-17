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
import Householder from '@models/Householder'
import Axios from 'axios'

const FamilyPage = () => {
  let info = [
    
  ]
  const [addMember,setAddMember] = useState(false)



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

  const getFamily = async () => {
    // get family from api
    const res = await Axios.get('/api/family')
    setfamily(res.data)
  }

  useEffect(()=>{
    console.log('getFamily')
    getFamily()

  })

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
              disabled={addMember}
              variant="outline"
              // color="accent.blue"
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
              <FamilyInfoBox boxMode= 'add' closeBTN = {()=>{setAddMember(false)}}/>
            }
            {family.map((values, index) => {
              return (
                <>
                  <FamilyInfoBox
                    data={values}
                    boxMode= 'edit'
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
