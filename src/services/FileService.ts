import prisma from '../../prisma/client'
import logger from '../config/logger'
import { File, FileResult, PrismaError } from '../types'
import * as FileManager from '../config/file'

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
  const uploadResponse = await FileManager.uploadFile(body)
  if (uploadResponse) {
    console.log(uploadResponse)
    const file: FileResult = await prisma.file
      .create({
        data: { locationURL: uploadResponse.Location, key: uploadResponse.Key },
      })
      .catch((error: PrismaError) => console.error(error))
    logger.debug('Creating file :', file)

    return file
  }
  return
}

export const deleteFile = async (fileId: number) => {
  const file: FileResult = await prisma.file
    .delete({
      where: { id: fileId },
    })
    .catch((error: PrismaError) => console.error(error))

  if (file) {
    await FileManager.deleteFile(file.key).catch((error: PrismaError) =>
      console.error(error),
    )
  }

  logger.debug('Deleting file :', file)

  return file
}
