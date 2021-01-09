import { S3Control } from 'aws-sdk'
import * as express from 'express'
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

import { RecipeController } from '../controllers'

router.get('/:id', RecipeController.getRecipe)
router.get('/', RecipeController.getAllRecipes)
router.post('/', upload.single('image'), RecipeController.postRecipe)
router.delete('/:id', RecipeController.deleteRecipe)

export default router
