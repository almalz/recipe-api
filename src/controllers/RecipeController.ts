import { RecipeService } from '../services'
import { Recipe, RecipeListResult, RecipeResult } from './../types'
import { Request, Response } from 'express'

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params
  const Recipe: RecipeResult = await RecipeService.getRecipeById(Number(id))
  if (Recipe) {
    res.json(Recipe)
  } else {
    res.status(404).send('Recipe not found')
  }
}

export const getAllRecipes = async (req: Request, res: Response) => {
  const Recipes: RecipeListResult = await RecipeService.getAllRecipes()
  if (Recipes) {
    res.json(Recipes).send()
  } else {
    res.status(404).send('Recipes not found')
  }
}

export const postRecipe = async (req: Request, res: Response) => {
  const { Recipe } = req.body
  const result: RecipeResult = await RecipeService.postRecipe(Recipe)
  if (result) {
    res.json(result)
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
