const { User } = require('../models')

const list = async (req,res) => {

    // const users = await User.findAll({})
    //
    // return res.json({users})
}

const createOne = async (req, res) => {

    // const user = await User.create(req.body)
    //
    // return res.json({user})
}

const findUser = async (req, res) =>    {

    // const user = await User.findByPk(parseInt(req.params.id))
    //
    // if(!user) {
    //     return res.status(404).send({message: 'Not Found'});
    // }
    //
    // return res.json({user})
}

const updateUser = async (req, res) => {
    // const user = await User.update(req.body,
    //     {
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //
    // if(!user[0]){
    //     return res.status(404).json({message: 'Not Found'})
    // }
    // return res.json({message: 'User have been successfully updated1'})

}

const deleteUser = async (req, res) => {

    // const id = parseInt(req.params.id)
    //
    // const user = await User.destroy({
    //     where: {
    //         id: id
    //     }
    // });
    //
    // if(!user) {
    //     res.status(404).json({message: 'Not Found'})
    // }
    //
    // return res.status(201).json({message: 'User deleted successfully'})
}

module.exports = {
    list,
    findUser,
    createOne,
    updateUser,
    deleteUser
}
