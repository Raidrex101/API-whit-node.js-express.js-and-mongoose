import mongoose from 'mongoose'

const castSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false })

const Cast = mongoose.model('Cast', castSchema)

export default Cast
