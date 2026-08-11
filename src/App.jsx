import "./App.css";
import { useEffect, useState } from "react";
import Home from "./Home";

function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [goHome, setGoHome] = useState(false);

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

  const handleLogin = () => {
    if (email === staticEmail && password === staticPassword) {
      console.log("Giriş başarılı!");
      setMessage("Giriş başarılı!");
      setMessageType("success");

      setTimeout(() => {
        setGoHome(true);
      }, 1500);
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
    setGoHome(false);
    setActiveTab("login");
    setShowPassword(false);
  };

  if (goHome) {
    return <Home setGoHome={handleLogout} />;
  }

  return (
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
  );
}

export default App;