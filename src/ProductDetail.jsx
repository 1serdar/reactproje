import "./ProductDetail.css";
import logo from "./assets/acs.png";

function ProductDetail({ product, onBackHome }) {
    return (
        <div>
            <header className="detail-header">

                <div className="detail-header-left">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="detail-header-title">
                    Hoş Geldiniz
                </div>

                <div className="detail-header-buttons">
                    <button
                        className="home-btn"
                        onClick={onBackHome}
                    >
                        Ana Sayfa
                    </button>

                    <button className="logout-btn">
                        Çıkış Yap
                    </button>
                </div>

            </header>
        </div>
    );
}

export default ProductDetail;