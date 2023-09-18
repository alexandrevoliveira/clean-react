import { HttpRequest } from '@/data/protocols/http'
import { mockHttpRequest, GetStorageSpy, HttpClientSpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  httpClientSpy: HttpClientSpy
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpClientDecorator(httpClientSpy, getStorageSpy)
  return {
    sut,
    httpClientSpy,
    getStorageSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  it('should call getStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()

    await sut.request(mockHttpRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field: faker.random.words()
      }
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  it('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.words()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field
      }
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())

    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
