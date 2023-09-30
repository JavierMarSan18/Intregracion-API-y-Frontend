import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Users } from './pages/Users';
import { Teachers } from './pages/Teachers'
import "./App.css"

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path='/Users' element={<Users />} />
          <Route index path='/Teachers' element={<Teachers />} />
          <Route path='*' element={<>
            <h2>No encontramos la página</h2>
          </>} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  ) 
}

export default App
