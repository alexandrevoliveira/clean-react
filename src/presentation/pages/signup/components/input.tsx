import { signUpState } from './index'
import { InputBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ name, placeholder, type }) => {
  const [state, setState] = useRecoilState(signUpState)
  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input
