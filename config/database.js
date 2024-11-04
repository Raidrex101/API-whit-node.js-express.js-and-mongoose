import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECT_URL)
    const { connection } = await mongoose

    connection.once('open', () => {
      console.log('Database connected successfully')
    })

    connection.on('error', (error) => {
      console.log('Database error on connection', error)
    })
  } catch (error) {
    console.log(' Database connection error in catch statement', error)
  }
}

export { connect }
