'use strict'

const express = require('express')
const cors = require('cors')
const config = require('./config')
const hierarquiasRoutes = require('./routes/hierarquia-routes')
const statesRoutes = require('./routes/states-routes')
const armasRoutes = require('./routes/arma-routes')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/hierarquias', hierarquiasRoutes.routes)
app.use('/api/armas', armasRoutes.routes)
app.use('/api/states', statesRoutes.routes)

app.listen(config.port, () =>
  console.log('API está rodando em http://localhost:' + config.port)
)
