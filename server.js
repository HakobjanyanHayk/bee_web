const express = require('express');
const port = process.env.PORT || 8080;
const app = express()
const api = require('./api')
const initializeServices = require("./services/initialize");
const {User} = require('./models')
const bcrypt = require('bcrypt')

const startApp = () => {
    app.use(express.json());

    app.use('/api', api);

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}


initializeServices(startApp);
