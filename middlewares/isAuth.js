import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' })
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid Authorization header' })
  }

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  try {
    const payload = jwt.decode(token, process.env.SECRET_KEY)

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp <= now) {
      return res.status(401).json({ message: 'Token expired' })
    }

    req.role = payload.role // pasa el rol de la payload al request
    req.userId = payload._id // pasa el id del usuario de la payload al request
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export { isAuth }
