import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { SignedUserContextProvider } from './contexts/SignedUserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client = {queryClient}>
    <NotificationContextProvider>
      <SignedUserContextProvider>
        <App />
      </SignedUserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
