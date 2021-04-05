import * as express from 'express'
import multer from 'multer'

import { checkAuth, isAuthorized } from '../middlewares/auth'
import { UploadController } from '../controllers'

const upload = multer({ dest: 'temp/' })
const router = express.Router()

router.post(
  '/',
  checkAuth,
  isAuthorized,
  upload.single('recipeImage'),
  UploadController.uploadFile,
)

export default router
