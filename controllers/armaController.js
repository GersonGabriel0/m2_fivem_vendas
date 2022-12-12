'use strict'

const armaRepository = require('../repositories/arma-repository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const config = require('../config')

const _repo = new armaRepository()

function armaController() {}

armaController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.usuario, 'Informe o id do usuário')
  _validator.isRequired(req.body.nome, 'Informe o nome')
  _validator.isRequired(req.body.quantidade, 'Informe quantidade')
  _validator.isRequired(req.body.valor, 'Informe o valor')

  ctrlBase.post(_repo, _validator, req, res)
}

armaController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.nome, 'Informe o nome')

  ctrlBase.put(_repo, _validator, req, res)
}

armaController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

armaController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

armaController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

armaController.prototype.authenticate = async (req, res) => {
    let _validator = new validators()
  
    _validator.isRequired(req.body.email, 'Informe o seu email')
    _validator.isEmail(req.body.email, 'O email informado não esta cadastrado')
    _validator.isRequired(req.body.password, 'Informe sua senha')
  
    if (!_validator.isValid()) {
      res.status(400).send({
        message: 'Não conseguiu passar pelo Login!',
        validation: _validator.errors()
      })
    }
  
    let user = await _repo.authenticate(req.body.email, req.body.password)
    if (user) {
      res.status(200).send({
          user: user,
          token: jwt.sign(
              {
              user: user
              },
              config.secretKey
          )
      })
    } else {
      res.status(404).send({
        message: 'Usuário e senha inválidos!'
      })
    }
}

module.exports = armaController
