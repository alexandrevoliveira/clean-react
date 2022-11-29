import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from '@/main/factories/pages/login/login-factory'

ReactDOM.render(
  <Router
    MakeLogin={makeLogin}
  />,
  document.getElementById('main')
)
