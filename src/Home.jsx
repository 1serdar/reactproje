import "./Home.css";
import logo from "./assets/acs.png";
import products from "./mockData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ onLogout, currentUser }) {
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
  const [filter, setFilter] = useState("Tüm Ürünler");

  // Kullanıcıya özel favori ve sepet
  const [likedProducts, setLikedProducts] = useState(() => {
    const savedLikes = localStorage.getItem(`likedProducts_${currentUser}`);
    return savedLikes ? JSON.parse(savedLikes) : [];
  });
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem(`cartProducts_${currentUser}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(`likedProducts_${currentUser}`, JSON.stringify(likedProducts));
  }, [likedProducts, currentUser]);
  useEffect(() => {
    localStorage.setItem(`cartProducts_${currentUser}`, JSON.stringify(cartProducts));
  }, [cartProducts, currentUser]);

  // Arama ve ürün filtreleme
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm);

    const matchesFilter =
      filter === "Tüm Ürünler" ||
      (filter === "Favoriler" && likedProducts.includes(product.id)) ||
      (filter === "Sepet" && cartProducts.includes(product.id));

    return matchesSearch && matchesFilter;
  });
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
        <select value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Tüm Ürünler</option>
          <option>Favoriler</option>
          <option>Sepet</option>
        </select>

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
                className={`like-btn ${likedProducts.includes(product.id) ? "liked" : ""}`}
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
              <button
                className={`cart-btn ${cartProducts.includes(product.id) ? "added" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();

                  setCartProducts((prev) =>
                    prev.includes(product.id)
                      ? prev.filter((id) => id !== product.id)
                      : [...prev, product.id]
                  );
                }}
              >
                +
              </button>
            </article>
          ))}
        </section>
      </main>

    </div>
  );
}

export default Home;