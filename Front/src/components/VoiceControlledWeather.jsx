import { useState, useEffect } from 'react';
import { speak } from '../service/speak';
import postGeoloc from '../service/postGeoloc';

function VoiceControlledWeather() {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const weatherData = await postGeoloc();
    if (weatherData) {
      setWeather({
        name: weatherData.name,
        temperature: weatherData.temp,
        description: weatherData.description,
      });

      const message = `La température à ${weatherData.name} est de ${weatherData.temp} degrés Celsius avec comme condition ${weatherData.description}.`;
      speak(message);
    } else {
      speak(
        "Je suis désolé, je n'ai pas pu récupérer les informations météorologiques."
      );
    }
  };

  return (
    <div>
      <button onClick={getWeather}>Demander la météo</button>
      {weather && (
        <div>
          <h3>Météo à {weather.name}</h3>
          <p>Température: {weather.temperature} °C</p>
          <p>Conditions: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default VoiceControlledWeather;

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.continuous = false; // Arrête l'écoute après la première reconnaissance
// recognition.lang = 'fr-FR'; // Langue française

// function VoiceControlledWeather() {
//   const [isListening, setIsListening] = useState(false);
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toLowerCase();
//       if (transcript.includes('météo')) {
//         getWeather();
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };
//   }, []);

//   const getWeather = () => {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => {
//     //     const latitude = position.coords.latitude;
//     //     const longitude = position.coords.longitude;
//     //     console.log('Latitude:', latitude, 'Longitude:', longitude);
//     //     fetchWeather(position.coords.latitude, position.coords.longitude);
//     //   },
//     //   () => {
//     //     console.error('Geolocation is not supported by this browser.');
//     //   }
//     // );
//     postGeoloc();
//   };

//   const fetchWeather = async () => {
//     // const apiKey = 'f29c75f77b211260020d2adb6a416c27';
//     // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;
//     const url = `http://localhost:3000/meteo/meteo`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setWeather({
//         name: data.name,
//         temp: data.temperature,
//         description: data.weather,
//       });

//       const message = `La température à ${data.name} est de ${data.temperature} degrés Celsius, avec comme condition ${data.weather}.`;

//       speak(message);
//     } catch (error) {
//       console.error('Failed to fetch weather', error);
//       speak(
//         "Je suis désolé, je n'ai pas pu récupérer les informations météorologiques."
//       );
//     }
//   };

//   const toggleListening = () => {
//     setIsListening(true);
//     recognition.start();
//   };

//   return (
//     <div>
//       <button onClick={toggleListening}>
//         {isListening ? 'Écoute...' : 'Demander la météo'}
//       </button>
//       {weather && (
//         <div>
//           <h3>Météo à {weather.name}</h3>
//           <p>Température: {weather.temperature} °C</p>
//           <p>Conditions: {weather.weather}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VoiceControlledWeather;
