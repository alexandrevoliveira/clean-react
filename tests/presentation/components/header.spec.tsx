import { AccountModel } from '@/domain/models'
import { Header } from '@/presentation/components'
import { mockAccountModel } from '@/tests/domain/mocks'
import { renderComponentHelper } from '@/tests/presentation/mocks'

import { fireEvent, screen } from '@testing-library/react'
import React from 'react'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const { setCurrentAccountMock } = renderComponentHelper({ children: <Header />, account })
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
