const {Workspace, Channel} = require('../models')
const Joi = require('joi')

const create = async (req, res) => {
    try {
        const {workspaceId} = req.params
        const workspace = await Workspace.findByPk(parseInt(workspaceId));

        if(!workspace) {
            return res.status(404).json({message: 'Not found'})
        }

        const channelsData = Joi.object({
            name: Joi.string().required(),
        })

        const validatedData = await channelsData.validateAsync(req.body).catch(message => {
            return res.status(500).json({message})
        });

        validatedData.createdBy = req.user.id

        const channel = await workspace.createChannel(validatedData)

        return res.json({message: 'Channel have been successfully created', channel})
    } catch (message) {
        res.status(500).json({message})
    }
}

const find = async (req, res) => {
    try {
        const {channelId} = req.params
        const channel = await Channel.findByPk(parseInt(channelId), {include: ['workspace', 'author']})

        if(!channel) {
            return res.status(404).json({message: 'Channel not found'})
        }
        if(channel.author.id !== req.user.id) {
            return res.status(403).json({message: 'Unauthorized'})
        }

        res.json({channel})
    } catch (message) {
        res.status(500).json({message})
    }
}

const update = async (req, res) => {
    try {
        const {channelId} = req.params

        const channelsData = Joi.object({
            name: Joi.string().required(),
        })

        const validatedData = await channelsData.validateAsync(req.body).catch(message => {
            return res.status(500).json({message})
        });

        const channel = await Channel.update(
            validatedData,
            {
                where: { id: channelId, createdBy: req.user.id },
            }
        );

        if(!channel[0]){
            return res.status(404).json({message: 'Not Found'})
        }

        return res.json({message: 'Channel have been successfully updated'})
    } catch (message) {
        res.status(500).json({message})
    }
}

const remove = async (req, res) => {
    try {
        const {channelId} = req.params
        await Channel.destroy({ where: { id: channelId } });

        return res.status(500).json({message: 'Channel have been successfully deleted'})
    } catch (message) {
        return res.status(500).json({message})
    }
}

module.exports = {
    create,
    find,
    update,
    remove
}
