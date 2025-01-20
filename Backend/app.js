const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '',
  database: 'testdb' 
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Inscription d'un utilisateur
app.post('/inscription', (req, res) => {
  // Récupération des données du formulaire
  const { identifiant, mdp } = req.body;
  console.log(req.body);

  // Requête SQL
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
app.post('/connexion', (req, res) => {
  // Récupération des données du formulaire
  const { identifiant, mdp } = req.body;

  // Requête SQL
  const sql = `SELECT * FROM utilisateur WHERE identifiant = ? AND mdp = ?`;
  db.query(sql, [identifiant, mdp], (err, result) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err.stack);
      return res.status(501).send('Erreur lors de la connexion');
    }
    if (result.length === 0) {
      return res.status(401).send('Utilisateur ou mot de passe incorrect');
    }
    res.send('Connexion réussie');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
