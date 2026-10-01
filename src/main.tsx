import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { AppRouter } from './router/index.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
} 

`
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <AppRouter />
        </QueryClientProvider>
    </StrictMode>
)
