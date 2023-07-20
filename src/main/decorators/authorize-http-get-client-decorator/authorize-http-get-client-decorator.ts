import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly httpGetClient: HttpGetClient,
    private readonly getStorage: GetStorage
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    await this.httpGetClient.get(params)
    return null
  }
}
