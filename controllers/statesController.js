'use strict'

const stateRepository = require('../repositories/state-repository')
const ctrlBase = require('../bin/base/controller-base')

const _repo = new stateRepository()

function stateController() {}

stateController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res)
}

stateController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

module.exports = stateController
