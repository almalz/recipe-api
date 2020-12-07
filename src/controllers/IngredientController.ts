import { IngredientService } from '../services'
import { Request, Response } from 'express'
import { Ingredient } from '@prisma/client'

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
  if (ingredients) {
    res.json(ingredients).send()
  } else {
    res.status(404).send('Ingredients not found')
  }
}

export const postIngredient = async (req: Request, res: Response) => {
  const { ingredient } = req.body
  const result: any = await IngredientService.postIngredient(ingredient)

  if (result) {
    res.json(result)
  } else {
    res.status(422).send('Could not create ingredient')
  }
}

export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await IngredientService.deleteIngredient(Number(id))
  if (result) {
    res.json(result)
  } else {
    res.status(422).send(`Could not delete ingredient with id ${id}`)
  }
}
