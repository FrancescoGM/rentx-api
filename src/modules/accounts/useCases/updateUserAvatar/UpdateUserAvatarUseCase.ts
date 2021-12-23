import { inject, injectable } from 'tsyringe'

import { deleteFile } from '../../../../utils/file'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  userId: string
  avatar_filename: string
}

@injectable()
export class UpdateUserAvatarUserCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatar_filename }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatar_filename

    await this.usersRepository.create(user)
  }
}
