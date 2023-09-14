import { InputBase } from '@/presentation/components'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <InputBase name={fieldName} state={{}} setState={null} />
  )
}

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('should remove readOnly on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  it('should focus input on label click', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
