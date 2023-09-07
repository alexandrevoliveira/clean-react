import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { LoadSurveyResultSpy, SaveSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'
import React from 'react'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const makeSut = ({ loadSurveyResultSpy = new LoadSurveyResultSpy(), saveSurveyResultSpy = new SaveSurveyResultSpy() }: SutParams = {}): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <BrowserRouter window={window}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} saveSurveyResult={saveSurveyResultSpy}/>
      </BrowserRouter>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    setCurrentAccountMock
  }
}

describe('SurveyResult Component', () => {
  it('should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  it('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  it('should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2023-01-10T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      screen.getByTestId('survey-result')
      expect(screen.getByTestId('day')).toHaveTextContent('10')
      expect(screen.getByTestId('month')).toHaveTextContent('jan')
      expect(screen.getByTestId('year')).toHaveTextContent('2023')
    })
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0]).toHaveClass('active')
    expect(answersWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })

  it('should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(screen.queryByTestId('question')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  it('should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(window.location.pathname).toBe('/login')
    })
  })

  it('should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => { fireEvent.click(screen.getByTestId('reload')) })
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  it('should go to SurveyList on back button click', async () => {
    const navigate = jest.fn()
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    makeSut()
    await waitFor(() => { fireEvent.click(screen.getByTestId('back-button')) })
    expect(navigate).toHaveBeenCalledWith(-1)
  })

  it('should not present Loading on active answer click', async () => {
    makeSut()
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[0])
    })
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
      expect(screen.queryByTestId('loading')).toBeInTheDocument()
      expect(saveSurveyResultSpy.params).toEqual({
        answer: loadSurveyResultSpy.surveyResult.answers[1].answer
      })
    })
  })

  it('should render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    makeSut({ saveSurveyResultSpy })
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
    })
    await waitFor(() => {
      expect(screen.queryByTestId('question')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  it('should logout on AccessDeniedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut({ saveSurveyResultSpy })
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
    })
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(window.location.pathname).toBe('/login')
    })
  })

  it('should present SurveyResult data on SaveSurveyResult success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2018-02-20T00:00:00')
    })
    saveSurveyResultSpy.surveyResult = surveyResult
    makeSut({ saveSurveyResultSpy })
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
    })
    await waitFor(() => {
      screen.getByTestId('survey-result')
      expect(screen.getByTestId('day')).toHaveTextContent('20')
      expect(screen.getByTestId('month')).toHaveTextContent('fev')
      expect(screen.getByTestId('year')).toHaveTextContent('2018')
    })
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0]).toHaveClass('active')
    expect(answersWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('should prevent multiple answer click', async () => {
    const { saveSurveyResultSpy } = makeSut()
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
      fireEvent.click(answersWrap[1])
    })
    expect(saveSurveyResultSpy.callsCount).toBe(1)
  })
})
