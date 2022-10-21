import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoute from './AppRoute'
import './index.sass'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '900px',
  lg: '1024px',
  xl: '1280px',
}

const colors = {
  colors: {
    accent: {
      blue: '#0072F5',
      darkBlue: '#2B6CB0',
      black: '#2D3748',
      white: '#FFFFFF',
      red: '#F31260',
      green: '#17C964',
      gray: '#A3A3A3',
      lightGray: '#889096',
    },
    hover: {
      blue: '#0072F5',
      darkBlue: '#2B6CB0',
      black: '#2D3748',
      white: '#FFFFFF',
      red: '#F31260',
      green: '#17C964',
      gray: '#A3A3A3',
    },
    background: {
      gray: '#F1F3F5',
      red: '#FDD8E5',
      green: '#DAFBE8',
      white: '#FFFFFF',
    },
    group: {},
  },
}

const theme = extendTheme(colors, breakpoints)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppRoute />
    </ChakraProvider>
  </React.StrictMode>
)
