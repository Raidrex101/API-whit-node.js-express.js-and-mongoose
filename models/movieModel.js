import mongoose from 'mongoose'

const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
]

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: genres,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  director: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Directors', required: true
  }],
  actors: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Actors', required: true
  }],
  durationMins: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  seatsLeft: {
    type: Number,
    max: 40,
    default: 40,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true, versionKey: false })

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
