import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey}/>)
}

describe('SurveyItem Component', () => {
  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2023-01-11T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('11')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
