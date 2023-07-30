import * as Helper from './http-mocks'

export const mockUnexpectedError = (): void => Helper.mockServerError(/surveys/, 'GET')
