import { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true; // Écoute continue
recognition.lang = 'fr-FR'; // Langue française

function VoiceRecognition({ setActiveFeature }) {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    recognition.onstart = () => {
      console.log('La reconnaissance vocale est activée.');
      setIsListening(true);
      setTranscripts([]);
    };

    recognition.onend = () => {
      console.log('La reconnaissance vocale est désactivée.');
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      let transcript = event.results[current][0].transcript.trim().toLowerCase();

      if (transcript.includes('écris')) {
        transcript = transcript.replace('écris', '').trim(); // Retirer le mot "écris" de la transcription
        setTranscripts(prev => [...prev, transcript]);
      } else if (transcript.includes('météo')) {
        setActiveFeature('weather');
      } else if (transcript.includes('image')) {
        setActiveFeature('images');
      } // Ajoutez d'autres conditions pour d'autres fonctionnalités
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
      {transcripts.map((transcript, index) => (
        <div key={index} className="transcription">
          <p>{transcript}</p>
        </div>
      ))}
    </div>
  );
}

export default VoiceRecognition;
// import { useState, useEffect } from 'react';

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.continuous = true; // Écoute continue
// recognition.lang = 'fr-FR'; // Définir la langue à Français

// function VoiceRecognition() {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');

//   useEffect(() => {
//     recognition.onstart = () => {
//       console.log('La reconnaissance vocale est activée.');
//       setIsListening(true);
//     };

//     recognition.onend = () => {
//       console.log('La reconnaissance vocale est désactivée.');
//       setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//       const current = event.resultIndex;
//       const transcript = event.results[current][0].transcript;
//       console.log(`Transcription actuelle : ${transcript}`);
//       setTranscript(transcript);
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   return (
//     <div className="voice-recognition-container">
//       <button className="voice-button" onClick={toggleListening}>
//         {isListening ? 'Arrêter l’écoute' : 'Commencer à écouter'}
//       </button>
//       <div className="transcription">{transcript}</div>
//     </div>
//   );
// }

// export default VoiceRecognition;
