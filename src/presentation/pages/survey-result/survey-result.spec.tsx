import { mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('SurveyResult Component', () => {
  it('should present correct initial state', () => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <BrowserRouter window={window}>
          <SurveyResult />
        </BrowserRouter>
      </ApiContext.Provider>
    )
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
})
