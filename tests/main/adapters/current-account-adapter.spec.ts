import { LocalStorageAdapter } from '@/infra/cache'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { mockAccountModel } from '@/tests/domain/mocks'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  it('should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)

    const result = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
