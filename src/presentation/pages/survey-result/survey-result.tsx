import { Footer, Header, Spinner } from '@/presentation/components'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import React from 'react'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
        <div className={Styles.contentWrap}>
          <h2>Qual é o seu framework web favorito?</h2>
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
          <div className={Styles.loadingWrap}>
            <div className={Styles.loading}>
              <span>Aguarde...</span>
              <Spinner isNegative />
            </div>
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
