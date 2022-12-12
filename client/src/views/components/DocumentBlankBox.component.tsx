import { Flex, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

type propsTypes = {
  children?: JSX.Element
  size?: string
  color?: string
  icon?: IconType
  onClick?: () => void
}

const DocumentBlankBox = ({
  onClick,
  icon,
  size,
  color,
  children,
}: propsTypes) => {
  return (
    <Flex
      role="group"
      sx={DocumentBoxLayout}
      alignItems={'center'}
      justifyContent={'center'}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <Icon
        as={icon}
        boxSize={size}
        color={color}
        _groupHover={{ color: 'accent.gray' }}
      />
    </Flex>
  )
}

export default DocumentBlankBox

let DocumentBoxLayout = {
  width: '320px',
  height: '100%',
  boxShadow: '5px 5px 3px -2px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  backgroundColor: 'background.white',
  position: 'relative',
  padding: '20px',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  _hover: {
    cursor: 'pointer',
    boxShadow: '10px 10px 7px -5px rgba(0, 0, 0, 0.2)',
    transform: 'translate(-2px, -2px)',
    color: 'accent.gray',
  },
}
