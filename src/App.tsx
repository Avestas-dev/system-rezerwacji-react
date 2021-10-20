import React from 'react'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Navigation from './components/Navigation'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Navigation />
      </main>
    </QueryClientProvider>
  )
}

export default App
