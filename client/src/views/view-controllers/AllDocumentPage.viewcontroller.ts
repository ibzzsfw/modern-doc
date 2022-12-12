import { useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"

class AllAllDocumentPageViewController {

  param = useParams<{ category: string }>()
  viewState = useState<'box' | 'table'>('box')
  searchState = useState('')
  disclosure = useDisclosure()
  sortMenuState = useState({ sort: '', order: '' })
  documentState = useState([])

  constructor() {}
}

export default AllAllDocumentPageViewController;