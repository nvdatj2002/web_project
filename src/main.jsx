import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GolbalStyle from './components/GolbalStyles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GolbalStyle>
      <App />
    </GolbalStyle>
  </React.StrictMode>,
)
