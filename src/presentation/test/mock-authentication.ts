import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  account = mockAccountModel()

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}
