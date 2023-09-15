import { mockAccountModel } from '@/domain/test'
import { makeSurveyList } from '@/main/factories/pages'
import { PrivateRoute, currentAccountState } from '@/presentation/components'
import { render } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'

const makeSut = (account = mockAccountModel()): void => {
  const mockedState = { setCurrentAccount: jest.fn(), getCurrentAccount: () => account }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <BrowserRouter window={window}>
        <Routes>
          <Route path='/' element={<PrivateRoute>{makeSurveyList({})}</PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
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
