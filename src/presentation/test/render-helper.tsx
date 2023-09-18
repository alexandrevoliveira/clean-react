import { AccountModel } from '@/domain/models'
import { currentAccountState } from '@/presentation/components'

import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'
import { mockAccountModel } from '@/domain/test'

type SutParams = {
  children: React.ReactNode
  account?: AccountModel
}

type SutResult = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderComponentHelper = ({ children, account = mockAccountModel() }: SutParams): SutResult => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <BrowserRouter window={window}>
        {children}
      </BrowserRouter>
    </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
