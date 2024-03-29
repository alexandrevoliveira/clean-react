import { ValidationComposite } from '@/main/composites'
import { makeSignUpValidation } from '@/main/factories/validation'
import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 5),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password')
    ]))
  })
})
