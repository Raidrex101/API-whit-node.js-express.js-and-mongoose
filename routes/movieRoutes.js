import express from 'express'
import { createMovie, getAllMovies } from '../controller/movieController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isAuth } from '../middlewares/isAuth.js'

const movieRoutes = express.Router()

movieRoutes.post('/', isAuth, isAdmin, createMovie)
movieRoutes.get('/', getAllMovies)

export default movieRoutes
