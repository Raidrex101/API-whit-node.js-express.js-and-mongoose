import Movie from '../models/movieModel.js'
import Directors from '../models/directorsModel.js'
import Cast from '../models/castModel.js'

// CREATE

const createMovie = async (req, res) => {
  const movieData = req.body

  // Validations
  if (Object.keys(movieData).length === 0) {
    return res.status(400).json({ message: 'No movie data provided' })
  }

  // validando que director y cast sean un array
  if (!Array.isArray(movieData.director) || !Array.isArray(movieData.cast)) {
    return res.status(400).json({ message: 'director and actors must be an array' })
  }

  // Validando que director y cast tengan al menos un elemento
  if (movieData.director.length === 0 || movieData.cast.length === 0) {
    return res.status(400).json({ message: 'director and actors must have at least one element' })
  }

  // si el actor del reparto o el director no estan en la tabla correspondiente los crea

  try {
    const directorModel = await Promise.all(movieData.director.map(async (director) => {
      // si existe lo regresa si no lo crea
      const existingDirector = await Directors.findOne({ firstName: director.firstName, lastName: director.lastName, birthDate: director.birthDate })

      if (existingDirector) {
        return existingDirector
      }

      // si el director no existe lo crea
      return await Directors.create(director)
    }))

    // una vez que ya tenemos el director se le signa la pelicula con la ayuda del director id
    movieData.director = directorModel.map(director => director._id)

    const castModel = await Promise.all(movieData.cast.map(async (actor) => {
      // si existe lo regresa si no lo crea
      const existingActors = await Cast.findOne({ firstName: actor.firstName, lastName: actor.lastName, birthDate: actor.birthDate })

      if (existingActors) {
        return existingActors
      }

      return await Cast.create(actor)
    }))

    movieData.cast = castModel.map(actor => actor._id)

    // creamos la movie con el id del director

    const newMovie = await Movie.create(movieData)
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie
      .find({ isActive: true })
      .populate('Directors', 'firstName lastName bio')
      .populate('cast', 'firstName lastName')
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ message: 'Error getting movies:', error: error.message })
  }
}

export {
  createMovie,
  getAllMovies
}
