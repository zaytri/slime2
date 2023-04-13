import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// define slime2 defaults in case the user didn't define them
slime2.onMessage ||= () => {}
slime2.ready ||= () => {}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
