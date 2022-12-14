import './index.sass'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Worker } from '@react-pdf-viewer/core'
import AppRoute from './AppRoute'
import React from 'react'
import ReactDOM from 'react-dom/client'

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
      yellow: '#F5A524',
    },
    hover: {
      blue: '#0072F5',
      darkBlue: '#2B6CB0',
      black: '#2D3748',
      white: '#FFFFFF',
      red: '#F31260',
      green: '#17C964',
      darkgreen: '#13A452',
      gray: '#A3A3A3',
      yellow: '#F5A524',
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

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AppRoute />
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js" />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)