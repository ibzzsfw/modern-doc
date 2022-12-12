import {
  Box,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type Menu = {
  title: string
  link?: string
  onClick?: () => void
  icon?: any
  style?: any
}

type propsType = {
  top?: string
  left?: string
  width?: string
  menusList: Menu[][]
  children: JSX.Element | JSX.Element[]
}

const MenuProvider = ({
  top = '0',
  left = '0',
  width = '200px',
  menusList,
  children,
}: propsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const menuLayout = {
    top: top,
    left: left,
    width: width,
  }

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start">
        <PopoverContent sx={menuLayout}>
          <PopoverBody padding="4px">
            <Flex flexDirection="column" gap="2px">
              {menusList.map((menus, index) => (
                <>
                  {menus.map((menu, index) => {
                    if (menu.link) {
                      return (
                        <Link to={menu.link}>
                          <Flex
                            as="button"
                            sx={{ ...menuButton, ...menu?.style }}
                            onClick={() => {
                              if (menu.onClick) menu.onClick()
                              onClose()
                            }}
                          >
                            {menu.icon && menu.icon}
                            <Text sx={menuText}>{menu.title}</Text>
                          </Flex>
                        </Link>
                      )
                    } else if (menu.onClick) {
                      return (
                        <Flex
                          as="button"
                          sx={{ ...menuButton, ...menu?.style }}
                          onClick={() => {
                            if (menu.onClick) menu.onClick()
                            onClose()
                          }}
                        >
                          {menu.icon && menu.icon}

                          <Text sx={menuText}>{menu.title}</Text>
                        </Flex>
                      )
                    }
                  })}
                  <Divider />
                </>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default MenuProvider

const menuText = {
  fontSize: '14px',
  fontWeight: 'semibold',
}

const menuButton = {
  width: '100%',
  textAlign: 'left',
  padding: '8px 16px',
  alignItems: 'center',
  height: '40px',
  gap: '12px',
  borderRadius: '4px',
  _hover: {
    background: 'background.gray',
  },
}