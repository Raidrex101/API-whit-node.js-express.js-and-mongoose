import express from 'express'
import { createTicket } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/:customerId/:movieId', createTicket)

export default ticketRoutes
