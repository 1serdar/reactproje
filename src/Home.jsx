import "./Home.css";
import logo from "./assets/acs.png";
import products from "./mockData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home({ setSelectedProduct, onLogout }) {
  useEffect(() => {
    document.title = "ACS - Ana Sayfa";
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">

        <div className="header-left">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="header-title">
          Hoş Geldiniz
        </h1>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Çıkış Yap
        </button>

      </header>

      <main>
        <section className="products-section">
          {products.map((product) => (
            <article
              className="product-card"
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                navigate(`/productdetail/${product.id}`);
              }}
            >
              <img className="product-image"
                src={product.image}
                alt={product.name} />

              <h3>{product.name}</h3>

              <p className="product-price">{product.price} TL</p>
            </article>
          ))}
        </section>
      </main>

    </div>
  );
}

export default Home;