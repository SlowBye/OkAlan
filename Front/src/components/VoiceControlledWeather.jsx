import { useState, useEffect } from 'react';
import { speak } from '../service/speak';
import postGeoloc from '../service/postGeoloc';


function VoiceControlledWeather() {
  const [weather, setWeather] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false; // Arrête l'écoute après la première reconnaissance
  recognition.lang = 'fr-FR'; // Langue française

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Transcript:', transcript);
      if (transcript.includes('météo')) {
        getWeather();
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, []); // Ajouter des dépendances si nécessaire

  const getWeather = async () => {
    setIsListening(false); // Stop listening when processing the command
    const weatherData = await postGeoloc();
    console.log('Weather data:', weatherData);
    if (weatherData) {
      setWeather({
        name: weatherData.name,
        temperature: weatherData.temperature,
        description: weatherData.weather,
      });

      const message = `La température à ${weatherData.name} est de ${weatherData.temperature} degrés Celsius avec comme condition ${weatherData.weather}.`;
      speak(message);
    } else {
      console.log(weatherData)
      speak(
        "Je suis désolé, je n'ai pas pu récupérer les informations météorologiques."
      );
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="voice-weather-container">
      <button className="voice-button" onClick={toggleListening}>
        {isListening ? 'Arrêter l’écoute' : 'Écouter'}
      </button>
      {weather && (
        <div className="voice-weather-info">
          <h3>Météo à {weather.name}</h3>
          <p>Température : {weather.temperature} °C</p>
          <p>Conditions : {weather.description}</p>
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
