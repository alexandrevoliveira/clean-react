import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyList } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'
import React from 'react'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return []
  }
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy}/>)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  it('should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  it('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
