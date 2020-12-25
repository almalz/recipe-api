import express from 'express'
import IngredientRouter from './IngredientRoutes'
import RecipeRouter from './RecipeRoutes'

const router = express.Router()

router.use('/ingredient', IngredientRouter)
router.use('/recipe', RecipeRouter)

export default router
