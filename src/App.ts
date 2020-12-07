import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)

export default app
