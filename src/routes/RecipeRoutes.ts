import { S3Control } from 'aws-sdk'
import * as express from 'express'
import { checkAuth, isAuthorized } from '../middlewares/auth'

const router = express.Router()

import { RecipeController } from '../controllers'

router.get('/:id', RecipeController.getRecipe)
router.get('/', RecipeController.getAllRecipes)

router.post('/', checkAuth, isAuthorized, RecipeController.postRecipe)
router.delete('/:id', RecipeController.deleteRecipe)

export default router
