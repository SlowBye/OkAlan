import { useState } from 'react';
import VoiceRecognition from './VoiceRecognition';
import VoiceControlledWeather from './VoiceControlledWeather';
import VoiceControlledJoke from './VoiceControlledJoke'; // Importez le nouveau composant de blague
 
const HomeContent = ({ username }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);
 
  const handleListeningToggle = () => {
    if (!isListening) {
      setTranscripts([]);
      setActiveFeature(null); // Réinitialiser la fonctionnalité active lorsque l'écoute est relancée
    }
    setIsListening(!isListening);
  };
 
  const handleTranscriptReceived = (receivedTranscript) => {
    const transcript = receivedTranscript.toLowerCase();
    if (transcript.startsWith('écris ')){
      const textToWrite = capitalizeFirstLetter(transcript.slice(6));
      setTranscripts((prev) => [...prev, textToWrite]);
    } else if (transcript.includes('météo')) {
      setActiveFeature('weather');
    } else if (
      transcript.includes('dis-moi une blague') ||
      transcript.includes('raconte une blague') ||
      transcript.includes('blague') ||
      transcript.includes('raconte moi une blague')
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
          <h1>Bonjour </h1>
        )}
      </div>
     
      <div className="voice-recognition-container">
        <div className='voice-info'>
          <p>Pour demandé la météo, dites : météo ...</p>
          <p>Pour demander d'écrire, dites : écris ...</p>
          <p>Pour demander une blague, dites : dis-moi une blague</p>
          <p>Pour demander une blague, dites : raconte une blague</p>
        </div>
 
        <button className="voice-button" onClick={handleListeningToggle}>
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
      </div>
    </section>
  );
};
 
export default HomeContent;