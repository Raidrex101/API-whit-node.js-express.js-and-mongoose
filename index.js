import express from 'express'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json())

// rutas

api.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
