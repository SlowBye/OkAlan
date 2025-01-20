const HomeContent = ({ username }) => {
  return (
    console.log(username),
    (<div>{username ? <h1>Bonjour {username}</h1> : <h1>Bonjour</h1>}</div>)
  );
};

export default HomeContent;
