const express = require('express');
const router = express.Router();
// const db = require('../db/db');
const BlaguesAPI = require('blagues-api');
router.get('/blague', async (req, res) => {
    const blagues = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgxNDIzMDgxNDU5ODEwMzA0IiwibGltaXQiOjEwMCwia2V5IjoiM3VQWVhJdWo1QjFXTHNESG91UEU4TDllbzhoMHg2SzZVS3dZTWlldTNuZm84UHpVTloiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMS0yMVQwODoyMToyNyswMDowMCIsImlhdCI6MTczNzQ0NzY4N30.3jHqn6CBKkmjV10rnUj21_9Xbv8MkrvdSSO0ONpUnI4');

    const blague = await blagues.random();

    res.send({blague});
});

module.exports = router;
