import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/components'
import { SurveyList } from '@/presentation/pages'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
        <BrowserRouter window={window} >
          <SurveyList loadSurveyList={loadSurveyListSpy}/>
        </BrowserRouter>
    </RecoilRoot>
  )
  return {
    loadSurveyListSpy,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  it('should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  it('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3))
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })

  it('should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(window.location.pathname).toBe('/login')
    })
  })

  it('should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })
})
