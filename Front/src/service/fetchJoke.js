async function fetchJoke() {
  try {
    const response = await fetch('http://localhost:3000/blague/blague');
    if (!response.ok) {
      throw new Error('Network response was not ok'); // Gestion des réponses non satisfaisantes.
    }
    const jokeData = await response.json(); // Conversion de la réponse en JSON.
    return jokeData.blague; // Supposition que la réponse a une clé 'blague' contenant les détails de la blague.
  } catch (error) {
    console.error('Failed to fetch joke:', error); // Affichage des erreurs en console.
    return null; // Retourne null en cas d'erreur pour indiquer un échec.
  }
}

export default fetchJoke;
