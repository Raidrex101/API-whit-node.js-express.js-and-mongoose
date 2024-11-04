import express from 'express'
import { connect } from './config/database.js'
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json())

// rutas

api.use('/api/v1/users', userRoutes)

connect().then(() => {
  api.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
})
