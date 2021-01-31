import express from 'express'
import IngredientRouter from './IngredientRoutes'
import RecipeRouter from './RecipeRoutes'
import UserRouter from './UserRoutes'
import { checkAuth } from '../middlewares/auth'

const router = express.Router()

router.use('/ingredient', IngredientRouter)
router.use('/recipe', RecipeRouter)

router.use('/me', checkAuth)
router.use('/me', UserRouter)

export default router
