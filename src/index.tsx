import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// define slime2 defaults in case the user didn't define them
slime2Chat.onMessage ||= () => {}
slime2Chat.ready ||= () => {}
slime2Login.twitch ||= {}
slime2Setup.permissions ||= []

const root = ReactDOM.createRoot(
  document.getElementById('slime2-root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
