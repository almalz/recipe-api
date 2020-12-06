import * as express from 'express'
const router = express.Router()

import * as IngredientController from '../controllers/ingredients'

router.get('/:id', IngredientController.getIngredient)
router.get('/', IngredientController.getAllIngredients)
router.post('/', IngredientController.postIngredient)

export default router
