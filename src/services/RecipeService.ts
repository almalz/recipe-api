import { PrismaClient } from '@prisma/client'
import logger from '../config/logger'
import { RecipeResult } from '../types'

const prisma = new PrismaClient()

export const getRecipeById = async (recipeId: number) => {
  const recipe = await prisma.recipe
    .findFirst({
      where: {
        id: recipeId,
      },
    })
    .catch((error) => console.error(error))

  logger.debug('Fetching recipe :', recipe)

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
  logger.debug('Fetching recipe :', recipe)

  return recipe
}

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe
    .findMany()
    .catch((error) => console.error(error))

  logger.debug('Fetching recipes :', recipes)

  return recipes
}

export const deleteRecipe = async (recipeId: number) => {
  console.log(recipeId)
  const recipe = await prisma.recipe
    .delete({
      where: { id: recipeId },
    })
    .catch((error) => console.error(error))

  logger.debug('Deleting recipe :', recipe)

  return recipe
}

// TODO: replace 'any'
export const postRecipe = async (body: any) => {
  const recipe: any = await prisma.recipe
    .create({
      data: {
        name: body.name,
        prepTime: body.prepTime,
        cookingTime: body.cookingTime,
        sourceUrl: body.sourceUrl,
        tags: {
          connectOrCreate: body.tags,
        },
      },
    })
    .catch((error) => console.error(error))
  logger.debug('Creating recipe :', recipe)

  const ingredientsOnRecipe = await prisma.ingredientsOnRecipe
    .update({
      where: { id: recipe.ingredientsOnRecipe.id },
      data: {
        recipe: {
          connect: { id: recipe.id },
        },
        ingredient: {
          connectOrCreate: body.ingredients,
        },
      },
    })
    .catch((error) => console.error(error))
  logger.debug('Connecting recipe to ingredients:', ingredientsOnRecipe)

  return recipe
}
