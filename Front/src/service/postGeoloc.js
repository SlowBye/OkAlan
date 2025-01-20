// envoi la position de l'utilisateur au serveur

// dans postGeoloc.js ou un fichier similaire
// dans postGeoloc.js ou un fichier similaire
const postGeoloc = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude:', latitude, 'Longitude:', longitude);

        try {
          const response = await fetch('http://localhost:3000/meteo/meteo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Latitude: latitude, Longitude: longitude }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Geolocation data sent successfully:', data);
            resolve(data); // Résolution de la promesse avec les données
          } else {
            console.error('Failed to send geolocation data');
            reject(new Error('Failed to send geolocation data'));
          }
        } catch (error) {
          console.error('Error sending geolocation data:', error);
          reject(error);
        }
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        reject(error);
      }
    );
  });
};

export default postGeoloc;

// const postGeoloc = async () => {
//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       console.log('Latitude:', latitude, 'Longitude:', longitude);

//       try {
//         const response = await fetch('http://localhost:3000/meteo/meteo', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ latitude, longitude }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('Geolocation data sent successfully:', data);
//         } else {
//           console.error('Failed to send geolocation data');
//         }
//       } catch (error) {
//         console.error('Error sending geolocation data:', error);
//       }
//     },
//     () => {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   );
// };

// export default postGeoloc;
