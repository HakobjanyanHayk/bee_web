const {Router} = require('express')
const handlers = require('../handlers/auth')
const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const route = Router()
const {checkToken} = require('../middlewares/authMiddleware')

route.post('/register', handlers.register)
route.post('/login', handlers.login)

module.exports = route
