import { useState, useEffect } from 'react';
import { speak } from '../service/speak';
import postGeoloc from '../service/postGeoloc'; // Import de votre fonction d'appel au backend

function VoiceControlledWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

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
    } catch (error) {
      console.log("Erreur lors de la récupération des données météo :", error);
      setWeather({ // Données fictives en cas d'erreur
        name: "Paris",
        temperature: 18,
        description: "partiellement nuageux"
      });
    }
  };

  useEffect(() => {
    if (weather) {
      const message = `La température à ${weather.name} est de ${weather.temperature} degrés Celsius avec comme condition ${weather.weather}.`;
      speak(message);
    }
  }, [weather]);

  return (
    <div className="voice-weather-info">
      {weather ? (
        <>
          <h3>Météo à {weather.name}</h3>
          <p>Température : {weather.temperature} °C</p>
          <p>Conditions : {weather.weather}</p>
        </>
      ) : (
        <p>Chargement des données météorologiques...</p>
      )}
    </div>
  );
}

export default VoiceControlledWeather;