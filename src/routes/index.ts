import express from 'express'
import IngredientRouter from './Ingredient'

const router = express.Router()

router.use('/ingredient', IngredientRouter)

export default router
