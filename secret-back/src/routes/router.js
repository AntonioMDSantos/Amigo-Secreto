const express = require('express')
const controllerUser = require('../controllers/UserController')

const routes = express.Router()

routes.get('/list', controllerUser.List)

routes.post('/create', controllerUser.Create)

routes.put('/update/:id', controllerUser.Update)

routes.delete('/delete/:id', controllerUser.Delete)

module.exports = routes