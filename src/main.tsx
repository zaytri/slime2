import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './main.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PlatformReadyProvider } from './contexts/PlatformReadyContext'
import { ClientProvider } from './contexts/ClientContext'

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
