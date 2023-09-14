import { signUpState } from './index'
import { SubmitButtonBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import React from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(signUpState)
  return (
    <SubmitButtonBase
      text={text}
      state={state}
    />
  )
}

export default SubmitButton
