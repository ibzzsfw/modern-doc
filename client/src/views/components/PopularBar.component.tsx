import { VStack, Text, Button, Icon, Flex } from '@chakra-ui/react'
import { TiThLargeOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import SearchModel from '../../mvvm/models/Search.model'

type propsType = {
  title: string
  children: JSX.Element | JSX.Element[]
  url?: string
}

const PopularBar = ({ title, children, url }: propsType) => {
  const { setSearch } = SearchModel()
  const navigate = useNavigate()

  return (
    <>
      <VStack width="100%" gap="16px" padding="24px 0">
        <Flex justifyContent={'space-between'} width="100%" alignItems="center">
          <Text fontSize="20px" fontWeight="bold">
            {title}
          </Text>
          {url && (
            <Button
              leftIcon={<Icon as={TiThLargeOutline} />}
              sx={seeAllIcon}
              colorScheme="gray"
              onClick={()=>{
                setSearch('')
                navigate(`/search`)
              }}
            >
              ดูทั้งหมด
            </Button>
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

let seeAllIcon = {
  boxShadow: '0px 5px 5px 1px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
}