import {
  Flex,
  HStack,
  Text,
  VStack,
  Grid,
  GridItem,
  Center,
  SimpleGrid,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type propsType = {
  title: string
  children?: JSX.Element | JSX.Element[]
  url?: string
}

const DocumentBar = ({ title, children, url }: propsType) => {
  let layout = {
    padding: '24px 0',
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
              <Text>ดูเพิ่มเติม {'>>'}</Text>
            </Link>
          )}
        </Flex>
        <Flex sx={childrenFlex}>{children}</Flex>
      </Flex>
    </>
  )
}

export default DocumentBar
