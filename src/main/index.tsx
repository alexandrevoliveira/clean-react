import Router from '@/main/routes/router'
import '@/presentation/styles/global.scss'
import { createRoot } from 'react-dom/client'
import React from 'react'

const root = createRoot(document.getElementById('main'))

root.render(
  <Router />
)
