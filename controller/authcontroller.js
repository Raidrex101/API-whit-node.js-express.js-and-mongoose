import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Process Failed: Incomplete Data' })
  }

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    req.body.password = hashedPassword

    const newUser = await User.create(req.body)
    newUser.password = undefined
    newUser.email = undefined

    res.status(201).json({ message: 'User registered successfully', newUser })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user:', error: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email or Password Are Required' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid Email or Password' })
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // Fecha de creación del token en segundos
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // Fecha de expiración del token en 7 días
    }

    const token = jwt.encode(payload, process.env.SECRET_KEY)

    return res.status(200).json({ message: 'User Logged In', token })
  } catch (error) {
    res.status(500).json({ message: 'Error Logging In:', error: error.message })
  }
}

export {
  register,
  login
}
