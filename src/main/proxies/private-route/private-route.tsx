import { currentAccountState } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'

import { useRecoilValue } from 'recoil'
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const logout = useLogout()

  useEffect(() => {
    if (!getCurrentAccount()?.accessToken) logout()
  }, [])

  return children
}

export default PrivateRoute
