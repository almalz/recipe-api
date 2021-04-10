import { IngredientService } from '../services'
import { Ingredient, IngredientListResult, IngredientResult } from './../types'
import { Request, Response } from 'express'

export const getIngredient = async (req: Request, res: Response) => {
  const { id } = req.params
  const ingredient: IngredientResult = await IngredientService.getIngredientById(
    Number(id),
  )
  if (ingredient) {
    res.json(ingredient)
  } else {
    res.status(404).send('Ingredient not found')
  }
}

export const getAllIngredients = async (req: Request, res: Response) => {
  const ingredients: IngredientListResult = await IngredientService.getAllIngredients()
  if (ingredients) {
    res.json(ingredients).send()
  } else {
    res.status(404).send('Ingredients not found')
  }
}

export const postIngredient = async (req: Request, res: Response) => {
  const { ingredient } = req.body
  const result: IngredientResult = await IngredientService.postIngredient(
    ingredient,
  )

  if (result) {
    res.status(201).json(result)
  } else {
    res.status(422).send('Could not create ingredient')
  }
}

export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params
  const result: IngredientResult = await IngredientService.deleteIngredient(
    Number(id),
  )
  if (result) {
    res.json(result)
  } else {
    res.status(422).send(`Could not delete ingredient with id ${id}`)
  }
}
