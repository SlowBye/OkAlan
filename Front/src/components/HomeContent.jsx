import VoiceRecognition from './VoiceRecognition';

const HomeContent = ({ username }) => {
  return (
    console.log(username),
    (
      <div>
        {username ? <h1>Bonjour {username}</h1> : <h1>Bonjour</h1>}

        <h2>Reconnaissance Vocale</h2>
        <VoiceRecognition />
      </div>
    )
  );
};

export default HomeContent;

