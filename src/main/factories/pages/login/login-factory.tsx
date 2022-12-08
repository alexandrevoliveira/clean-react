import React from 'react'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token'
import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
