import { ApiContext } from '@/presentation/contexts'
import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'

type Props = {
  children: React.ReactElement
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken ? children : <Navigate to='/login' />
}

export default PrivateRoute
