import { useState } from 'react';
import VoiceRecognition from './VoiceRecognition';
import VoiceControlledWeather from './VoiceControlledWeather';

const HomeContent = ({ username }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState('');

  const handleListeningToggle = () => {
    if (!isListening) {
      setTranscripts([]); // Effacer les transcriptions précédentes avant de recommencer l'écoute
    }
    setIsListening(!isListening);
  };

  const handleTranscriptReceived = (receivedTranscript) => {
    const transcript = receivedTranscript.toLowerCase();
    // Détecter le mot-clé "écris" et stocker la transcription suivante
    if (transcript.startsWith('écris ')) {
      const textToWrite = capitalizeFirstLetter(transcript.slice(6)); // Supprimer le mot "écris" du début et met une majuscule
      setTranscripts((prev) => [...prev, textToWrite]);
    } else if (transcript.includes('météo')) {
      setActiveFeature('weather');
    } // Vous pouvez ajouter plus de conditions ici pour d'autres fonctionnalités
  };

  // Fonction pour capitaliser la première lettre de la phrase
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [activeFeature, setActiveFeature] = useState(null);
  return (
    <section className='user'>
      <div className='user-bonjour'>
        {username ? (
          <h1>
            Bonjour <span>{username}</span>
          </h1>
        ) : (
          <h1>Bonjour</h1>
        )}
      </div>
      <button onClick={handleListeningToggle}>
        {isListening ? 'Arrêter l’écoute' : 'Commencer à écouter'}
      </button>
      <VoiceRecognition
        isListening={isListening}
        onTranscriptReceived={handleTranscriptReceived}
      />
      {transcripts.length > 0 && (
        <div className='transcription-list'>
          <h3>Transcriptions:</h3>
          <ul>
            {transcripts.map((transcript, index) => (
              <li key={index}>{transcript}</li>
            ))}
          </ul>
        </div>
      )}
      {activeFeature === 'weather' && <VoiceControlledWeather />}
    </section>
  );
};

export default HomeContent;
