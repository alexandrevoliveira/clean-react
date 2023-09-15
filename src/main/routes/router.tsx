import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin, makeSignUp, makeSurveyList, MakeSurveyResult } from '@/main/factories/pages'
import { PrivateRoute, currentAccountState } from '@/presentation/components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'

const Router: React.FC = () => {
  const state = {
    getCurrentAccount: getCurrentAccountAdapter,
    setCurrentAccount: setCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={makeLogin({})} />
          <Route path="/signup" element={makeSignUp({})} />
          <Route path="/" element={<PrivateRoute>{makeSurveyList({})}</PrivateRoute>} />
          <Route path="/surveys/:id" element={<PrivateRoute><MakeSurveyResult /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
