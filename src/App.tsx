import React, { useContext, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import Navigation from './components/Navigation'
import UserContext, { initData } from './common/UserContext'
import axios from 'axios'
import ContextUpdate from './components/ContextUpdate'
import { ConfigProvider } from 'react-avatar'
const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState(initData)
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider colors={['red', 'green', 'blue']}>
        <main>
          <UserContext.Provider value={{ user, setUser }}>
            <Navigation />
          </UserContext.Provider>
        </main>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
