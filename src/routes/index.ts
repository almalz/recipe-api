import express from 'express'
import IngredientRouter from './IngredientRoutes'

const router = express.Router()

router.use('/ingredient', IngredientRouter)

export default router
