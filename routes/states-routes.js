// definindo o strict mode
'use strict'

// realizando as importações
const express = require('express')
const controller = require('../controllers/statesController')

// inicializando as rotas do express
const router = express.Router()

// instanciando o objeto da classe statesController
let _ctrl = new controller()

// definindo as rotas
router.get('/', _ctrl.get)
router.get('/:id', _ctrl.getById)

// exportando o módulo
module.exports = {
  routes: router
}
