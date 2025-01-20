const isTestMode = false; // Change this to false to use the backend

export const login = async (username, password) => {
  if (isTestMode) {
    // Simulate a backend response for testing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'test' && password === 'password') {
          resolve({ username });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000); // Simulate network delay
    });
  } else {
    // Actual backend request
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
  //   const url = 'http://localhost:3000/auth/connexion';

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ identifiant: username, mdp: password }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   } else {
  //     throw new Error('Login failed');
  //   }
};
