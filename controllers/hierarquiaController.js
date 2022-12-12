'use strict'

const hierarquiaRepository = require('../repositories/hierarquia-repository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const config = require('../config')

const _repo = new hierarquiaRepository()

function hierarquiaController() {}

hierarquiaController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.id, 'Informe o seu id')
  _validator.isRequired(req.body.nome, 'Informe o seu nome')
  _validator.isEmail(req.body.cargo, 'O email informado é cargo')

  req.body.password = md5(req.body.password)

  ctrlBase.post(_repo, _validator, req, res)
}

hierarquiaController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.nome, 'Informe o seu nome')

  ctrlBase.put(_repo, _validator, req, res)
}

hierarquiaController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

hierarquiaController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

hierarquiaController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

hierarquiaController.prototype.authenticate = async (req, res) => {
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

  let hierarquia = await _repo.authenticate(req.body.email, req.body.password)
  if (hierarquia) {
    res.status(200).send({
        hierarquia: hierarquia,
        token: jwt.sign(
            {
            hierarquia: hierarquia
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

module.exports = hierarquiaController
