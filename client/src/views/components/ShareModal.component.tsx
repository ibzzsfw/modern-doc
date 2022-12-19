import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

type propsTypes = {
  customButton?: JSX.Element
}

const 

ShareModal = ({ customButton }: propsTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteType, setNoteType] = useState('')
  const [officialName, setOfficialName] = useState([
    'ใบขับขี่',
    'บัตรประชาชน',
    'สำเนาทะเบียนบ้าน',
  ])
  const [value, setValue] = useState({})
  return (
    <>
      {customButton ? (
        <Box as="button" onClick={onOpen}>
          {customButton}
        </Box>
      ) : (
        <Button onClick={onOpen} colorScheme={'blue'}>
          Take note
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>เพิ่มเอกสารที่แชร์ร่วมกัน</ModalHeader>
          <ModalBody sx={modalBody}>
            <FormControl>
              <FormLabel width="100%">ประเภทเอกสาร</FormLabel>
              <Select
                placeholder="เลือกประเภทเอกสาร"
                onChange={(e) => setNoteType(e.target.value)}
              >
                <option value="file_note">เอกสาร</option>
                <option value="free_note">บันทึก</option>
              </Select>
              <br />
              <FormLabel width="100%">ชื่อเอกสาร</FormLabel>
              <Select
                placeholder="ชื่อเอกสาร"
                onChange={(e) => {
                  setValue(e.target.value)
                }}
              >
                {officialName.map((name, index) => {
                  return (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} type="reset">
              ยกเลิก
            </Button>
            <Button
              colorScheme="blue"
              marginLeft="12px"
            >
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ShareModal

let modalBody = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: '24px',
}
