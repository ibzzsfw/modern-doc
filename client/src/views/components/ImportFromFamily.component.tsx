import {
  Avatar,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import FileController from '@view-models/FileController'
import MemberController from '@view-models/MemberController'
import { useEffect, useState } from 'react'

type propsType = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  fileId: string | undefined
  fileName: string | undefined
}

const ImportFromFamily = ({
  isOpen,
  onClose,
  onOpen,
  fileId,
  fileName,
}: propsType) => {
  const [selected, setSelected] = useState(null)

  const { data, isLoading, error, refetch } = useQuery(
    ['getAvailableUploadedFile'],
    async () => {
      if (fileId) return MemberController.getAvailableUploadedFile(fileId)
    }
  )

  useEffect(() => {
    refetch()
  }, [fileId])

  if (isLoading) return <div>Loading...</div>

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>นำเข้า {fileName} จากสมาชิก</Text>
        </ModalHeader>
        <ModalBody>
          <VStack sx={layout}>
            {data &&
              data.map((member: any) => (
                <Flex
                  sx={{
                    ...memberBox,
                    ...(selected === member.URI ? selectedBox : {}),
                    ...(member.URI ? {} : disabledBox),
                  }}
                  onClick={() => {
                    setSelected(member.URI)
                  }}
                >
                  <HStack gap="24px">
                    <Avatar src={member.profileURI} />
                    <VStack alignItems="flex-start">
                      <Text color="#2D3748">
                        {member.firstName} {member.lastName}
                      </Text>
                      <Text color="#718096">
                        {member.getRelationshipText()}
                      </Text>
                    </VStack>
                  </HStack>
                </Flex>
              ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="outline" onClick={() => onClose()}>
              ยกเลิก
            </Button>
            <Button
              sx={submitButton}
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  FileController.newUploadedFile(
                    fileId,
                    selected,
                    `นำเข้าจาก ${data.find((member: any) => member.URI === selected)
                      .firstName
                    }`,
                    null
                  )
                }
              }}
            >
              ยืนยัน
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImportFromFamily

const layout = {
  width: '100%',
  height: '100%',
  maxHeight: '280px',
  overflowY: 'scroll',
}

const memberBox = {
  width: '90%',
  height: '80px',
  margin: 'auto',
  padding: '8px 24px',
  cursor: 'pointer',
  background: '#ffffff',
  border: '2px solid transparent',
  _hover: {
    background: '#0072F520',
  },
  flexDirection: 'column',
}

const disabledBox = {
  cursor: 'not-allowed',
  background: '#68707620',
  border: '2px solid transparent',
  _hover: {
    background: '#68707620',
  },
}

const selectedBox = {
  background: '#0072F520',
  border: '2px solid #0072F5',
}

let submitButton = {
  height: '40px',
  backgroundColor: 'accent.blue',
  color: 'white',
  margin: 'auto',
  _hover: {
    backgroundColor: 'hover.blue',
  },
  _active: {
    backgroundColor: 'hover.blue',
  },
}