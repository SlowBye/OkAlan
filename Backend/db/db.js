const mysql = require('mysql2');

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

module.exports = db;