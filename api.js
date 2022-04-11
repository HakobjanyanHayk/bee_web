const { Router } = require('express')
const user = require('./routes/user')
const auth = require('./routes/auth')
const api = Router()

api.use('/user', user)
api.use('/auth', auth)

module.exports = api
