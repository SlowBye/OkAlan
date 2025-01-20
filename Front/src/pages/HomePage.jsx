import { useState } from 'react';
import HomeContent from '../components/HomeContent';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const HomePage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (username) => {
    setLogin(username);
    setPassword(password);
  };

  const handleLogout = () => {
    setLogin('');
    setPassword('');
  };

  return (
    <div className='homepage'>
      <Header login={login} onLogout={handleLogout} />
      {login ? (
        <HomeContent username={login} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default HomePage;
