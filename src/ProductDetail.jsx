import "./ProductDetail.css";
import logo from "./assets/acs.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "./mockData";

function ProductDetail({ onLogout, currentUser }) {
    useEffect(() => {
        document.title = "ACS - Ürün Detayı";

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute(
                "content",
                "ACS ürün detay - Ayakkabı görseli ve fiyat bilgisi."
            );
        }
    }, []);
    const navigate = useNavigate();
    const { id } = useParams();

    // Kullanıcıya özel favori ve sepet
    const [isLiked, setIsLiked] = useState(() => {
        const savedLikes = localStorage.getItem(`likedProducts_${currentUser}`);
        const likedProducts = savedLikes ? JSON.parse(savedLikes) : [];

        return likedProducts.includes(Number(id));
    });
    const [isInCart, setIsInCart] = useState(() => {
        const savedCart = localStorage.getItem(`cartProducts_${currentUser}`);
        const cartProducts = savedCart ? JSON.parse(savedCart) : [];

        return cartProducts.includes(Number(id));
    });

    // Ürün detay bilgileri
    const selectedProduct = products.find(
        (product) => product.id === Number(id)
    );
    return (
        <div>
            <header className="detail-header">

                <div className="detail-header-left">
                    <img src={logo} alt="Logo" />
                </div>

                <h1 className="detail-header-title">
                    Ürün Detayı
                </h1>

                <div className="detail-header-buttons">
                    <button
                        className="home-btn"
                        onClick={() => navigate("/homepage")}
                    >
                        Ana Sayfa
                    </button>

                    <button
                        className="logout-btn"
                        onClick={onLogout}
                    >
                        Çıkış Yap
                    </button>
                </div>

            </header>

            <main className="product-detail">
                <figure className="product-detail-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                </figure>

                <section className="product-detail-info">
                    <h1>{selectedProduct.name}</h1>
                    <h1>{selectedProduct.price} TL</h1>
                </section>

                <button
                    className={`like-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => {
                        const savedLikes = localStorage.getItem(`likedProducts_${currentUser}`);
                        const likedProducts = savedLikes ? JSON.parse(savedLikes) : [];

                        if (likedProducts.includes(Number(id))) {
                            const updatedLikes = likedProducts.filter(
                                (productId) => productId !== Number(id)
                            );

                            localStorage.setItem(`likedProducts_${currentUser}`, JSON.stringify(updatedLikes));
                            setIsLiked(false);
                        } else {
                            const updatedLikes = [...likedProducts, Number(id)];

                            localStorage.setItem(`likedProducts_${currentUser}`, JSON.stringify(updatedLikes));
                            setIsLiked(true);
                        }
                    }}
                >
                    {isLiked ? "♥" : "♡"}
                </button>
                <button
                    className={`cart-btn ${isInCart ? "added" : ""}`}
                    onClick={() => {
                        const savedCart = localStorage.getItem(`cartProducts_${currentUser}`);
                        const cartProducts = savedCart ? JSON.parse(savedCart) : [];

                        if (cartProducts.includes(Number(id))) {
                            const updatedCart = cartProducts.filter(
                                (productId) => productId !== Number(id)
                            );

                            localStorage.setItem(`cartProducts_${currentUser}`, JSON.stringify(updatedCart));
                            setIsInCart(false);
                        } else {
                            const updatedCart = [...cartProducts, Number(id)];

                            localStorage.setItem(`cartProducts_${currentUser}`, JSON.stringify(updatedCart));
                            setIsInCart(true);
                        }
                    }}
                >
                    +
                </button>
            </main>

        </div>
    );
}

export default ProductDetail;