import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<factory.makeLogin />} />
        <Route path="/signup" element={<factory.makeSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
