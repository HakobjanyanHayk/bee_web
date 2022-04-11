const checkToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader === "undefined") {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const bearer = bearerHeader.split(" ")
    req.token = bearer[1]
    next()
    // Add jwt.verify here
}
module.exports = {checkToken}
