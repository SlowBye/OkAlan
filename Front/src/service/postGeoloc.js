// envoi la position de l'utilisateur au serveur

// dans postGeoloc.js ou un fichier similaire
const postGeoloc = async () => {
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
          body: JSON.stringify({ latitude, longitude }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Geolocation data sent successfully:', data);
          return data; // Retourne les données pour utilisation dans le composant
        } else {
          console.error('Failed to send geolocation data');
          return null;
        }
      } catch (error) {
        console.error('Error sending geolocation data:', error);
        return null;
      }
    },
    () => {
      console.error('Geolocation is not supported by this browser.');
      return null;
    }
  );
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
