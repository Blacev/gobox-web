import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GoboxLanding from './GoboxLanding'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoboxLanding />
  </StrictMode>,
)
