import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactElement
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken ? children : <Navigate to='/login' />
}

export default PrivateRoute
