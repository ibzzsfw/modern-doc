import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import FileController from '../../mvvm/view-models/FileController'
import FolderController from '../../mvvm/view-models/FolderController'
// import Note from '@view-models/Note'
import NoteViewModel from '../../mvvm/view-models/Note.viewmodel'
import NoteController from '../../mvvm/view-models/NoteController'
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'

type propsTypes = {
  customButton?: JSX.Element
  userId?: string
  documentId?: string | undefined
  doucmentType?: string | undefined
  type?: 'freeNote' | 'folderNote' | 'fileNote'
  noteContent?: String
  documentTitle: String
}

const TakeNote = ({
  customButton,
  userId,
  type,
  noteContent,
  documentId,
  doucmentType,
  documentTitle,
}: propsTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteType, setNoteType] = useState('')
  const [selectedDocumentID, setSelectedDocumentID] = useState('')
  const [selectedNote, setSelectedNote] = useState<NoteViewModel | null>(null)
  const [note, setNote] = useState<NoteViewModel[]>([])
  const toast = useToast()

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
  const editFolderNote = useMutation(
    (value: { content: string; id: string | undefined }) => {
      return FolderController.editNote(value.content, value.id)
    },
    {
      onSuccess: (variables: NoteType | any) => {
        toast({
          title: 'แก้ไขบันทึกสำเร็จ',
          description: `แก้ไขบันทึกสำเร็จ`,
          status: 'success',
          duration: 5000,
        })
      },
      onError: (error) => {
        toast({
          title: 'แก้ไขบันทึกไม่สำเร็จ',
          description: `${error}`,
          status: 'error',
          duration: 5000,
        })
      },
    }
  )

  const editFileNote = useMutation(
    (value: {
      content: string
      type: string | undefined
      id: string | undefined
    }) => {
      return FileController.editNote(value.content, value.type, value.id)
    },
    {
      onSuccess: (variables: NoteType | any) => {
        toast({
          title: 'แก้ไขบันทึกสำเร็จ',
          description: `แก้ไขบันทึกสำเร็จ`,
          status: 'success',
          duration: 5000,
        })
      },
      onError: (error: any) => {
        toast({
          title: 'แก้ไขบันทึกไม่สำเร็จ',
          description: `${error.massage}`,
          status: 'error',
          duration: 5000,
        })
      },
    }
  )

  const addFreeNote = useMutation(
    (value: NoteType) => {
      return NoteController.addFreeNote(value.heading, value.content)
    },
    {
      onSuccess: (data, variables) => {
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
          description: `${error}`,
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
          <ModalHeader>
            {documentTitle ? `แก้ไขบันทึกของ${documentTitle}` : 'สร้างบันทึก'}
          </ModalHeader>

          <Formik
            initialValues={
              documentTitle
                ? { content: noteContent }
                : { heading: '', content: '' }
            }
            onSubmit={(value: any) => {
              switch (type) {
                case 'freeNote':
                  addFreeNote.mutate(value)
                  break
                case 'fileNote':
                  editFileNote.mutate({
                    content: value.content,
                    type: doucmentType,
                    id: documentId,
                  })
                  break
                case 'folderNote':
                  editFolderNote.mutate({
                    content: value.content,
                    id: documentId,
                  })
                  break
                default:
                  break
              }
            }}
            onReset={(value) => {
              initialState()
            }}
          >
            <Form>
              <ModalBody sx={modalBody}>
                <FormControl>
                  {!documentTitle && (
                    <>
                      <Field name="heading">
                        {({ field, form }: any) => (
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
                    </>
                  )}

                  <Field name="content">
                    {({ field, form }: any) => (
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
