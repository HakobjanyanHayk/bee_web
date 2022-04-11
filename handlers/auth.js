const { User } = require('../models')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const {checkDisplayName} = require('../utils')
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const loginSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(15).required(),
    })

    try {
        const validatedData = await loginSchema.validateAsync(req.body).catch(message => {
            return res.status(500).json({message})
        });

        const password = await bcrypt.hash(validatedData.password, 10)
        const displayName = await checkDisplayName(validatedData.name)

        const data = {
            ...validatedData,
            displayName,
            password,
        }

        console.log('data', data)

        const user = await User.create(data)

        return res.json({user})
    } catch (message) {
        return res.status(500).json({message})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({where: {email: email}})

    if(!user?.dataValues) return res.json({message: 'Incorrect email'})
    if(await bcrypt.compare(password, user.dataValues.password)) {
        const token = jwt.sign({user}, "my_token", {expiresIn: '1d'})
        return res.json({data: user, token})
    }

    return res.json({message: 'Incorrect password'})
}

module.exports = {
    register,
    login
}
