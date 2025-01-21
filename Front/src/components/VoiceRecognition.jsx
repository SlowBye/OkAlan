import { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true; // Écoute continue
recognition.lang = 'fr-FR'; // Définir la langue à Français

function VoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    recognition.onstart = () => {
      console.log('La reconnaissance vocale est activée.');
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log('La reconnaissance vocale est désactivée.');
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      console.log(`Transcription actuelle : ${transcript}`);
      setTranscript(transcript);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="voice-recognition-container">
      <button className="voice-button" onClick={toggleListening}>
        {isListening ? 'Arrêter l’écoute' : 'Commencer à écouter'}
      </button>
      <div className="transcription">{transcript}</div>
    </div>
  );
}

export default VoiceRecognition;
