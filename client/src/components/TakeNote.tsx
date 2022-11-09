import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

const TakeNote = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteType, setNoteType] = useState("")
  const [selectedDocument, setSelectedDocument] = useState("")

  let modalBody = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: "24px",
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme={"blue"}>Take note</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>สร้างบันทึก</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={modalBody}>
            <Select
              placeholder="ประเภทของบันทึก"
              onChange={(e) => {
                setNoteType(e.target.value)
                setSelectedDocument("")
              }}
            >
              <option value="free_note">บันทึกอิสระ</option>
              <option value="file_note">บันทึกในเอกสาร</option>
              <option value="folder_note">บันทึกในแฟ้ม</option>
            </Select>
            {
              noteType == "file_note" ?
                <Select placeholder="เลือกเอกสาร" onChange={(e) => setSelectedDocument(e.target.value)}>
                  <option value="file1">เอกสาร 1</option>
                  <option value="file2">เอกสาร 2</option>
                  <option value="file3">เอกสาร 3</option>
                </Select>
                : noteType == "folder_note" ?
                  <Select placeholder="เลือกแฟ้ม" onChange={(e) => setSelectedDocument(e.target.value)}>
                    <option value="folder1">แฟ้ม 1</option>
                    <option value="folder2">แฟ้ม 2</option>
                    <option value="folder3">แฟ้ม 3</option>
                  </Select>
                  : noteType == "free_note" ?
                    <Select placeholder="เลือกบันทึก" onChange={(e) => setSelectedDocument(e.target.value)}>
                      <option value="new_free_note">บันทึกอิสระใหม่</option>
                      <option value="free1">บันทึกอิสระ 1</option>
                      <option value="free2">บันทึกอิสระ 2</option>
                    </Select>
                    : null
            }
            {noteType && <Textarea placeholder={selectedDocument != "" ? `เนื้อหาเดิมของ ${selectedDocument}` : "เนื้อหาใหม่"} />}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>ยกเลิก</Button>
            <Button colorScheme='blue' ml="12px">บันทึก</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TakeNote