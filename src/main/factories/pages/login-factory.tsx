import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/validation'
import { Login } from '@/presentation/pages'

import React from 'react'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
