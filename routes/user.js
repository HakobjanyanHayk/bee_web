const {Router} = require('express')
const handlers = require('../handlers/user')
const route = Router()
const path = require('path')
const {isAuthenticated} = require('../middlewares/authMiddleware')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname)
        req.user.filename = fileName
        cb(null, fileName)
    }
})

const upload = multer({storage})

route.put('/', isAuthenticated, handlers.update)
route.post('/upload', isAuthenticated, upload.single('avatar'), handlers.upload)

module.exports = route
