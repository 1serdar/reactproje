import "./Home.css";
import logo from "./assets/acs.png";

function Home({ setGoHome }) {
  return (
    <div>
      <header className="header">

        <div className="header-left">
          <img src={logo} alt="Logo" />
        </div>

        <div className="header-title">
          Hoş Geldiniz
        </div>

        <button
          className="logout-btn"
          onClick={() => setGoHome(false)}
        >
          Çıkış Yap
        </button>

      </header>

    </div>
  );
}

export default Home;