import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Icon,
  Divider,
} from '@chakra-ui/react'
import Navbar from 'src/views/components/Navbar.component'
import { IoChevronForward } from 'react-icons/io5'
import getBreadcrumbFromPath from '@utils/getBreadcrumbFromPath'
import { useLoginDataStore } from '@models/LoginDataStore.model'

type propsType = {
  children: JSX.Element | JSX.Element[]
  breadcrumb?: boolean
  style?: any
  isProtected?: boolean
}

const PageContainer = ({
  children,
  breadcrumb,
  style,
  isProtected,
}: propsType) => {
  const { user } = useLoginDataStore()

  if (isProtected && !user?.token) {
    window.location.href = '/'
  }

  return (
    <Box width="100%" backgroundColor="background.gray">
      <Navbar />
      <Box margin="120px auto" style={style} width="96%" maxWidth="1280px">
        {breadcrumb && (
          <>
            <Breadcrumb
              spacing="8px"
              separator={
                <Icon as={IoChevronForward} transform="translateY(2px)" />
              }
              padding="24px 12px"
            >
              {getBreadcrumbFromPath(window.location.pathname).map(
                (item: any) => (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item?.path}>
                      {item?.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )
              )}
            </Breadcrumb>

            <Box width="100%" height="1px" backgroundColor="accent.black" />
          </>
        )}
        <Box padding="48px 24px">{children}</Box>
      </Box>
    </Box>
  )
}

export default PageContainer
