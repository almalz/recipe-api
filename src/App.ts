import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'
import dotenv from 'dotenv'

// Create Express server
const app = express()

dotenv.config()

// Express configuration
app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)

export default app
