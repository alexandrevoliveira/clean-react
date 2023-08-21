import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={makeLogin({})} />
          <Route path="/signup" element={makeSignUp({})} />
          <Route path="/" element={<PrivateRoute>{makeSurveyList({})}</PrivateRoute>} />
          <Route path="/surveys/:id" element={<PrivateRoute>{makeSurveyResult({})}</PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
