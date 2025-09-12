import { Lock, LogIn, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      alert("Username va parolni to'ldiring");
      return;
    }

    try {
      const docRef = doc(db, "users", username.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.password === password) {
          alert("Login muvaffaqiyatli!");
          setIsAuth(true); // App.jsx dagi state ni true qilamiz
          navigate("/", { replace: true }); // home sahifaga yo'naltirish
        } else {
          alert("Parol noto‘g‘ri!");
        }
      } else {
        alert("Foydalanuvchi topilmadi!");
      }
    } catch (err) {
      console.error(err);
      alert("Xatolik: " + err.message);
    }
  };

  return (
    <section className="login">
      <h1 className="login-title">cynex</h1>
      <div className="login-form">
        <div className="login-form-inputs">
          <User />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="login-form-inputs">
          <Lock />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol"
          />
        </div>
        <p className='login-form-forgot'>Parol unutdingizmi?</p>
        <button className="login-form-in" type="button" onClick={handleLogin}>
          Kirish
          <LogIn />
        </button>
        <p className="login-form-up">
          Akkauntingiz yo‘qmi? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;