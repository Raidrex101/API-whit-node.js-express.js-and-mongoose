import express from 'express'
import { createTicket, getMyTickets } from '../controller/ticketController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isCustomer } from '../middlewares/isCustomer.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/:customerId/:movieId', isAuth, isCustomer, createTicket)
ticketRoutes.get('/:customerId', isAuth, isCustomer, getMyTickets)

export default ticketRoutes
