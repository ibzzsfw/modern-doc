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
} from '@chakra-ui/react'
import { useState } from 'react'
import FileViewer from '@components/FileViewer'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

type propsType = {
  files: any[],
  index: number
}

const FileViewerDrawer = ({ files, index }: propsType) => {


  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentFileIndex, setCurrentFileIndex] = useState(index | 0)
  console.table(files[currentFileIndex])

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
        {files[index].officialName}
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
              {files[currentFileIndex].officialName}
            <Spacer />
          </DrawerHeader>
          <DrawerBody>
            <FileViewer fileUrl={files[currentFileIndex].URI} />
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

export default FileViewerDrawer