import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
