import { Flex, HStack, Text, VStack } from '@chakra-ui/react'

type propsType = {
  title: string
  children?: JSX.Element | JSX.Element[]
}

const DocumentBar = ({ title, children }: propsType) => {
  return (
    <>
      <Flex padding="30px 0" gap="32px" flexDirection="column">
        <Text fontSize="18px" fontWeight="bold">
          {title}
        </Text>
        <Flex paddingLeft="32px" gap='72px'>{children}</Flex>
      </Flex>
    </>
  )
}

export default DocumentBar
