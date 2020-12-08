import { PrismaClient } from '@prisma/client'
import { Ingredient, IngredientListResult, IngredientResult } from './../types'
import util from 'util'

const prisma = new PrismaClient()

export const getIngredientById = async (ingredientId: number) => {
  const ingredient: IngredientResult = await prisma.ingredient
    .findFirst({
      where: {
        id: ingredientId,
      },
    })
    .catch((error) => console.error(error))

  console.log(
    console.log(
      'Fetching ingredient',
      util.inspect(ingredient, false, null, true),
    ),
  )
  return ingredient
}

export const getIngredientByName = async (ingredientName: string) => {
  const ingredient: IngredientResult = await prisma.ingredient
    .findFirst({
      where: {
        name: ingredientName,
      },
    })
    .catch((error) => console.error(error))

  console.log(
    'Fetching ingredient',
    util.inspect(ingredient, false, null, true),
  )
  return ingredient
}

export const getAllIngredients = async () => {
  const ingredients: IngredientListResult = await prisma.ingredient
    .findMany()
    .catch((error) => console.error(error))

  console.log(
    'Fetching ingredients',
    util.inspect(ingredients, false, null, true),
  )
  return ingredients
}

export const postIngredient = async (body: Ingredient) => {
  const { name } = body
  const ingredient: IngredientResult = await prisma.ingredient
    .create({
      data: { name: name },
    })
    .catch((error) => console.error(error))

  console.log(
    'Creating ingredient',
    util.inspect(ingredient, false, null, true),
  )
  return ingredient
}

export const deleteIngredient = async (ingredientId: number) => {
  const ingredient: IngredientResult = await prisma.ingredient
    .delete({
      where: { id: ingredientId },
    })
    .catch((error) => console.error(error))

  console.log(
    'Deleting ingredient',
    util.inspect(ingredient, false, null, true),
  )
  return ingredient
}
