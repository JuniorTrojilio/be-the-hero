const express = require('express')
const routes = express.Router()
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionsController = require('./controllers/SessionController')

routes.post('/sessions', SessionsController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentsController.index)
routes.post('/incidents', IncidentsController.create)
routes.delete('/incidents/:id', IncidentsController.delete)


module.exports = routes

