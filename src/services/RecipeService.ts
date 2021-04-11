import prisma from '../../prisma/client'
import logger from '../config/logger'
import {
  Recipe,
  RecipeResult,
  RecipeListResult,
  Ingredient,
  IngredientsOnRecipe,
  PrismaError,
} from '../types'
import { FileService } from './index'

export const getRecipeById = async (recipeId: number) => {
  const recipe: RecipeResult = await prisma.recipe
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
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Fetching recipe :', recipe)

  return recipe
}

export const getRecipeByName = async (recipeName: string) => {
  const recipe: RecipeResult = await prisma.recipe
    .findFirst({
      where: {
        name: recipeName,
      },
      include: {
        IngredientsOnRecipe: {
          include: {
            ingredient: true,
          },
        },
      },
    })
    .catch((error: PrismaError) => console.error(error))
  logger.debug('Fetching recipe :', recipe)

  return recipe
}

export const getAllRecipes = async () => {
  const recipes: RecipeListResult = await prisma.recipe
    .findMany({
      include: {
        IngredientsOnRecipe: {
          include: {
            ingredient: true,
          },
        },
      },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Fetching recipes :', recipes)

  return recipes
}

export const deleteRecipe = async (recipeId: number) => {
  // TODO : disconnect IngredientOnRecipe relationships

  const deletedRecipe: any = await prisma.recipe
    .delete({
      where: { id: recipeId },
      include: { file: true },
    })
    .catch((error: PrismaError) => console.error(error))

  await prisma.ingredientsOnRecipe
    .deleteMany({
      where: { recipeId: recipeId },
    })
    .catch((error: PrismaError) => console.error(error))

  const deletedFile = await FileService.deleteFile(deletedRecipe.fileId)

  Object.assign(deletedRecipe, { deletedFile })

  logger.debug('Deleting recipe :', deletedRecipe)
  console.log(deletedRecipe)

  return deletedRecipe
}

// TODO: replace 'any'
export const createRecipe = async (body: any) => {
  logger.debug('Recipe input :', body)

  const recipe: any = await prisma.recipe
    .create({
      data: {
        name: body.name,
        prepTime: body.prepTime,
        cookingTime: body.cookingTime,
        sourceUrl: body.sourceUrl,
        file: {
          connect: {
            locationURL: body.imageURL,
          },
        },
        // tags: {
        //   connectOrCreate: body.tags,
        // },
        user: {
          connectOrCreate: {
            where: {
              firebaseId: body.userId,
            },
            create: {
              firebaseId: body.userId,
            },
          },
        },
      },
      include: {
        user: true,
      },
    })
    .catch((error: PrismaError) => console.error(error))
  logger.debug('Creating recipe :', recipe)

  const ingredients = body.ingredients

  let ingredientArray: any[] = []

  const ingredientsOnRecipe = await Promise.all(
    ingredients.map(async (ingredient: Ingredient) => {
      return await connectIngredientToRecipe(recipe, ingredient)
    }),
  )

  if (ingredientsOnRecipe.length > 0) {
    recipe.ingredients = ingredientsOnRecipe.map((ior: any) => ior.ingredient)
  }

  return await recipe
}

export const connectIngredientToRecipe = async (
  recipe: Recipe,
  ingredient: Ingredient,
) => {
  const ingredientsOnRecipe = await prisma.ingredientsOnRecipe
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
      include: {
        ingredient: true,
      },
    })
    .catch((error: PrismaError) => console.error(error))
  return ingredientsOnRecipe
}

export const getAllRecipesByUserId = async (userId: string) => {
  if (userId) {
    const recipes: RecipeListResult = await prisma.recipe
      .findMany({
        where: {
          user: {
            firebaseId: userId,
          },
        },
        include: {
          IngredientsOnRecipe: {
            include: {
              ingredient: true,
            },
          },
        },
      })
      .catch((error: PrismaError) => console.error(error))

    logger.debug('Fetching user recipes :', recipes)
    return recipes
  }
}
