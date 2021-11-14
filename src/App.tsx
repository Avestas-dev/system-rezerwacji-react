import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Navigation from './components/Navigation'
import UserContext, { initData } from './common/UserContext'
import { ConfigProvider } from 'react-avatar'
import UserContextUpdate from './components/UserContextUpdate'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from 'twin.macro'
const queryClient = new QueryClient()


function App() {
  const [user, setUser] = useState(initData)
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider colors={['red', 'green']}>
          <main>
            
            <UserContext.Provider value={{ user, setUser }}>
              <UserContextUpdate />
              <GlobalStyles />
              <Navigation />
            </UserContext.Provider>
            
          </main>
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
