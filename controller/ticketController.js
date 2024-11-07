import Ticket from '../models/ticketModel.js'
import Movie from '../models/movieModel.js'

// CREATE
const createTicket = async (req, res) => {
  const { quantity, seats } = req.body
  const { customerId, movieId } = req.params

  try {
    // Buscar la película usando _id (enviado como movieId)
    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    // Verificar si hay suficientes asientos disponibles
    if (quantity > movie.seatsLeft) {
      return res.status(400).json({ message: 'Not enough seats available' })
    }

    // Calcular el precio total
    const seatPrice = movie.seatPrice
    const totalValue = seatPrice * quantity

    // Crear el ticket con los campos calculados
    const newTicket = await Ticket.create({
      customerId,
      movieId,
      quantity,
      seatPrice,
      totalValue,
      functionTime: movie.functionTime,
      seats
    })

    if (seats.length !== quantity) { // si la cantidad no es igual a la longitud de los sats solicitados dara error
      return res.status(400).json({ message: 'The quantity of seats do not match with the quantity of seats requested' })
    } else {
      movie.seatsAviable = movie.seatsAviable.filter(seat => !seats.includes(seat)) // se filtran los acientos que no esten en el seats de ticket si se selecciona A1 regresa todos menos A1
      movie.seatsLeft -= quantity // se resta la cantidad solicitada en el tiquet a los acientos disponibles en seatsLeft de movies
      await movie.save()
    }

    res.status(201).json(newTicket)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getMyTickets = async (req, res) => {
  const { customerId } = req.params

  if (customerId !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' })
  }
  try {
    const myTickets = await Ticket
      .find({ customerId })
      .populate('customerId', 'firstName lastName')
      .populate('movieId', 'name')
    return res.status(200).json(myTickets)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export {
  createTicket,
  getMyTickets
}
