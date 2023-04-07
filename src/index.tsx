import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// define slimeChat defaults in case the user didn't define them
slimeChat.render ||= () => {}
slimeChat.ready ||= () => {}
slimeChat.twitchToken ||= ''

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
