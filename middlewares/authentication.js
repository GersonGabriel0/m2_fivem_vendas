const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (req, res, next) => {
  let token = req.body.token || req.query.query || req.headers['x-access-token']
  if (token) {
    try {
      let decoded = jwt.verify(token, config.secretKey)
      req.usuarioLogado = decoded
      next()
    } catch (error) {
      res.status(401).send({
        message: 'O token informado Não e valido!'
      })
    }
  } else {
    res.status(401).send({
      message: 'Você precisa informar um token para poder ter acesso!'
    })
  }
}
