import { HttpClient } from '@/data/protocols/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), makeLocalStorageAdapter())
}
