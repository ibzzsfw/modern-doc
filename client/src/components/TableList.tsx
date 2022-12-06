import { Box, Divider, Heading, VStack } from '@chakra-ui/react'

type propsTypes = {
  title?: string
  children?: JSX.Element | JSX.Element[]
}

const TableList = ({ title, children }: propsTypes) => {
  return (
    <>
      <Box sx={tableLayout}>
        <Heading size="md">{title}</Heading>
        <br />
        <Divider />
        <br />
        <VStack gap="10px">{children}</VStack>
      </Box>
    </>
  )
}

export default TableList

let tableLayout = {
  width: '100%',
  padding: '25px',
  borderRadius: '8px',
  backgroundColor: 'accent.white',
}
