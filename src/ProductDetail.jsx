import "./ProductDetail.css";
import logo from "./assets/acs.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import products from "./mockData";

function ProductDetail({ product, onLogout }) {
    useEffect(() => {
        document.title = "ACS - Ürün Detayı";
    }, []);
    const navigate = useNavigate();
    const { id } = useParams();
    const selectedProduct = products.find(
        (product) => product.id === Number(id)
    );
    return (
        <div>
            <header className="detail-header">

                <div className="detail-header-left">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="detail-header-title">
                    Ürün Detayı
                </div>

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

            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>

                <div className="product-detail-info">
                    <h1>{selectedProduct.name}</h1>
                    <h1>{selectedProduct.price} TL</h1>
                </div>
            </div>

        </div>
    );
}

export default ProductDetail;