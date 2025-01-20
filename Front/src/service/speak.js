const speak = (message) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.lang = 'fr-FR'; // Réglage de la langue sur le français
  speech.rate = 1; // Vitesse de parole normale
  window.speechSynthesis.speak(speech);
};

export { speak };
