import * as express from 'express'
const router = express.Router()

import { RecipeController } from '../controllers'

router.get('/:id', RecipeController.getRecipe)
router.get('/', RecipeController.getAllRecipes)
router.post('/', RecipeController.postRecipe)
router.delete('/:id', RecipeController.deleteRecipe)

export default router
