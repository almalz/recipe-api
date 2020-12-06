import * as IngredientService from '../services/Ingredient'
import { Request, Response } from 'express'
import util from 'util'

export const getIngredient = async (req: Request, res: Response) => {
  const { id } = req.body
  const ingredient = await IngredientService.getIngredientById(id)
  if (ingredient) {
    res.json(ingredient)
  } else {
    res.status(404).send('Ingredient not found')
  }
}

export const getAllIngredients = async (req: Request, res: Response) => {
  const ingredients = await IngredientService.getAllIngredients()
  console.log('Result', util.inspect(ingredients), false, null, true)
  if (ingredients) {
    res.json(ingredients).send()
  } else {
    res.status(404).send('Ingredients not found')
  }
}

export const postIngredient = async (req: Request, res: Response) => {
  const { name } = req.body

  const result = await IngredientService.postIngredient({ name })

  if (result) {
    res.json(result)
  } else {
    res.status(422).send('Could not create ingredient')
  }
}
