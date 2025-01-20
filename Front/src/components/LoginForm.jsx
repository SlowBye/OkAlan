// Login form component

import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username);
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
