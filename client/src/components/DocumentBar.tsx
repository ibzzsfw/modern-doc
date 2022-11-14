import {
  Button,
  Flex,
  Text
} from '@chakra-ui/react'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type propsType = {
  title: string
  children?: JSX.Element | JSX.Element[]
  url?: string
}

const DocumentBar = ({ title, children, url }: propsType) => {
  let layout = {
    padding: '24px 0',
    gap: '24px',
    flexDirection: 'column',
    maxWidth: '1280px',
    margin: 'auto',
  }

  let childrenFlex = {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    gap: '32px',
  }

  return (
    <>
      <Flex sx={layout}>
        <Flex width="100%" justifyContent="space-between">
          <Text
            fontSize="18px"
            fontWeight="bold"
            margin={['auto', null, null, 0]}
          >
            {title}
          </Text>
          {url && (
            <Link to={url}>
              <Button rightIcon={<AiOutlineDoubleRight />} variant='ghost' colorScheme='gray'>
                ดูเพิ่มเติม
              </Button>
            </Link>
          )}
        </Flex>
        <Flex sx={childrenFlex}>{children}</Flex>
      </Flex>
    </>
  )
}

export default DocumentBar
