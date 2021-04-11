import * as express from 'express'
import { checkAuth, isAuthorized } from '../middlewares/auth'
import { RecipeController } from '../controllers'

const router = express.Router()

router.get('/recipes', RecipeController.getAllRecipesByUser)

export default router
