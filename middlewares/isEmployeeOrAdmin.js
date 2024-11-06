const isAdminoREmployee = (req, res, next) => {
  if (req.role !== 'ADMIN' || req.role !== 'EMPLOYEE') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}

export { isAdminoREmployee }
