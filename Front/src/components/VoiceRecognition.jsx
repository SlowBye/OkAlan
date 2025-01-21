import { useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function VoiceRecognition({ isListening, onTranscriptReceived }) {
  useEffect(() => {
    recognition.continuous = false;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscriptReceived(transcript);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening]);

  return null;
}

export default VoiceRecognition;
