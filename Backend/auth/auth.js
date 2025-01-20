// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Inscription d'un utilisateur
router.post('/inscription', (req, res) => {
  const { identifiant, mdp } = req.body;
  console.log(req.body);

  const sql = `INSERT INTO utilisateur (identifiant, mdp) VALUES (?, ?)`;
  db.query(sql, [identifiant, mdp], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'inscription :', err.stack);
      return res.status(501).send('Erreur lors de l\'inscription');
    }
    res.send('Inscription réussie');
  });
});

// Connexion d'un utilisateur
router.post('/connexion', (req, res) => {
  const { identifiant, mdp } = req.body;

  const sql = `SELECT * FROM utilisateur WHERE identifiant = ? AND mdp = ?`;
  db.query(sql, [identifiant, mdp], (err, result) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err.stack);
      return res.status(501).send('Erreur lors de la connexion');
    }
    if (result.length === 0) {
      return res.status(401).send('Utilisateur ou mot de passe incorrect');
    }

    const nomUtilisateur = result[0].identifiant;

    res.send({ identifiant: nomUtilisateur });
  });
});

module.exports = router;