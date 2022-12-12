// Definindo os 'imports'
const repBase = require('../bin/base/repository-base')

class stateRepository {
  constructor() {
    this._repBase = new repBase('state', 'states')
  }

  async getAll() {
    return await this._repBase.getAll()
  }

  async getById(id) {
    var allStates = await this._repBase.getAll();
    var response = [];
    allStates.forEach(element => {
        if(element.regiao == id) {
            response.push(element);
        }
    });
    return await response;
  }

}

module.exports = stateRepository
