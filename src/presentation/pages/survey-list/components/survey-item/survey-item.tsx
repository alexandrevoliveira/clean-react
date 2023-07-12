import Styles from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2023</span>
        </time>
        <p>Qual é o seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
