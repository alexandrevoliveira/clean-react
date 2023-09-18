import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Header, currentAccountState } from '@/presentation/components'

import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <BrowserRouter window={window} >
        <Header />
      </BrowserRouter>
    </RecoilRoot>
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
