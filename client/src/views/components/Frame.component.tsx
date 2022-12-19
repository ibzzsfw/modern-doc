import { Box } from '@chakra-ui/react'
import DocumentBar from '@components/DocumentBar.component'
import TableList from '@components/TableList.component'

type propsType = {
  title: string
  view: 'box' | 'table'
  children?: JSX.Element | JSX.Element[]
}


const Frame = ({ title, view, children }: propsType) => {
  return view === 'box' ? (
    <Box width="100%">
      <DocumentBar title={title}>{children}</DocumentBar>
    </Box>
  ) : (
    <TableList title={title}>{children}</TableList>
  )
}

export default Frame
