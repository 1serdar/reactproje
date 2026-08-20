import "./App.css";
import { useEffect, useState } from "react";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  /*
  useEffect(() => {
    console.log("Aktif sekme:", activeTab);
  }, [activeTab]);
  */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const staticEmail = "test@test.com";
  const staticPassword = "123456";

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email === staticEmail && password === staticPassword) {
      console.log("Giriş başarılı!");
      setIsLoggedIn(true);
      setMessage("Giriş başarılı!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/homepage", { replace: true });
      }, 1100);
    } else {
      console.log("Hatalı giriş! : ", email);
      setMessage("E-posta veya şifre hatalı!");
      setMessageType("error");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setEmail("");
    setPassword("");

    setName("");
    setRegisterEmail("");
    setRegisterPassword("");

    setMessage("");
    setMessageType("");

    setShowPassword(false);
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setMessage("");
    setMessageType("");
    setActiveTab("login");
    setShowPassword(false);
    setSelectedProduct(null);
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/homepage" replace />
          ) : (
            <div className="container">
              <div className="login-box">

                <div className="tabs">
                  <button
                    className={activeTab === "login" ? "active" : ""}
                    onClick={() => handleTabChange("login")}
                  >
                    Giriş Yap
                  </button>

                  <button
                    className={activeTab === "register" ? "active" : ""}
                    onClick={() => handleTabChange("register")}
                  >
                    Üye Ol
                  </button>
                </div>

                {activeTab === "login" ? (
                  <>
                    <h2>Hesabınıza Giriş Yapın</h2>

                    <input
                      type="email"
                      placeholder="E-posta Adresi"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="password-box">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        className="show-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Gizle" : "Göster"}
                      </button>
                    </div>

                    {message && (
                      <div className={`message ${messageType}`}>
                        {message}
                      </div>
                    )}

                    <button
                      className="login-btn"
                      onClick={handleLogin}
                    >
                      Giriş Yap
                    </button>
                  </>
                ) : (
                  <>
                    <h2>Yeni Üyelik</h2>

                    <input
                      type="text"
                      placeholder="Ad Soyad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <input
                      type="email"
                      placeholder="E-posta Adresi"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />

                    <div className="password-box">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifre"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        className="show-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Gizle" : "Göster"}
                      </button>
                    </div>

                    <button className="login-btn">
                      Üye Ol
                    </button>
                  </>
                )}

              </div>
            </div>
          )}
      />
      <Route
        path="/homepage"
        element={
          isLoggedIn ? (
            <Home
              setSelectedProduct={setSelectedProduct}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/productdetail"
        element={
          isLoggedIn && selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;