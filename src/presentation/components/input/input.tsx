import Styles from './input-styles.scss'
import { FormContext } from '@/presentation/contexts'
import React, { useContext, useRef } from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]
  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={event => { event.target.readOnly = false }}
        onChange={event => { setState({ ...state, [event.target.name]: event.target.value }) }}
      />
      <label data-testid={`${props.name}-label`} title={error} onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
