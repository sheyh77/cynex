import { Lock, LogIn, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Login({ setIsAuth, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      alert("Username va parolni to'ldiring");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, "users", username.trim());
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Foydalanuvchi topilmadi!");
        setLoading(false);
        return;
      }

      const userData = docSnap.data();

      if (!userData.active) {
        alert("Siz bloklangansiz! Admin bilan bog'laning.");
        setLoading(false);
        return;
      }

      if (userData.password !== password) {
        alert("Parol noto‘g‘ri!");
        setLoading(false);
        return;
      }

      await updateDoc(docRef, {
        lastLogin: new Date().toISOString(),
        online: true
      });

      const currentUser = {
        id: docSnap.id,
        uid: docSnap.id,
        username: userData.username,
        name: userData.name || "",
        role: userData.role || "user",
        active: userData.active
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setIsAuth(true);
      setUser(currentUser);

      alert("Login muvaffaqiyatli!");
      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
      alert("Xatolik: " + err.message);
    } finally {
      setLoading(false);
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
        <button
          className="login-form-in"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Kirish"}
          {!loading && <LogIn />}
        </button>
        <p className="login-form-up">
          Akkauntingiz yo‘qmi? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;