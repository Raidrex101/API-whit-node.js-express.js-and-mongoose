import express from 'express'
import { createMovie, getAllMovies, updateMovie, deleteMovie } from '../controller/movieController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isAuth } from '../middlewares/isAuth.js'

const movieRoutes = express.Router()

movieRoutes.post('/', isAuth, isAdmin, createMovie)
movieRoutes.get('/', getAllMovies)
movieRoutes.patch('/:movieId', isAuth, isAdmin, updateMovie)
movieRoutes.delete('/:movieId', isAuth, isAdmin, deleteMovie)
export default movieRoutes
