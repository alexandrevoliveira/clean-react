import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const makeSut = (): void => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    makeSut()
    expect(window.location.pathname).toBe('/login')
  })
})
