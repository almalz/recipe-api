import { PrismaClient } from '@prisma/client'
import logger from '../config/logger'
import { User } from '../types'

const prisma = new PrismaClient()

export const createUser = async (body: any) => {
  const user: any = await prisma.user
    .create({
      data: {
        firebaseId: body.userId,
        email: body.email,
      },
    })
    .catch((error) => console.error(error))

  logger.debug('Creating ingredient :', user)

  return user
}
