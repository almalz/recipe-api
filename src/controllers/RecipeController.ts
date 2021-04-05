import { Request, Response } from 'express'

import { RecipeService } from '../services'
import { Recipe, RecipeListResult, RecipeResult } from './../types'

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params
  const recipe: RecipeResult = await RecipeService.getRecipeById(Number(id))
  if (recipe) {
    res.json(recipe)
  } else {
    res.status(404).send('Recipe not found')
  }
}

export const getAllRecipes = async (req: Request, res: Response) => {
  const recipes: RecipeListResult = await RecipeService.getAllRecipes()
  if (recipes) {
    res.json(recipes).send()
  } else {
    res.status(404).send('Recipes not found')
  }
}

export const postRecipe = async (req: Request, res: Response) => {
  const { recipe } = req.body

  recipe.userId =
    req.userId !== null && req.userId !== undefined ? req.userId : undefined

  console.log('data', recipe)

  const result: RecipeResult = await RecipeService.postRecipe(recipe)
  if (result) {
    res.status(201).json(result)
  } else {
    res.status(422).send('Could not create Recipe')
  }
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params
  const result: RecipeResult = await RecipeService.deleteRecipe(Number(id))
  if (result) {
    res.json(result)
  } else {
    res.status(422).send(`Could not delete Recipe with id ${id}`)
  }
}

export const getAllRecipesByUser = async (req: Request, res: Response) => {
  if (req.userId) {
    const { userId } = req
    const result: RecipeListResult = await RecipeService.getAllRecipesByUserId(
      userId,
    )
  }
}
