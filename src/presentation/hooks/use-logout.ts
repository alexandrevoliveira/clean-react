import { currentAccountState } from '@/presentation/components'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const navigate = useNavigate()
  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login', { replace: true })
  }
}
