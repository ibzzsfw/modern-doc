import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
  Select,
  Input,
  Checkbox,
  Box,
  Textarea,
  Text,
  Spacer,
  HStack,
} from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react'

const UploadFile = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileExists, setFileExists] = useState(false)
  const [fileType, setFileType] = useState('upload')
  const [selectedFile, setSelectedFile] = useState('')
  const [isExpirable, setIsExpirable] = useState(true)
  const [wannaRemove, setWannaRemove] = useState(false)

  useEffect(() => {
    if (selectedFile == "outsideFile") {
      setFileType('outside')
    }
    setFileExists(selectedFile != "")
  }, [selectedFile])

  return (
    <>
      <Button onClick={onOpen} colorScheme={"red"}>Upload file</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>อัพโหลดเอกสาร</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={modalBody}>
            <HStack>
              <Text as="b">Click to experiment</Text>
              <Spacer />
              <Button
                variant="outline"
                colorScheme={fileExists ? "green" : "red"}
                onClick={() => setFileExists(!fileExists)}
              >
                File {!fileExists && "not"} exists
              </Button>
              <Button
                variant="outline"
                colorScheme={fileType == "upload" ? "orange" : "blue"}
                onClick={() => {
                  if (fileType == "upload") {
                    setFileType("generate")
                  } else {
                    setFileType("upload")
                  }
                }}
              >
                {fileType} file
              </Button>
            </HStack>
            <Input placeholder='พิมพ์เพื่อค้นหาเอกสาร' />
            <Select placeholder='เลือกเอกสาร' onChange={(e) => setSelectedFile(e.target.value)}>
              <option value='outsideFile'>เอกสารภายนอก</option>
              {
                [1, 2, 3, 4].map((i) => {
                  return <option value={`system_file_${i}`}>System file {i}</option>
                })
              }
            </Select>
            {
              fileType != "generate" &&
              <Center sx={dropFile}>
                {
                  fileExists ?
                    <Box
                      sx={fileExistsBox}
                      onMouseOver={() => setWannaRemove(true)}
                      onMouseLeave={() => setWannaRemove(false)}
                    >
                      <Text as='b'>{selectedFile}</Text>
                      {
                        wannaRemove ?
                          <AiOutlineDelete color={wannaRemove ? "red" : "gray"} size={24} onClick={() => setFileExists(false)} /> :
                          <Text as='b'>1.2 MB</Text>
                      }
                    </Box> :
                    <Box sx={activeDrop}>
                      <Image src="/assets/upload-cloud.svg" />
                    </Box>
                }
              </Center>
            }
            {
              selectedFile === 'outsideFile' ?
                <>
                  <Input placeholder='ตั้งชื่อไฟล์' />
                  <Box sx={expirationSection}>
                    <Checkbox
                      defaultChecked
                      onChange={(e) => setIsExpirable(e.target.checked)}
                    >
                      {!isExpirable ? 'เอกสารมีวันหมดอายุ' : 'กำหนดวันหมดอายุ'}
                    </Checkbox>
                    {
                      isExpirable &&
                      <Input type="date" width="30%" />
                    }
                  </Box>
                </> :
                selectedFile !== "" &&
                <Input variant='filled' value={`${selectedFile} จะหมดอายุในวันที่ ${"31 ธันวาคม 2564"} หากท่านอัพโหลดวันนี้`} isReadOnly />
            }
            <Textarea placeholder='บันทึกที่จัดเก็บของเอกสารดังกล่าว หรือเตือนความจำบางอย่างกับเอกสารชุดนี้' />
          </ModalBody>
          <ModalFooter>
            {(fileExists && fileType != "generate") && <Button colorScheme="blue">ตรวจสอบไฟล์ที่อัปโหลด</Button>}
            <Spacer />
            <Button onClick={onClose}>ยกเลิก</Button>
            <Button colorScheme='green' ml="12px">
              {
                fileType == "generate" ? "สร้างเอกสาร" : "อัพโหลด"
              }
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

let dropFile = {
  width: '100%',
  height: "fit-content",
  border: "1px",
  borderColor: "accent.gray",
  borderRadius: "4px",
  cursor: "pointer",
}

let modalBody = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  rowGap: "24px",
}

let expirationSection = {
  display: "flex",
  alignItems: "center",
  columnGap: "16px",
  width: "100%",
  height: "40px",
}

let fileExistsBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "fit-content",
  padding: "8px",
  margin: "8px",
  border: "1px",
  borderColor: "accent.gray",
  backgroundColor: "#F1F3F5",
  _hover: {
    // backgroundColor light red
    backgroundColor: "#FDE8E8",
    borderColor: "accent.red",
  }
}

let activeDrop = {
  display: "flex",
  justifyContent: "center",
  padding: "72px 0",
  width: "100%",
  _hover: {
    backgroundColor: "#FDE8E8",
  }
}

export default UploadFile