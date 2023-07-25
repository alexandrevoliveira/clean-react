import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
      <BrowserRouter window={window} >
        <Header />
      </BrowserRouter>
    </ApiContext.Provider>
  )
  return {
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  it('should call setCurrentAccount with null', async () => {
    const { setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(window.location.pathname).toBe('/login')
  })

  it('should render username correctly', async () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
