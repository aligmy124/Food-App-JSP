import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthContextProvider from './Context/Authcontext.jsx'
import WindowContext from './Window/WindowContext.jsx'
import MenuContextProvider from './Window/MenueContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowContext>
      <MenuContextProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </MenuContextProvider>
    </WindowContext>
  </React.StrictMode>,
)
