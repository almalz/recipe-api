import prisma from '../../prisma/client'
import {
  Ingredient,
  IngredientListResult,
  IngredientResult,
  PrismaError,
} from './../types'
import logger from '../config/logger'

export const getIngredientById = async (ingredientId: number) => {
  const ingredient: IngredientResult = await prisma.ingredient
    .findFirst({
      where: {
        id: ingredientId,
      },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Fetching ingredient :', ingredient)

  return ingredient
}

export const getIngredientByName = async (ingredientName: string) => {
  const ingredient: IngredientResult = await prisma.ingredient
    .findFirst({
      where: {
        name: ingredientName,
      },
    })
    .catch((error: PrismaError) => console.error(error))
  logger.debug('Fetching ingredient :', ingredient)

  return ingredient
}

export const getAllIngredients = async () => {
  const ingredients: IngredientListResult = await prisma.ingredient
    .findMany()
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Fetching ingredient :', ingredients)

  return ingredients
}

export const postIngredient = async (body: Ingredient) => {
  const { name } = body
  const ingredient: IngredientResult = await prisma.ingredient
    .create({
      data: { name: name },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Creating ingredient :', ingredient)

  return ingredient
}

export const deleteIngredient = async (ingredientId: number) => {
  const ingredient: IngredientResult = await prisma.ingredient
    .delete({
      where: { id: ingredientId },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Deleting ingredient :', ingredient)

  return ingredient
}
