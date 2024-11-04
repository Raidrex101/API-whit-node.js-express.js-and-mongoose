import User from '../models/userModel.js'

// CREATE
const createUser = async (req, res) => {
  const userData = req.body

  // Validations
  if (Object.keys(userData).length === 0) {
    return res.status(400).json({ message: 'No  user data provided' })
  }

  try {
    const newUser = await User.create(userData)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export {
  createUser
}
