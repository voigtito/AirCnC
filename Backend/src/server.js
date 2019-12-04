const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes'); // Importa as rotas 

password = require('./security/password')

const app = express();

// conecta com o Mongo, passando user e password e a tabela 'mongodb.net/semana09'
mongoose.connect(`mongodb+srv://henriquesml:${password}@omnistack-uylik.mongodb.net/semana09?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes); // usa as rotas feita em routes.js

app.listen(3333);

