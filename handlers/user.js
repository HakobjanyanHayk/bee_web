const { User } = require('../models')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const {checkDisplayName, isEmailUnique} = require('../utils')

const update = async (req, res) => {
    try {
        const userDataSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(3).max(15),
            displayName: Joi.string()
        })

        const validatedData = await userDataSchema.validateAsync(req.body).catch(message => {
            return res.status(500).json({message})
        });

        if(validatedData.hasOwnProperty('email')) {
            const isUnique = await isEmailUnique(validatedData.email)
            if(!isUnique) {
                return res.status(500).json({message: 'Duplicated email !'})
            }
        }

        if(req.user.displayName !== validatedData.displayName) {
            validatedData.displayName = await checkDisplayName(validatedData.displayName)
        } else {
            delete validatedData.displayName
        }

        if(validatedData.hasOwnProperty('password')) {
            validatedData.password = await bcrypt.hash(validatedData.password, 10)
        }

        const user = await User.update(validatedData,
            {
                where: {
                    id: req.user.id
                }
            })

        if(!user[0]){
            return res.status(404).json({message: 'Not Found'})
        }
        return res.json({message: 'User have been successfully updated'})
    } catch (message) {
        return res.status(500).json({message})
    }
}

module.exports = {
    update
}
