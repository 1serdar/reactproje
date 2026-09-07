import "./Home.css";
import logo from "./assets/acs.png";
import products from "./mockData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ onLogout }) {
  useEffect(() => {
    document.title = "ACS - Ana Sayfa";

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        "ACS ana sayfa - Ayakkabı ürünlerini inceleyin."
      );
    }
  }, []);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [likedProducts, setLikedProducts] = useState(() => {
  const savedLikes = localStorage.getItem("likedProducts");
  return savedLikes ? JSON.parse(savedLikes) : [];
});

useEffect(() => {
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
}, [likedProducts]);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );
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

        <label htmlFor="product-search">Ürün Ara</label>

        <input
          id="product-search"
          type="text"
          placeholder="Ürün İd veya İsmi ile arayabilirsiniz."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredProducts.length === 0 && (
          <p className="no-products-found">Aradığınız ürün bulunamadı.</p>
        )}

        <section className="products-section">
          {filteredProducts.map((product) => (
            <article
              className="product-card"
              key={product.id}
              onClick={() => {
                navigate(`/productdetail/${product.id}`);
              }}
            >
              <img className="product-image"
                src={product.image}
                alt={product.name} />

              <h3>{product.name}</h3>

              <p className="product-price">{product.price} TL</p>

              <button
                className="like-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  setLikedProducts((prev) =>
                    prev.includes(product.id)
                      ? prev.filter((id) => id !== product.id)
                      : [...prev, product.id]
                  );
                }}
              >
                {likedProducts.includes(product.id) ? "♥" : "♡"}
              </button>
            </article>
          ))}
        </section>
      </main>

    </div>
  );
}

export default Home;