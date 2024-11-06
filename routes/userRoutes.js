import express from 'express'
import { getUsers, getEmployees } from '../controller/userController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isEmployeeOrAdmin } from '../middlewares/isEmployeeOrAdmin.js'

const userRoutes = express.Router()

userRoutes.get('/users', isAuth, isEmployeeOrAdmin, getUsers)
userRoutes.get('/employees', isAuth, isAdmin, getEmployees)
export default userRoutes
