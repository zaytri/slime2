import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import EventList from './components/event/EventList'
import Settings from './components/settings/WindowList'
import { ClientProvider } from './contexts/client/ClientProvider'
import { EventListProvider } from './contexts/event-list/EventListProvider'
import PlatformReadyProvider from './contexts/platform-ready/PlatformReadyProvider'
import './main.css'

const root = ReactDOM.createRoot(
  document.getElementById('slime2-root') as HTMLElement,
)

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <ClientProvider>
      <QueryClientProvider client={queryClient}>
        <PlatformReadyProvider>
          <EventListProvider>
            <EventList />
            <App />
            <Settings />
          </EventListProvider>
        </PlatformReadyProvider>
      </QueryClientProvider>
    </ClientProvider>
  </React.StrictMode>,
)
