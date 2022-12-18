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
  chakra,
} from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import FileController from '@view-models/FileController'
import { uploadFile } from '@firebase'
import { v4 as uuidv4 } from 'uuid'
import UploadedFile from '@view-models/UploadFile.viewmodel'

type propsType = {
  open?: boolean
  setOpen?: (open: boolean) => void
  file?: UploadedFile | null
  customButton?: JSX.Element
  type?: string
}

const UploadFile = ({ open, setOpen, file, customButton, type }: propsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileExists, setFileExists] = useState(false)
  const [fileType, setFileType] = useState('upload')
  const [selectedFile, setSelectedFile] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isExpirable, setIsExpirable] = useState(false)
  const [wannaRemove, setWannaRemove] = useState(false)
  const [note, setNote] = useState('')
  const [expiredDate, setExpiredDate] = useState<null | Date>(null)
  const [officialName, setOfficialName] = useState('')

  useEffect(() => {
    if (open) {
      onOpen()
    }
  }, [open])

  useEffect(() => {
    if (selectedFile == 'outsideFile') {
      setFileType('outside')
    }
    setFileExists(selectedFile != '')
  }, [selectedFile])

  const closeModal = () => {
    onClose()
    if (setOpen) setOpen(false)
  }

  useEffect(() => {
    setNote('')
    setUploadedFile(null)
    setExpiredDate(null)
    setIsExpirable(false)
    setFileExists(false)
  }, [file])

  return (
    <>
      {customButton && (
        <Box as="button" onClick={onOpen}>
          {customButton}
        </Box>
      )}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeModal}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>อัพโหลดเอกสาร {file?.officialName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={modalBody}>

            {fileType != 'generate' && (
              <Center sx={dropFile}>
                {fileExists ? (
                  <Box
                    sx={fileExistsBox}
                    onMouseOver={() => setWannaRemove(true)}
                    onMouseLeave={() => setWannaRemove(false)}
                  >
                    <Text as="b">{uploadedFile?.name}</Text>

                    {wannaRemove ? (
                      <AiOutlineDelete
                        color={wannaRemove ? 'red' : 'gray'}
                        size={24}
                        onClick={() => setFileExists(false)}
                      />
                    ) : (
                      <Text as="b">
                        {uploadedFile?.size ? uploadedFile?.size / 1000 : 0} KB
                      </Text>
                    )}
                  </Box>
                ) : (
                  <chakra.label sx={activeDrop}>
                    <Image src="/assets/upload-cloud.svg" />
                    <chakra.input
                      type="file"
                      accept="application/pdf"
                      display="none"
                      onChange={(e) => {
                        if (e.target.files == null) return
                        setUploadedFile(e.target.files[0])
                        setFileExists(true)
                      }}
                    />
                  </chakra.label>
                )}
              </Center>
            )}
            <Box sx={expirationSection}>
              <Checkbox
                defaultChecked
                isChecked={isExpirable}
                onChange={(e) => setIsExpirable(e.target.checked)}
              >
                {!isExpirable ? 'เอกสารมีวันหมดอายุ' : 'กำหนดวันหมดอายุ'}
              </Checkbox>
              {isExpirable && (
                <Input
                  type="date"
                  width="30%"
                  onChange={(e) => {
                    console.log(e.target.value)
                    setExpiredDate(new Date(e.target.value))
                  }}
                />
              )}
            </Box>
            {type === 'userFreeUploadFile' ? (
              <>
                <Input
                  placeholder="ตั้งชื่อไฟล์"
                  onChange={(e) => {
                    setOfficialName(e.target.value)
                  }}
                />
              </>
            ) : null}
            {selectedFile === 'outsideFile' ? (
              <>
                <Input placeholder="ตั้งชื่อไฟล์" />
                <Box sx={expirationSection}>
                  <Checkbox
                    defaultChecked
                    onChange={(e) => setIsExpirable(e.target.checked)}
                  >
                    {!isExpirable ? 'เอกสารมีวันหมดอายุ' : 'กำหนดวันหมดอายุ'}
                  </Checkbox>
                  {isExpirable && (
                    <Input
                      type="date"
                      width="30%"
                      onChange={(e) => {
                        if (e.target.files) console.log(e.target.value)
                        setExpiredDate(new Date(e.target.value))
                      }}
                    />
                  )}
                </Box>
              </>
            ) : (
              selectedFile !== '' && (
                <Input
                  variant="filled"
                  value={`${selectedFile} จะหมดอายุในอีก ${file?.dayLifeSpan} หากท่านอัพโหลดวันนี้`}
                  isReadOnly
                />
              )
            )}
            <Textarea
              placeholder="บันทึกที่จัดเก็บของเอกสารดังกล่าว หรือเตือนความจำบางอย่างกับเอกสารชุดนี้"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            {/* {fileExists && fileType != 'generate' && (
              <Button colorScheme="blue">ตรวจสอบไฟล์ที่อัปโหลด</Button>
            )} */}
            <Spacer />
            <Button onClick={onClose}>ยกเลิก</Button>
            <Button
              colorScheme="green"
              ml="12px"
              disabled={fileType == 'generate' ? false : !fileExists}
              onClick={async () => {
                if (type == 'userFreeUploadFile') {
                  FileController.newUserFreeUploadedFile(
                    officialName,
                    await uploadFile(
                      `userUploads/${uuidv4()}.pdf`,
                      uploadedFile
                    ),
                    isExpirable ? expiredDate : null,
                    note
                  )
                } else if (fileType != 'generate') {
                  console.log(expiredDate)
                  FileController.newUploadedFile(
                    file?.id,
                    await uploadFile(
                      `userUploads/${uuidv4()}.pdf`,
                      uploadedFile
                    ),
                    note,
                    isExpirable ? expiredDate : null
                  )
                }
              }}
            >
              {fileType == 'generate' ? 'สร้างเอกสาร' : 'อัพโหลด'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

let dropFile = {
  width: '100%',
  height: 'fit-content',
  border: '1px',
  borderColor: 'accent.gray',
  borderRadius: '4px',
  cursor: 'pointer',
}

let modalBody = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: '24px',
}

let expirationSection = {
  display: 'flex',
  alignItems: 'center',
  columnGap: '16px',
  width: '100%',
  height: '40px',
}

let fileExistsBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: 'fit-content',
  padding: '8px',
  margin: '8px',
  border: '1px',
  borderColor: 'accent.gray',
  backgroundColor: '#F1F3F5',
  _hover: {
    // backgroundColor light red
    backgroundColor: '#FDE8E8',
    borderColor: 'accent.red',
  },
}

let activeDrop = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  padding: '72px 0',
  width: '100%',
  _hover: {
    backgroundColor: '#FDE8E8',
  },
}

export default UploadFile