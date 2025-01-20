import { useState } from 'react';
import { login } from '../service/auth';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginTab, setIsLoginTab] = useState(true); // Gérer les onglets

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      onLogin(username);
    } catch (error) {
      console.error('Login failed:', error);
    }
    console.log('username:', username, 'password:', password);
  };

  return (
    <section className="form-container">
      <div className="form-card">
        <h2>Bienvenue</h2>
        <p>Connectez-vous pour accéder au "OK ALAN!"</p>
        <div className="form-tabs">
          <button
            className={isLoginTab ? 'active' : ''}
            onClick={() => setIsLoginTab(true)}
          >
            Connexion
          </button>
          <button
            className={!isLoginTab ? 'active' : ''}
            onClick={() => setIsLoginTab(false)}
          >
            Inscription
          </button>
        </div>

        {isLoginTab && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="texte"
                placeholder="Jean Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-btn">
              Se connecter
            </button>
          </form>
        )}

        {!isLoginTab && (
          <div>
            <p>Formulaire d'inscription à venir...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginForm;
