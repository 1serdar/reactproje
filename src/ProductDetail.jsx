import "./ProductDetail.css";
import logo from "./assets/acs.png";
import { useNavigate } from "react-router-dom";

function ProductDetail({ product, onLogout }) {
    const navigate = useNavigate();
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
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <h1>{product.price} TL</h1>
                </div>
            </div>

        </div>
    );
}

export default ProductDetail;