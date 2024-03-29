import { ValidationComposite } from '@/main/composites'
import { makeLoginValidation } from '@/main/factories/validation'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
