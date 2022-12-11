import {
  Avatar,
  background,
  Box,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

type propsType = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  isSelected?: boolean
  isDisabled?: boolean
}

const ImportFromFamily = ({
  isOpen,
  onClose,
  onOpen,
  isSelected = false,
  isDisabled = false,
}: propsType) => {
  const [selected, setSelected] = useState(false)

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
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    background: isSelected ? '#0072F520' : isDisabled ? '#68707620' : '#ffffff',
    border: isSelected ? '2px solid #0072F5' : '2px solid transparent',
    _hover: {
      background: isDisabled ? '#68707620' : '#0072F520',
    },
    flexDirection: 'column',
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>นำเข้าจากสมาชิก</Text>
        </ModalHeader>
        <ModalBody>
          <VStack sx={layout}>
            <Flex sx={memberBox}>
              <HStack gap="24px">
                <Avatar />
                <VStack>
                  <Text color="#2D3748">ชื่อ นามสกุล</Text>
                  <Text color="#718096">ความสัมพันธ์</Text>
                </VStack>
              </HStack>
            </Flex>
            <Flex sx={memberBox}>
              <HStack gap="24px">
                <Avatar />
                <VStack>
                  <Text color="#2D3748">ชื่อ นามสกุล</Text>
                  <Text color="#718096">ความสัมพันธ์</Text>
                </VStack>
              </HStack>
            </Flex>
            <Flex sx={memberBox}>
              <HStack gap="24px">
                <Avatar />
                <VStack>
                  <Text color="#2D3748">ชื่อ นามสกุล</Text>
                  <Text color="#718096">ความสัมพันธ์</Text>
                </VStack>
              </HStack>
            </Flex>
            <Flex sx={memberBox}>
              <HStack gap="24px">
                <Avatar />
                <VStack>
                  <Text color="#2D3748">ชื่อ นามสกุล</Text>
                  <Text color="#718096">ความสัมพันธ์</Text>
                </VStack>
              </HStack>
            </Flex>
            <Flex sx={memberBox}>
              <HStack gap="24px">
                <Avatar />
                <VStack>
                  <Text color="#2D3748">ชื่อ นามสกุล</Text>
                  <Text color="#718096">ความสัมพันธ์</Text>
                </VStack>
              </HStack>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="red">ยกเลิก</Button>
            <Button sx={submitButton}>ยืนยัน</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImportFromFamily
