const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardControler = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('thumb'), SpotController.store);

routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardControler.show);

routes.post('/spots/:spot_id/bookings', BookingController.store)

module.exports = routes;

/*
    req.query = Acessar query params (filtros)
    req.params = Acessar route param (Edição e delete)
    req.body = Acessar corpo da requisição (criação, edição  de registros)
*/


/*  Método GET = Utiizado para buscar uma informação no BACKEND.
    Método POST = Utiizado para criar uma nova informação no BACKEND.
    Método PUT = Utiizado para editar uma informação.
    Método DELETE = Utiizado para excluir.
*/