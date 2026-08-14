import "./Home.css";
import logo from "./assets/acs.png";
import products from "./mockData";

function Home({ setGoHome, setSelectedProduct }) {
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

      <main className="products-section">
        {products.map((product) => (
          <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
            <img className="product-image"
              src={product.image}
              alt={product.name} />

            <h3>{product.name}</h3>

            <p className="product-price">{product.price} TL</p>
          </div>
        ))}
      </main>

    </div>
  );
}

export default Home;