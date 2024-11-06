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

    movie.seatsLeft -= quantity
    await movie.save()

    res.status(201).json(newTicket)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export {
  createTicket
}
