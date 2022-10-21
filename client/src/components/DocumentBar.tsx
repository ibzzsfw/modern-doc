import {
  Flex,
  HStack,
  Text,
  VStack,
  Grid,
  GridItem,
  Center,
  SimpleGrid
} from '@chakra-ui/react'

type propsType = {
  title: string
  children?: JSX.Element | JSX.Element[]
}

const DocumentBar = ({ title, children }: propsType) => {
  let layout = {
    padding: '30px 0',
    gap: '32px',
    flexDirection: 'column',
    maxWidth: '1280px',
    margin: 'auto',
  }

  let childrenFlex = {
    width: '100%',
    padding: '0 32px',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: 'auto',
    gap: '32px',
  }

  return (
    <>
      <Flex sx={layout}>
        <Text fontSize="18px" fontWeight="bold" margin={['auto',null,null,0]}>
          {title}
        </Text>
        <Flex sx={childrenFlex}>{children}</Flex>
      </Flex>
    </>
  )
}

export default DocumentBar
