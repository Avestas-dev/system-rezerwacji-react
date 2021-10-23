import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Navigation from './components/Navigation'
import UserContext, { initData } from './common/UserContext'
import { ConfigProvider } from 'react-avatar'
import ContextUpdate from './components/ContextUpdate'
import { BrowserRouter } from 'react-router-dom'
const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState(initData)
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider colors={['red', 'green', 'gray']}>
          <main>
            <UserContext.Provider value={{ user, setUser }}>
              <ContextUpdate />
              <Navigation />
            </UserContext.Provider>
          </main>
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
