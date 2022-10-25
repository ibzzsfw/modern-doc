import { Box, Flex, Text, VStack } from '@chakra-ui/react'

type propsType = {
  title: string
  image: string
}

const PopularBox = ({ title, image }: propsType) => {
  let layout = {
    width: '196px',
    boxShadow:
      '0px 10px 10px 2px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    flexDirection: 'column',
  }

  let imageBox = {
    width: '100%',
    height: '145px',
    backgroundImage: `url(${image})`, 
    backgroundSize: 'cover',
    borderRadius: '8px 8px 0px 0px',
  }

  let titleBox ={
    width: '100%',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '8px 0px'
  }

  return (
    <>
      <Flex sx={layout} gap='0px'>
        <Box sx={imageBox}></Box>
        <Box sx={titleBox}>
          <Text>{title}</Text>
        </Box>
      </Flex>
    </>
  )
}

export default PopularBox
