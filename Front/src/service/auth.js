const isTestMode = true;

export const login = async (username, password) => {
  if (isTestMode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'test' && password === 'password') {
          resolve({ username });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  } else {
    const url = 'http://localhost:3000/auth/connexion';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifiant: username, mdp: password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error('Login failed');
    }
  }
};
