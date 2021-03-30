import { PrismaClient } from '@prisma/client'
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime'

export type PrismaError =
  | PrismaClientKnownRequestError
  | PrismaClientUnknownRequestError
  | PrismaClientRustPanicError
  | PrismaClientInitializationError
  | PrismaClientValidationError
