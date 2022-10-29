import { Badge } from '@chakra-ui/react'

type propTypes = {
  status:
    | 'หมดอายุ'
    | 'มีอยู่ในคลัง'
    | 'แฟ้มใหม่'
    | 'ยังไม่เคยสร้างแฟ้มนี้'
    | string
}

const BadgeStatus = ({ status }: propTypes) => {
  const getColor = () => {
    switch (status) {
      case 'หมดอายุ':
        return 'accent.red'
      case 'มีอยู่ในคลัง':
        return 'accent.green'
      case 'แฟ้มใหม่':
        return 'accent.green'
      case 'ยังไม่เคยสร้างแฟ้มนี้':
        return 'accent.gray'
      default:
        return 'accent.yellow'
    }
  }

  return (
    <Badge backgroundColor={getColor()} size="sm" color="accent.white">
      {status}
    </Badge>
  )
}

export default BadgeStatus
