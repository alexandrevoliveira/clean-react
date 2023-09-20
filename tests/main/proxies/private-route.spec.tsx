import { makeSurveyList } from '@/main/factories/pages'
import { PrivateRoute } from '@/main/proxies'
import { mockAccountModel } from '@/tests/domain/mocks'
import { renderComponentHelper } from '@/tests/presentation/mocks'

import { Route, Routes } from 'react-router-dom'
import React from 'react'

const makeSut = (account = mockAccountModel()): void => {
  renderComponentHelper({
    account,
    children: <Routes><Route path='/' element={<PrivateRoute>{makeSurveyList({})}</PrivateRoute>} /></Routes>
  })
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
