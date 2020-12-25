import { RecipeService } from '../services'
import { Recipe, RecipeListResult, RecipeResult } from './../types'
import { Request, Response } from 'express'

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
  const { body } = req
  const result: RecipeResult = await RecipeService.postRecipe(body)
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
