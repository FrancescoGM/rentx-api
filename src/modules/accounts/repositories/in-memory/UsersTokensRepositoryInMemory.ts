import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private tokens: UserTokens[] = []

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
      created_at: new Date(),
    })

    this.tokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.tokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    )

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.tokens.findIndex((token) => token.id === id)

    this.tokens.splice(userTokenIndex, 1)
  }
}
