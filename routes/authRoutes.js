import express from 'express'

import { register, login } from '../controller/authcontroller.js'

const authRoutes = express.Router()

// Rutas de autenticación
authRoutes.post('/register', register)
authRoutes.post('/login', login)

export default authRoutes
