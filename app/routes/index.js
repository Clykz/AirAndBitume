// routes/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    // Lecture synchrone des données JSON
    const dataPath = path.join(__dirname, '../data.json');
    const rawData = fs.readFileSync(dataPath);
    const logements = JSON.parse(rawData);

    res.render('index', {
        title: 'Home',
        logements // on passe les données au template
    });
});

module.exports = router;
