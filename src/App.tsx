import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Navigation from './components/Navigation'
import UserContext, { initData } from './common/UserContext'

const queryClient = new QueryClient()
function App() {
  const [user, setUser] = useState(initData)

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <UserContext.Provider value={{ user, setUser }}>
          <Navigation />
        </UserContext.Provider>
      </main>
    </QueryClientProvider>
  )
}

export default App
