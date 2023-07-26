import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login', { replace: true })
    } else {
      callback(error)
    }
  }
}
