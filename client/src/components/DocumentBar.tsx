import { Button, Flex, Text } from '@chakra-ui/react'
import { AiOutlineDoubleRight } from 'react-icons/ai'

type propsType = {
  title: string
  children?: JSX.Element | JSX.Element[]
  onAddonButtonClick?: () => void
}

const DocumentBar = ({
  title,
  children,
  onAddonButtonClick,
}: propsType) => {
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
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Text
            fontSize="18px"
            fontWeight="bold"
            margin={['auto', null, null, 0]}
          >
            {title}
          </Text>
          {onAddonButtonClick && (
            <Button
            rightIcon={<AiOutlineDoubleRight />}
            variant="ghost"
            colorScheme="gray"
            onClick={() => {
              onAddonButtonClick && onAddonButtonClick()
            }}
          >
            ดูเพิ่มเติม
          </Button>
          )}
          
        </Flex>
        <Flex sx={childrenFlex}>{children}</Flex>
      </Flex>
    </>
  )
}

export default DocumentBar
