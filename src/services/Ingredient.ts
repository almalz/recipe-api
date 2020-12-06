import { PrismaClient } from '@prisma/client'
import util from 'util'
const prisma = new PrismaClient()

export const getIngredientById = async (ingredientId: number) => {
  const ingredient = await prisma.ingredient.findFirst({
    where: {
      id: ingredientId,
    },
  })
  console.log(
    console.log(
      `Fetching ingredient`,
      util.inspect(ingredient, false, null, true),
    ),
  )
  return ingredient
}

export const getIngredientByName = async (ingredientName: string) => {
  const ingredient = await prisma.ingredient.findFirst({
    where: {
      name: ingredientName,
    },
  })
  console.log(
    `Fetching ingredient`,
    util.inspect(ingredient, false, null, true),
  )
  return ingredient
}

export const getAllIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany()
  console.log(
    `Fetching ingredients`,
    util.inspect(ingredients, false, null, true),
  )
  return ingredients
}

export const postIngredient = async (body: any) => {
  const { name } = body
  const ingredient = await prisma.ingredient.create({
    data: { name: name },
  })
  console.log(
    `Creating ingredient`,
    util.inspect(ingredient, false, null, true),
  )
  return ingredient
}

export const deleteIngredient = async (ingredientId: number) => {
  console.log(ingredientId)
  const ingredient = await prisma.ingredient.delete({
    where: { id: ingredientId },
  })
  return ingredient
}
