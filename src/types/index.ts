import { Ingredient, Recipe } from '@prisma/client'

export type {
  Ingredient,
  Recipe,
  Unit,
  IngredientsOnRecipe,
  Tag,
  InstructionStep,
  Instruction,
  User,
} from '@prisma/client'

type Result = void | null

export type IngredientResult = Ingredient | Result

export type IngredientListResult = Ingredient[] | Result

export type RecipeResult = Recipe | Result

export type RecipeListResult = Recipe[] | Result
