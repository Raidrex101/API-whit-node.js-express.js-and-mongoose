import express from 'express'
import { createMovie } from '../controller/movieController.js'

const movieRoutes = express.Router()

movieRoutes.post('/', createMovie)

export default movieRoutes
