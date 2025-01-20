// Login form component

import { useState } from 'react';
import { login } from '../service/auth';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <div className='login-form'>
      <h2>Veuillez vous connecter !</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
