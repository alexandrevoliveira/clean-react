import { ValidationBuilder as Builder } from '@/main/builders'
import { ValidationComposite } from '@/main/composites'

export const makeSignUpValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('name').required().min(5).build(),
  ...Builder.field('email').required().email().build(),
  ...Builder.field('password').required().min(5).build(),
  ...Builder.field('passwordConfirmation').required().sameAs('password').build()
])
