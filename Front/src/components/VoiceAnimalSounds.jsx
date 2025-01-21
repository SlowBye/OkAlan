import { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'fr-FR';

function VoiceAnimalSounds() {
  const [isListening, setIsListening] = useState(false);
  const [animalName, setAnimalName] = useState('');

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setAnimalName(transcript);
      fetchAnimalSound(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
      setAnimalName('');
    }
  };

  const fetchAnimalSound = async (animal) => {
    try {
      const response = await fetch(`http://localhost:3000/animal/${animal}`);
      const data = await response.json();
      // Supposons que la réponse contienne un URL vers un fichier audio
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      } else {
        console.log('No sound found for this animal:', animal);
      }
    } catch (error) {
      console.error('Error fetching animal sound:', error);
    }
  };

  return (
    <div>
      <h2>Le son des animaux</h2>
      <button onClick={toggleListening}>
        {isListening ? 'Arrêter l’écoute' : 'Demander un animal'}
      </button>
      {animalName && <p>Animal demandé: {animalName}</p>}
    </div>
  );
}

export default VoiceAnimalSounds;
