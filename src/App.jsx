import "./App.css";
import { useState, useEffect } from "react";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/reactproje/") {
      document.title = "ACS";

      const description = document.querySelector('meta[name="description"]');
      if (description) {
        description.setAttribute(
          "content",
          "ACS - Ayakkabı e-ticaret sitesine giriş yapın."
        );
      }
    }
  }, []);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  /*useEffect(() => { // aktif sekme, console yazdırma
    console.log("Aktif sekme:", activeTab);
  }, [activeTab]);*/

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const staticEmail = "test@test.com";
  const staticPassword = "123456";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = () => { // Kullanıcı giriş kontrolü
    setMessage("");
    setMessageType("");
    if (!email.trim() || !password.trim()) {
      setMessage("Lütfen tüm alanları doldurunuz!");
      setMessageType("error");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const registeredUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (email.trim() === staticEmail && password === staticPassword || registeredUser) {
      console.log("Giriş başarılı!");
      setMessage("Giriş başarılı!");
      setMessageType("success");

      setTimeout(() => {
        setCurrentUser(registeredUser ? registeredUser.email : staticEmail);
        setIsLoggedIn(true);
        navigate("/homepage", { replace: true });
      }, 1100);
    } else {
      console.log("Hatalı giriş! : ", email);
      setMessage("E-posta veya şifre hatalı!");
      setMessageType("error");
    }
  };
  const handleRegister = () => { // Kullanıcı kayıt kontrolü
    setMessage("");
    setMessageType("");
    if (!name.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      setMessage("Lütfen tüm alanları doldurunuz!");
      setMessageType("error");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!emailRegex.test(registerEmail)) {
      setMessage("Geçerli bir e-posta adresi giriniz!");
      setMessageType("error");
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{4,}$/;
    if (!passwordRegex.test(registerPassword)) {
      setMessage("Şifre en az 4 karakter, 1 özel karakter içermeli!");
      setMessageType("error");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (user) => user.email === registerEmail
    );

    if (existingUser) {
      setMessage("Bu e-posta adresi zaten kayıtlı!");
      setMessageType("error");
      return;
    }
    users.push({
      name: name.trim(),
      email: registerEmail.trim(),
      password: registerPassword.trim()
    });

    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Üyelik başarıyla oluşturuldu!");
    setMessageType("success");
    console.log("Kayıt başarılı!");
  };
  const handleTabChange = (tab) => { // Giriş Yap/Üye Ol işlemleri
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

  const handleLogout = () => { // Çıkış işlemleri
    setEmail("");
    setPassword("");
    setName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setMessage("");
    setMessageType("");
    setActiveTab("login");
    setShowPassword(false);
    setIsLoggedIn(false);
    setCurrentUser("");
    document.title = "ACS";
    navigate("/", { replace: true });
    console.log("Çıkış başarılı!");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/homepage" replace />
          ) : (
            <main className="container">
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

                    <label>E-Posta Adresi</label>
                    <input
                      type="email"
                      placeholder="E-Posta Adresi"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Şifre</label>
                    <div className="password-box">

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrenizi girin"
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
                    <h2>Hesap Oluşturun</h2>
                    <label>Ad Soyad</label>
                    <input
                      type="text"
                      placeholder="Adınız ve Soyadınız"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label>E-Posta Adresi</label>
                    <input
                      type="email"
                      placeholder="ornek@mail.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <label>Şifre</label>
                    <div className="password-box">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrenizi oluşturun"
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

                    {message && (
                      <div className={`message ${messageType}`}>
                        {message}
                      </div>
                    )}

                    <button className="login-btn" onClick={handleRegister}>
                      Üye Ol
                    </button>
                  </>
                )}

              </div>

              <footer className="login-footer">
                © 2026 ACS - Tüm Hakları Saklıdır.
              </footer>

            </main>
          )}
      />
      <Route
        path="/homepage"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home onLogout={handleLogout} currentUser={currentUser} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productdetail/:id"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ProductDetail onLogout={handleLogout} currentUser={currentUser} />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;