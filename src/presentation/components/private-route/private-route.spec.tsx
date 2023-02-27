import { mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import PrivateRoute from './private-route'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'

const makeSut = (account = mockAccountModel()): void => {
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><SurveyList /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

describe('PrivateRoute', () => {
  it('should render current component if token is not empty', () => {
    makeSut()
    expect(window.location.pathname).toBe('/')
  })

  it('should redirect to /login if token is empty', () => {
    makeSut(null)
    expect(window.location.pathname).toBe('/login')
  })
})
