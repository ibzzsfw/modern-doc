import { Badge } from '@chakra-ui/react'
import DocumentStatus from '@view-models/DocumentStatus'

type propTypes = {
  status: DocumentStatus
}

const DocumentBadge = ({ status }: propTypes) => {

  const getColor = () => {
    switch (status) {
      case 'หมดอายุ':
        return 'accent.red'
      case 'มีอยู่ในคลัง':
        return 'accent.green'
      case 'ใกล้หมดอายุ':
        return 'accent.yellow'
      default:
        return 'accent.gray'
    }
  }

  return (
    <Badge backgroundColor={getColor()} size="md" color="accent.white">
      {status}
    </Badge>
  )
}

export default DocumentBadge
