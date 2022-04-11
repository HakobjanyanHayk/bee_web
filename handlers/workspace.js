const { User, Workspace } = require('../models')
const Joi = require('joi')

const createWorkspace = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)

        if(!user) return res.status(404).json({message: 'Not found'})

        const workspaceData = Joi.object({
            name: Joi.string().required(),
        })

        const validatedData = await workspaceData.validateAsync(req.body).catch(message => {
            return res.status(500).json({message})
        });

        // ?? Special methods/mixins added to instances

        const workspace = await user.createWorkspace(validatedData)

        return res.json({message: 'Workspace have been successfully created', workspace})

    } catch (message) {
        return res.json({message})
    }
}

const getWorkspace = async (req, res) => {
    try {
        const {workspaceId} = req.params
        const workspace = await Workspace.findByPk(parseInt(workspaceId), {include: 'author'})

        if(!workspace) return res.status(404).json({message: 'Workspace not found'})
        if(workspace.author.id !== req.user.id) return res.status(401).json({message: 'Unauthorized'})

        return res.json({workspace})
    } catch (message) {
        return res.json({message})
    }
}

const updateWorkspace = async (req, res) => {
    try {
        const {workspaceId} = req.params
        const workspaceData = Joi.object({
            name: Joi.string().required(),
        })

        const validatedData = await workspaceData.validateAsync(req.body).catch(message => {
            return res.status(500).json({message})
        });

        const workspace = await Workspace.update(
            validatedData,
            {
                where: { id: workspaceId, userId: req.user.id },
            }
        );

        if(!workspace[0]){
            return res.status(404).json({message: 'Not Found'})
        }

        return res.json({message: 'Workspace have been successfully updated'})
    } catch (message) {
        return res.status(500).json({message})
    }
}

const deleteWorkspace = async (req, res) => {
    try {
        const {workspaceId} = req.params
        await Workspace.destroy({ where: { id: workspaceId } });

        return res.status(500).json({message: 'Workspace have been successfully deleted'})
    } catch (message) {
        return res.status(500).json({message})
    }
}

module.exports = {
    createWorkspace,
    getWorkspace,
    updateWorkspace,
    deleteWorkspace
}
