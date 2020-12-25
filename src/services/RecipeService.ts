import { PrismaClient } from '@prisma/client'
import logger from '../config/logger'
import { RecipeResult, Ingredient } from '../types'

const prisma = new PrismaClient()

export const getRecipeById = async (recipeId: number) => {
  const recipe = await prisma.recipe
    .findFirst({
      where: {
        id: recipeId,
      },
      include: {
        IngredientsOnRecipe: {
          include: {
            ingredient: true,
          },
        },
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
    .findMany({
      include: { IngredientsOnRecipe: true },
    })
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
  logger.debug('Recipe input :', body)
  const recipe: any = await prisma.recipe
    .create({
      data: {
        name: body.recipe.name,
        prepTime: body.recipe.prepTime,
        cookingTime: body.recipe.cookingTime,
        sourceUrl: body.recipe.sourceUrl,
        tags: {
          connectOrCreate: body.recipe.tags,
        },
      },
    })
    .catch((error) => console.error(error))
  logger.debug('Creating recipe :', recipe)

  const ingredients = body.ingredients

  logger.debug('Ingredient input :', body.ingredients)

  await ingredients.forEach(async (ingredient: Ingredient) => {
    let ingredientsOnRecipe = await prisma.ingredientsOnRecipe
      .create({
        data: {
          recipe: {
            connect: { id: recipe.id },
          },
          ingredient: {
            connectOrCreate: {
              where: {
                name: ingredient.name,
              },
              create: {
                name: ingredient.name,
              },
            },
          },
        },
      })
      .catch((error) => console.error(error))
    logger.debug('Connecting recipe to ingredients:', ingredientsOnRecipe)
  })

  return recipe
}
