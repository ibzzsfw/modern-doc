import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Icon,
  Divider,
} from '@chakra-ui/react'
import Navbar from '@components/Navbar'
import { IoChevronForward } from 'react-icons/io5'
import getBreadcrumbFromPath from '@utils/getBreadcrumbFromPath'

type propsType = {
  children: JSX.Element | JSX.Element[]
  breadcrumb?: boolean
  style?: any
}

const PageContainer = ({ children, breadcrumb, style }: propsType) => {
  return (
    <Box width="100%" backgroundColor="background.gray">
      <Navbar />
      <Box margin="120px auto" style={style} width="72%">
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
                (item) => (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item?.path}>{item?.title}</BreadcrumbLink>
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
