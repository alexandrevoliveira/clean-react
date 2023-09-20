import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { makeSignUpValidation } from '@/main/factories/validation'
import { SignUp } from '@/presentation/pages'

import React from 'react'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
