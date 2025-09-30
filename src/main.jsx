import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Principal } from './Principal.jsx'
import { Provider } from './components/ui/provider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Principal />
    </Provider>
  </StrictMode>,
)
