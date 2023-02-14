import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  return <Navigate to='/login' />
}

export default PrivateRoute
