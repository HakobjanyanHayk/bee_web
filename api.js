const { Router } = require('express')
const auth = require('./routes/auth')
const user = require('./routes/user')
const workspace = require('./routes/workspace')
const channel = require('./routes/channel')
const api = Router()

api.use('/auth', auth)
api.use('/user', user)
api.use('/workspace', workspace)
api.use('/channel', channel)

module.exports = api
