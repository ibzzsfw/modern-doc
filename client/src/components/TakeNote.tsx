import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Note from '@models/Note'
import NoteController from '@models/NoteController'
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'

type propsTypes = {
  customButton?: JSX.Element
  userId?: string
  type?: string
}

const TakeNote = ({ customButton, userId, type }: propsTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteType, setNoteType] = useState('')
  const [selectedDocumentID, setSelectedDocumentID] = useState('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [note, setNote] = useState<Note[]>([])
  const [selectPlaceholder, setSelectPlaceholder] = useState('')
  const toast = useToast()
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

  interface NoteType {
    heading: string
    content: string
  }
  const addNote = useMutation(
    (value: NoteType) => {
      return NoteController.addFreeNote(value.heading, value.content)
    },
    {
      onSuccess: (variables: NoteType | any) => {
        toast({
          title: 'สร้างบันทึกสำเร็จ',
          description: `สร้าง${variables.heading}สำเร็จ`,
          status: 'success',
          duration: 5000,
        })
      },
      onError: (error) => {
        toast({
          title: 'สร้างบันทึกไม่สำเร็จ',
          description: `${error.massage}`,
          status: 'error',
          duration: 5000,
        })
      },
    }
  )

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
          <Formik
            initialValues={{ heading: '', content: '' }}
            onSubmit={(value) => {
              addNote.mutate(value)
            }}
            onReset={(value) => {
              console.log('reset', value)
              initialState()
            }}
          >
            <Form>
              <ModalBody sx={modalBody}>
                <FormControl>
                  <Field name="heading">
                    {({ field, form }) => (
                      <>
                        <FormLabel>หัวข้อ</FormLabel>
                        <Input
                          id="heading"
                          {...field}
                          name="heading"
                          placeholder="หัวข้อบันทึก"
                        />
                      </>
                    )}
                  </Field>
                  <br />
                  <br />
                  <Field name="content">
                    {({ field, form }) => (
                      <>
                        <FormLabel>เนื้อหา</FormLabel>
                        <Textarea
                          {...field}
                          id="content"
                          name="content"
                          placeholder={'เนื้อหาที่จะบันทึก'}
                        />
                      </>
                    )}
                  </Field>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="reset">ยกเลิก</Button>
                <Button colorScheme="blue" marginLeft="12px" type="submit">
                  บันทึก
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
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
