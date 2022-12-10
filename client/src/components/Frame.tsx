import { Box } from '@chakra-ui/react'
import DocumentBar from '@components/DocumentBar'
import TableList from '@components/TableList'

type propsType = {
  title: string
  view: 'box' | 'table'
  children: React.ReactNode | React.ReactNode[]
}

//frame component use for change DocumentBar and TableList.

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
