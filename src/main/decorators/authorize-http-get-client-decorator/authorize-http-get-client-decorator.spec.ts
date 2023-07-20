import { HttpGetParams } from '@/data/protocols/http'
import { mockGetRequest, GetStorageSpy, HttpGetClientSpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  httpGetClientSpy: HttpGetClientSpy
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpGetClientDecorator(httpGetClientSpy, getStorageSpy)
  return {
    sut,
    httpGetClientSpy,
    getStorageSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call getStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  it('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })
})
