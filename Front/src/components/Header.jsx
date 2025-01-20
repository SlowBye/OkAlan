const Header = ({ login, onLogout }) => {
  return (
    <header>
      <div className='header-container'>
        <h1 className='homepage-title'>OK ALAN !</h1>
      </div>
      {login && (
        <button className='btn-logout' onClick={onLogout}>
          Se déconnecter
        </button>
      )}
    </header>
  );
};

export default Header;
