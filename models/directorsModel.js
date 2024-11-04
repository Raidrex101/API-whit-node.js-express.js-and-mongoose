import mongoose from 'mongoose'

const directorsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: String,
  birthDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false })

const Directors = mongoose.model('Directors', directorsSchema)

export default Directors
