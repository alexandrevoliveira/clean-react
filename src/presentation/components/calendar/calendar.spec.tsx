import { Calendar } from '@/presentation/components'

import { render, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (date: Date): void => {
  render(<Calendar date={date}/>)
}

describe('Calendar Component', () => {
  it('should render with correct values', () => {
    makeSut(new Date('2023-01-10T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  it('should render icon and day with correct values', () => {
    makeSut(new Date('2019-05-03T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
