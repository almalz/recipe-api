import prisma from '../../prisma/client'
import logger from '../config/logger'
import { File, FileResult, PrismaError } from '../types'

export const getFileByUrl = async (url: string) => {
  const file: FileResult = await prisma.file
    .findFirst({
      where: {
        locationURL: url,
      },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Fetching file :', file)

  return file
}

export const createFile = async (body: any) => {
  const file: FileResult = await prisma.file
    .create({
      data: { locationURL: body.locationURL, key: body.key },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Creating file :', file)

  return file
}
