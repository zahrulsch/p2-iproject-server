async function errorHandler(err, req, res, next) {
  // console.log(err)
  switch(err.name) {
    default:
      res.status(500).json({message: 'Internal server error'})
      break
  }
}

module.exports = errorHandler