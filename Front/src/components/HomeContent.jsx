import { useState } from 'react';
import VoiceRecognition from './VoiceRecognition';
import VoiceControlledWeather from './VoiceControlledWeather';
import VoiceControlledJoke from './VoiceControlledJoke'; // Importez le nouveau composant de blague

const HomeContent = ({ username }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);

  const handleListeningToggle = () => {
    if (isListening) {
      setTranscripts([]);
      setActiveFeature(null); // S'assurer que cela se fait avant de basculer l'état d'écoute.
    }
    setIsListening(!isListening);
  };

  const handleTranscriptReceived = (receivedTranscript) => {
    const transcript = receivedTranscript.toLowerCase();
    if (transcript.startsWith('écris ')) {
      const textToWrite = capitalizeFirstLetter(transcript.slice(6));
      setTranscripts((prev) => [...prev, textToWrite]);
    } else if (transcript.includes('météo')) {
      setActiveFeature('weather');
    } else if (
      transcript.includes('dis-moi une blague') ||
      transcript.includes('raconte une blague')
    ) {
      setActiveFeature('joke');
    }
  };

  // Fonction pour capitaliser la première lettre de la phrase
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
      {transcripts.map((transcript, index) => (
        <div key={index}>{transcript}</div>
      ))}
      {activeFeature === 'weather' && <VoiceControlledWeather />}
      {activeFeature === 'joke' && <VoiceControlledJoke />}
    </section>
  );
};

export default HomeContent;
