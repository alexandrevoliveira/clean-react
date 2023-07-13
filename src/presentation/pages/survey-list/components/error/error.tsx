import { SurveyContext } from '@/presentation/pages/survey-list/components'
import React, { useContext } from 'react'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
