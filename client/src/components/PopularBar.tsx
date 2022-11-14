import { HStack, VStack, Text, Button, Icon, Flex } from '@chakra-ui/react'
import { TiThLargeOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'

type propsType = {
  title: string
  children: JSX.Element | JSX.Element[]
  url?: string
}

const PopularBar = ({ title, children, url }: propsType) => {
  let seeAllIcon = {
    boxShadow:
      '0px 10px 10px 2px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
    backgroundColor: 'background.white',
  }

  return (
    <>
      <VStack width="100%" gap="16px" padding='24px 0'>
        <Flex justifyContent={'space-between'} width="100%" alignItems="center">
          <Text fontSize="20px" fontWeight="bold">
            {title}
          </Text>
          {url && (
            <Link to={'/search'}>
              <Button leftIcon={<Icon as={TiThLargeOutline} />} sx={seeAllIcon}>
                ดูทั้งหมด
              </Button>
            </Link>
          )}
        </Flex>
        <Flex justifyContent={'space-between'} width="100%">
          {children}
        </Flex>
      </VStack>
    </>
  )
}
export default PopularBar
