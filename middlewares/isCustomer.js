const isCustomer = (req, res, next) => {
  if (req.role !== 'CUSTOMER') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}

export { isCustomer }
