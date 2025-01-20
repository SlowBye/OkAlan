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
  return (
    <div>
      <Header />
      {login ? (
        <HomeContent username={login} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default HomePage;
