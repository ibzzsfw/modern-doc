import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Spacer,
  Highlight,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import FileViewer from '@components/FileViewer'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import FolderUploadedFile from '@models/FolderUploadedFile'

type propsType = {
  files: FolderUploadedFile[]
}

const FileViewerDrawer = ({ files }: propsType) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMyFile, setIsMyFile] = useState(false)

  const [currentFileIndex, setCurrentFileIndex] = useState(0)

  const prevIndex = () => {
    if (currentFileIndex > 0) {
      return currentFileIndex - 1
    } else {
      return files.length - 1
    }
  }

  const nextIndex = () => {
    if (currentFileIndex < files.length - 1) {
      return currentFileIndex + 1
    } else {
      return 0
    }
  }

  const navigateButton = (side: string, icon: any, handlingFunction: () => number) => {

    const index = handlingFunction()
    const iconProps = { [side]: icon }

    return (
      <Button
        colorScheme='gray'
        variant='outline'
        onClick={() => setCurrentFileIndex(index)}
        {...iconProps}
      >
        {files[index].name}
      </Button>
    )
  }

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        File list preview
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        size='xl'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Highlight query={['ของคุณ', 'ที่คุณยังไม่เคยสร้าง']} styles={highlight}>
              {files[currentFileIndex].name + (isMyFile ? 'ของคุณ' : 'ที่คุณยังไม่เคยสร้าง')}
            </Highlight>
            <Spacer />
            <Button
              colorScheme={isMyFile ? 'green' : 'red'}
              onClick={() => setIsMyFile(!isMyFile)}
            >
              {isMyFile ? 'isMyFile' : 'notMyFile'}
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <Text as='b'>{files[currentFileIndex].name} URI of {isMyFile ? 'user file' : 'example'}</Text>
            <FileViewer fileUrl='/assets/kmutt_general_form.pdf' />
          </DrawerBody>
          <DrawerFooter>
            {navigateButton('leftIcon', <AiOutlineLeft />, prevIndex)}
            <Spacer />
            {navigateButton('rightIcon', <AiOutlineRight />, nextIndex)}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

let highlight = {
  padding: '2 1',
  rounded: 'full',
  backgroundColor: 'teal.100'
}

export default FileViewerDrawer