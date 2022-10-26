import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  As,
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Children } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsPersonCircle } from 'react-icons/bs'
import { IoChevronDownOutline } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
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

  const navbarAvatar = {
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    borderRadius: '100%',
  }

  const menuLayout = {
    top: top,
    left: left,
    width: width,
  }

  const menuAvatar = {
    width: '64px',
    height: '64px',
    borderRadius: '100%',
  }

  const nameText = {
    fontSize: '14px',
    fontWeight: 'semibold',
  }

  const memberNameText = {
    fontSize: '14px',
    fontWeight: 'normal',
  }

  const relationText = {
    fontSize: '12px',
    fontWeight: 'normal',
  }

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

  const memberList = {
    width: '100%',
    textAlign: 'left',
    padding: '8px 24px',
    alignItems: 'center',
    height: '36px',
    gap: '12px',
    borderRadius: '4px',
    _hover: {
      background: 'background.gray',
    },
  }

  const memberAvatar = {
    width: '24px',
    height: '24px',
  }

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Popover isOpen={isOpen} onClose={onClose} placement="right-end">
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
                              menu.onClick
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
                            menu.onClick
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
