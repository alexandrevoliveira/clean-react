export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrigatório')
    this.message = 'RequiredFieldError'
  }
}
