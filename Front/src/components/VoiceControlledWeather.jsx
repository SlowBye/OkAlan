import { useState, useEffect } from 'react';
import { speak } from '../service/speak';
import postGeoloc from '../service/postGeoloc'; // Import de votre fonction d'appel au backend

function VoiceControlledWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    // Démarre la reconnaissance vocale immédiatement lorsque le composant est chargé
    // recognition.start();
=======
    fetchWeather();
  }, []);
>>>>>>> f49e7f4694b6bd0ad48c215855384d6e5b02a353

  const fetchWeather = async () => {
    try {
      const weatherData = await postGeoloc(); // Appel au backend
      if (weatherData && weatherData.temperature) { // Vérifiez que le backend a répondu avec des données valides
        setWeather(weatherData);
      } else {
        setWeather({ // Données fictives comme fallback
          name: "Paris",
          temperature: 18,
          description: "partiellement nuageux"
        });
      }
<<<<<<< HEAD
    };

    recognition.onend = () => {
      // Optionnellement, redémarrez l'écoute ou gérez la fin de l'écoute ici
    };
    // eslint-disable-next-line
  }, []); // Ajouter des dépendances si nécessaire

  const getWeather = async () => {
    // Suppression de setIsListening car il n'est plus nécessaire
    const weatherData = await postGeoloc();
    console.log('Weather data:', weatherData);
    if (weatherData) {
      setWeather({
        name: weatherData.name,
        temperature: weatherData.temperature,
        description: weatherData.weather,
=======
    } catch (error) {
      console.log("Erreur lors de la récupération des données météo :", error);
      setWeather({ // Données fictives en cas d'erreur
        name: "Paris",
        temperature: 18,
        description: "partiellement nuageux"
>>>>>>> f49e7f4694b6bd0ad48c215855384d6e5b02a353
      });
    }
  };

  useEffect(() => {
    if (weather) {
      const message = `La température à ${weather.name} est de ${weather.temperature} degrés Celsius avec comme condition ${weather.description}.`;
      speak(message);
    }
  }, [weather]);

  return (
    <div className="voice-weather-info">
      {weather ? (
        <>
          <h3>Météo à {weather.name}</h3>
          <p>Température : {weather.temperature} °C</p>
          <p>Conditions : {weather.description}</p>
        </>
      ) : (
        <p>Chargement des données météorologiques...</p>
      )}
    </div>
  );
}

export default VoiceControlledWeather;
// import { useState, useEffect } from 'react';
// import { speak } from '../service/speak';
// import postGeoloc from '../service/postGeoloc';

// function VoiceControlledWeather() {
//   const [weather, setWeather] = useState(null);

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false; // Arrête l'écoute après la première reconnaissance
//   recognition.lang = 'fr-FR'; // Langue française

//   useEffect(() => {
//     // Démarre la reconnaissance vocale immédiatement lorsque le composant est chargé
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toLowerCase();
//       console.log('Transcript:', transcript);
//       if (transcript.includes('météo')) {
//         getWeather();
//       }
//     };

//     recognition.onend = () => {
//       // Optionnellement, redémarrez l'écoute ou gérez la fin de l'écoute ici
//     };

//     // Assurez-vous de nettoyer en arrêtant la reconnaissance vocale lorsque le composant est démonté
//     return () => {
//       recognition.stop();
//     };
//   }, []); // Les dépendances vides signifient que cet effet ne s'exécutera qu'au montage

//   const getWeather = async () => {
//     // Suppression de setIsListening car il n'est plus nécessaire
//     const weatherData = await postGeoloc();
//     console.log('Weather data:', weatherData);
//     if (weatherData) {
//       setWeather({
//         name: weatherData.name,
//         temperature: weatherData.temperature,
//         description: weatherData.weather,
//       });

//       const message = `La température à ${weatherData.name} est de ${weatherData.temperature} degrés Celsius avec comme condition ${weatherData.weather}.`;
//       speak(message);
//     } else {
//       console.log(weatherData)
//       speak(
//         "Je suis désolé, je n'ai pas pu récupérer les informations météorologiques."
//       );
//     }
//   };

//   return (
//     <div className="voice-weather-container">
//       {weather && (
//         <div className="voice-weather-info">
//           <h3>Météo à {weather.name}</h3>
//           <p>Température : {weather.temperature} °C</p>
//           <p>Conditions : {weather.description}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VoiceControlledWeather;
// import { useState, useEffect } from 'react';
// import { speak } from '../service/speak';
// import postGeoloc from '../service/postGeoloc';


// function VoiceControlledWeather() {
//   const [weather, setWeather] = useState(null);
//   const [isListening, setIsListening] = useState(false);

//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false; // Arrête l'écoute après la première reconnaissance
//   recognition.lang = 'fr-FR'; // Langue française

//   useEffect(() => {
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toLowerCase();
//       console.log('Transcript:', transcript);
//       if (transcript.includes('météo')) {
//         getWeather();
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };
//   }, []); // Ajouter des dépendances si nécessaire

//   const getWeather = async () => {
//     setIsListening(false); // Stop listening when processing the command
//     const weatherData = await postGeoloc();
//     console.log('Weather data:', weatherData);
//     if (weatherData) {
//       setWeather({
//         name: weatherData.name,
//         temperature: weatherData.temperature,
//         description: weatherData.weather,
//       });

//       const message = `La température à ${weatherData.name} est de ${weatherData.temperature} degrés Celsius avec comme condition ${weatherData.weather}.`;
//       speak(message);
//     } else {
//       console.log(weatherData)
//       speak(
//         "Je suis désolé, je n'ai pas pu récupérer les informations météorologiques."
//       );
//     }
//   };

//   const toggleListening = () => {
//     setIsListening(!isListening);
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   return (
//     <div className="voice-weather-container">
//       <button className="voice-button" onClick={toggleListening}>
//         {isListening ? 'Arrêter l’écoute' : 'Écouter'}
//       </button>
//       {weather && (
//         <div className="voice-weather-info">
//           <h3>Météo à {weather.name}</h3>
//           <p>Température : {weather.temperature} °C</p>
//           <p>Conditions : {weather.description}</p>
//         </div>
//       )}
//     </div>
//   );
// }


// export default VoiceControlledWeather;


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
