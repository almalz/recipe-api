import * as express from 'express'
const router = express.Router()

import { IngredientController } from '../controllers'

router.get('/:id', IngredientController.getIngredient)
router.get('/', IngredientController.getAllIngredients)
router.post('/', IngredientController.postIngredient)
router.delete('/:id', IngredientController.deleteIngredient)

export default router
