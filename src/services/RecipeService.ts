import prisma from '../../prisma/client'
import logger from '../config/logger'
import {
  RecipeResult,
  RecipeListResult,
  Ingredient,
  PrismaError,
} from '../types'

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

  const deletedRecipe = await prisma.recipe
    .delete({
      where: { id: recipeId },
    })
    .catch((error: PrismaError) => console.error(error))

  logger.debug('Deleting recipe :', deletedRecipe)

  return deletedRecipe
}

// TODO: replace 'any'
export const postRecipe = async (body: any) => {
  logger.debug('Recipe input :', body)
  const recipe: any = await prisma.recipe
    .create({
      data: {
        name: body.name,
        prepTime: body.prepTime,
        cookingTime: body.cookingTime,
        sourceUrl: body.sourceUrl,
        imageUrl: body.imageUrl,
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
    })
    .catch((error: PrismaError) => console.error(error))
  logger.debug('Creating recipe :', recipe)

  const ingredients = body.ingredients

  logger.debug('Ingredients input :', ingredients)

  await ingredients.forEach(async (ingredient: Ingredient) => {
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
      })
      .catch((error: PrismaError) => console.error(error))
    logger.debug('Connecting recipe to ingredients:', ingredientsOnRecipe)
  })

  return recipe
}

// const updateRecipeImage = async (recipeId) => {
//   return {}
// }

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
