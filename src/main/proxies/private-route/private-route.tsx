import { currentAccountState } from '@/presentation/components'

import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()?.accessToken ? children : <Navigate to='/login' replace={true} />
}

export default PrivateRoute
