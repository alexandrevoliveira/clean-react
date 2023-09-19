import { ValidationBuilder as Builder } from '@/main/builders'
import { ValidationComposite } from '@/main/composites'

export const makeLoginValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('email').required().email().build(),
  ...Builder.field('password').required().min(5).build()
])
