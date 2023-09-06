import axios from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
  status: faker.datatype.number(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  data: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
