const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Lecture des données JSON
const dataPath = path.join(__dirname, './data.json');
const rawData = fs.readFileSync(dataPath);
const logements = JSON.parse(rawData);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);

// Affichage d'un logement spécifique
app.get('/logement/:id', (req, res) => {
    const logementId = parseInt(req.params.id, 10);
    const logement = logements.find(item => item.id === logementId);

    if (logement) {
        res.render('logement', { logement });
    } else {
        res.status(404).send('Logement introuvable');
    }
});

app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});

module.exports = app;
