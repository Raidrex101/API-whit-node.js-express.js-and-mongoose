import User from '../models/userModel.js'

// CREATE
// no se realiza una funcion para crear ya que de eso se encarga uthController

// READ
const getUsers = async (req, res) => {
  try {
    const users = await User
      .find({ isActive: true, role: 'CUSTOMER' })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error getting users:', error: error.message })
  }
}

const getEmployees = async (req, res) => {
  try {
    const employee = await User
      .find({ isActive: true, role: 'EMPLOYEE' })
    res.status(200).json(employee)
  } catch (error) {

  }
}

export {
  getUsers,
  getEmployees
}
