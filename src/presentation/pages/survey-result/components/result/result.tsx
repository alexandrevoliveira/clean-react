import Styles from './result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'
import React from 'react'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }) => {
  const navigate = useNavigate()
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        <>
          {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer}/>)}
        </>
      </FlipMove>
      <button className={Styles.button} data-testid="back-button" onClick={() => navigate(-1)}>Voltar</button>
    </>
  )
}

export default Result