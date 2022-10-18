import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoute from './AppRoute'
import './index.sass'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppRoute />
    </ChakraProvider>
  </React.StrictMode>
)
