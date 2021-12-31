import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined>
  deleteById(id: string): Promise<void>
}
