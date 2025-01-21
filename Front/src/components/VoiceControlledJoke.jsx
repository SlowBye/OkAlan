import { useState, useEffect } from 'react';
import { speak } from '../service/speak';
import fetchJoke from '../service/fetchJoke';

function VoiceControlledJoke() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetchJokeData();
  }, []);

  const fetchJokeData = async () => {
    
    let jokeData = await fetchJoke();
    console.log(jokeData);
    if (!jokeData) {
      // Utilisation d'une blague prédéfinie si le backend n'est pas disponible
      jokeData = {
        joke: "Qu'est-ce qui est jaune et qui attend ?",
        answer: 'Jonathan.',
      };
      console.log(
        "Aucune réponse du backend, utilisation d'une blague prédéfinie."
      );
    }
    setJoke(jokeData);
    speak(`Voici une blague: ${jokeData.joke}`);
    // Ajout d'un délai de 5 secondes avant de lire la réponse
    setTimeout(() => {
      speak(jokeData.answer);
    }, 5000); // 5000 millisecondes correspond à 5 secondes
  };

  return (
    <div className='voice-joke-container'>
      {joke ? (
        <>
          <p>{joke.joke}</p>
          <p>{joke.answer}</p>
        </>
      ) : (
        <p>Chargement de la blague...</p>
      )}
    </div>
  );
}

export default VoiceControlledJoke;
