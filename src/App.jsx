import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Index from './pages/Index'
import NewClient from './pages/NewClient'
import EditClient from './pages/EditClient'
import DetailsClient from './components/DetailsClient'

function App() {

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/clients" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="new" element={<NewClient />} />
          <Route path="edit/:id" element={<EditClient />} />
          <Route path=":id" element={<DetailsClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
