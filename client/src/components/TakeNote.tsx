import {
  Box,
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
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Note from '@models/Note'
import NoteController from '@models/NoteController'

type propsTypes = {
  customButton?: JSX.Element
}

const TakeNote = ({ customButton }: propsTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteType, setNoteType] = useState('')
  const [selectedDocumentID, setSelectedDocumentID] = useState('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [note, setNote] = useState<Note[]>([])
  const [selectPlaceholder, setSelectPlaceholder] = useState('')
  /*
  useEffect(() => {
    let notes = NoteController.getNotes(noteType)
    switch (noteType) {
      case 'free_note':
        setSelectPlaceholder('เลือกบันทึก')
        break
      case 'folder_note':
        setSelectPlaceholder('เลือกแฟ้ม')
        break
      case 'file_note':
        setSelectPlaceholder('เลือกเอกสาร')
        break
      default:
        setSelectPlaceholder('')
        break
    }
    setNote(notes)
  }, [noteType])

  useEffect(() => {
    if (selectedDocumentID) {
      let findNote = Note.getNoteData(noteType, selectedDocumentID)
      setSelectedNote(findNote)
    }
  }, [selectedDocumentID])
*/
  const initialState = () => {
    onClose()
    setNoteType('')
    setSelectedDocumentID('')
    setSelectedNote(null)
    setNote([])
  }

  const saveNote = () => {
    Note.postSaveNote()
    initialState()
  }

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

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>สร้างบันทึก</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={modalBody}>
            <FormControl>
              <FormLabel>หัวข้อ</FormLabel>
              <Input placeholder="หัวข้อบันทึก" />
              <br />
              <br />
              <FormLabel>เนื้อหา</FormLabel>
              <Textarea
                placeholder={
                  selectedNote ? selectedNote.content : 'เนื้อหาที่จะบันทึก'
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={initialState}>ยกเลิก</Button>
            <Button colorScheme="blue" marginLeft="12px" onClick={saveNote}>
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

let modalBody = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: '24px',
}

export default TakeNote
