import "./ProductDetail.css";
import logo from "./assets/acs.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "./mockData";

function ProductDetail({ onLogout }) {
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
    const [isLiked, setIsLiked] = useState(() => {
    const savedLikes = localStorage.getItem("likedProducts");
    const likedProducts = savedLikes ? JSON.parse(savedLikes) : [];

    return likedProducts.includes(Number(id));
});
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
                    className="like-btn"
                    onClick={() => {
    const savedLikes = localStorage.getItem("likedProducts");
    const likedProducts = savedLikes ? JSON.parse(savedLikes) : [];

    if (likedProducts.includes(Number(id))) {
        const updatedLikes = likedProducts.filter(
            (productId) => productId !== Number(id)
        );

        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
        setIsLiked(false);
    } else {
        const updatedLikes = [...likedProducts, Number(id)];

        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
        setIsLiked(true);
    }
}}
                >
                    {isLiked ? "♥" : "♡"}
                </button>
            </main>

        </div>
    );
}

export default ProductDetail;