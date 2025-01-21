import VoiceControlledWeather from './VoiceControlledWeather';
import VoiceRecognition from './VoiceRecognition';
import { useState } from 'react';

const HomeContent = ({ username }) => {
  // Etat pour ouvrir ou fermer les sections
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  return (
    <section className="user">
      <div className="user-bonjour">
        {username ? <h1>Bonjour <span>{username}</span></h1> : <h1>Bonjour</h1>}
      </div>

      {/* Transcription */}
      <div className="user-vocal">
        <div className="vocal-header" onClick={() => setIsVoiceOpen(!isVoiceOpen)}>
          <h2>Transcription</h2>
          <button className="toggle-button">{isVoiceOpen ? '-' : '+'}</button>
        </div>
        {isVoiceOpen && (
          <div className="vocal-content">
            <VoiceRecognition />
          </div>
        )}
      </div>

      {/* Météo */}
      <div className="user-vocal">
        <div className="vocal-header" onClick={() => setIsWeatherOpen(!isWeatherOpen)}>
          <h2>Météo</h2>
          <button className="toggle-button">{isWeatherOpen ? '-' : '+'}</button>
        </div>
        {isWeatherOpen && (
          <div className="vocal-content">
            <VoiceControlledWeather />
          </div>
        )}
      </div>

      {/* Recherche Images */}
      <div className="user-vocal">
        <div className="vocal-header" onClick={() => setIsImageSearchOpen(!isImageSearchOpen)}>
          <h2>Recherche Images</h2>
          <button className="toggle-button">{isImageSearchOpen ? '-' : '+'}</button>
        </div>
        {isImageSearchOpen && (
          <div className="vocal-content">
            <VoiceRecognition />
            <VoiceControlledWeather />
          </div>
        )}
      </div>
    </section>
  );
};


export default HomeContent;

