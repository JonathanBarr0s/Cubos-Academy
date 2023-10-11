const express = require('express')
const { detalharEmpresa } = require('./controladores/empresas')

const rotas = express()

rotas.get('/empresas', detalharEmpresa)

module.exports = rotas
