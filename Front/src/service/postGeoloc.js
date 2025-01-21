
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
            resolve(data); 
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
