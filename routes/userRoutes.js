import express from 'express'
import { createUser } from '../controller/userController.js'

const userRoutes = express.Router()

userRoutes.post('/', createUser)

export default userRoutes
