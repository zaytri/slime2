import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ClientProvider } from './contexts/ClientContext'
import { PlatformReadyProvider } from './contexts/PlatformReadyContext'
import './main.css'

const root = ReactDOM.createRoot(
  document.getElementById('slime2-root') as HTMLElement,
)

const queryClient = new QueryClient()

globalThis.slime2 = {
  onEvent: emptyFunction,
  onModMessageDelete: emptyFunction,
}

root.render(
  <React.StrictMode>
    <ClientProvider>
      <QueryClientProvider client={queryClient}>
        <PlatformReadyProvider>
          <App />
        </PlatformReadyProvider>
      </QueryClientProvider>
    </ClientProvider>
  </React.StrictMode>,
)

function emptyFunction() {}
