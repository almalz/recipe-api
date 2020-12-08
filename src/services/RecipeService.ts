import { PrismaClient } from '@prisma/client'
import util from 'util'

const prisma = new PrismaClient()

export const getRecipeById = async (recipeId: number) => {
  const recipe = await prisma.recipe
    .findFirst({
      where: {
        id: recipeId,
      },
    })
    .catch((error) => console.error(error))

  console.log(
    console.log('Fetching Recipe', util.inspect(recipe, false, null, true)),
  )
  return recipe
}

export const getRecipeByName = async (RecipeName: string) => {
  const recipe = await prisma.recipe
    .findFirst({
      where: {
        name: RecipeName,
      },
    })
    .catch((error) => console.error(error))

  console.log('Fetching Recipe', util.inspect(recipe, false, null, true))
  return recipe
}

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe
    .findMany()
    .catch((error) => console.error(error))

  console.log('Fetching Recipes', util.inspect(recipes, false, null, true))
  return recipes
}

export const deleteRecipe = async (recipeId: number) => {
  console.log(recipeId)
  const recipe = await prisma.recipe
    .delete({
      where: { id: recipeId },
    })
    .catch((error) => console.error(error))

  console.log('Deleting Recipe', util.inspect(recipe, false, null, true))
  return recipe
}

export const postRecipe = async (body: any) => {
  const { name } = body
  const recipe = await prisma.recipe
    .create({
      data: { name: name },
    })
    .catch((error) => console.error(error))

  console.log('Creating Recipe', util.inspect(recipe, false, null, true))
  return recipe
}
