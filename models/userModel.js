import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9!@#$%^&*()_+]+$/,
    minlength: 8,
    maxlength: 12
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/i,
    minlength: 8,
    maxlength: 20
  }
}, { timestamps: true })

const User = mongoose.model('USer', userSchema)

export default User
