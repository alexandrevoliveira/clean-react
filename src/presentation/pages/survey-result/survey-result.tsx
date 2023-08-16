import Styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyResult?: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult &&
            <>
              <hgroup>
                <Calendar date={new Date()} className={Styles.calendarWrap} />
                <h2>Qual é o seu framework web favorito? Qual é o seu framework web favorito?</h2>
              </hgroup>
              <FlipMove className={Styles.answersList}>
                <li>
                  <img src="http://localhost:5050/static/img/logo-react.png" />
                  <span className={Styles.answer}>ReactJS</span>
                  <span className={Styles.percent}>50%</span>
                </li>
                <li className={Styles.active}>
                  <img src="http://localhost:5050/static/img/logo-react.png" />
                  <span className={Styles.answer}>ReactJS</span>
                  <span className={Styles.percent}>50%</span>
                </li>
                <li>
                  <img src="http://localhost:5050/static/img/logo-react.png" />
                  <span className={Styles.answer}>ReactJS</span>
                  <span className={Styles.percent}>50%</span>
                </li>
              </FlipMove>
              <button>Voltar</button>
            </>
          }
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={() => {}} />}
        </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
