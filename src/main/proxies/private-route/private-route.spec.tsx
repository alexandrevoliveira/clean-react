import { mockAccountModel } from '@/domain/test'
import { makeSurveyList } from '@/main/factories/pages'
import { PrivateRoute } from '@/main/proxies'
import { renderComponentHelper } from '@/presentation/test'

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
