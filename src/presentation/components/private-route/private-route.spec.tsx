import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute />} />
        </Routes>
      </BrowserRouter>
    )
    expect(window.location.pathname).toBe('/login')
  })
})
