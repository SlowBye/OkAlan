const express = require('express');
const router = express.Router();
const db = require('../db/db');

// recupere les donnees meteo et la clé api de la bdd

router.post('/ville', async (req, res) => {

    const {ville} = req.body;

    const sql = `SELECT cle FROM api where id=1`;
    let rest;
    try {
        rest = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('Erreur lors de la recuperation des donnees meteo :', err.stack);
                    return reject('Erreur lors de la recuperation des donnees meteo');
                }
                resolve(result[0].cle);
            });
        });
    } catch (error) {
        return res.status(501).send(error);
    }

    const cle = rest;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${cle}&lang=fr&units=metric`;

    const response = await fetch(url);
    let jsonData = await response.json();
    let temp = jsonData.main.temp;
    let weather = jsonData.weather[0].description;
    let name = jsonData.name;

    res.send({name: name, temperature:temp, weather:weather});
    // res.send(jsonData);
});

router.post('/meteo', async (req, res) => {
    const {Latitude, Longitude} = req.body;

    const sql = `SELECT cle FROM api where id=1`;
    let rest;

    try {
        rest = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('Erreur lors de la recuperation des donnees meteo :', err.stack);
                    return reject('Erreur lors de la recuperation des donnees meteo');
                }
                resolve(result[0].cle);
            });
        });
    } catch (error) {
        return res.status(501).send(error);
    }

    const cle = rest;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${cle}&lang=fr&units=metric`;

    const response = await fetch(url);
    let jsonData = await response.json();
    let temp = jsonData.main.temp;
    let weather = jsonData.weather[0].description;
    let name = jsonData.name;

    res.send({name: name, temperature:temp, weather:weather});
    // res.send(jsonData);
});

module.exports = router;
