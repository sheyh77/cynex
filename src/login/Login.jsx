import { Lock, LogIn, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Login({ setIsAuth, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Sahifa ochilganda, localStorage orqali login holatini tekshirish
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsAuth(true);
      setCurrentUser(JSON.parse(storedUser));
      navigate("/", { replace: true });
    }
  }, []);

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

        // Agar foydalanuvchi bloklangan bo'lsa
        if (!userData.active) {
          alert("Siz bloklangansiz! Admin bilan bog'laning.");
          return;
        }

        if (userData.password === password) {
          // Last login va online statusni yangilash
          await updateDoc(docRef, {
            lastLogin: new Date().toISOString(),
            online: true
          });

          // IsAuth state ni yangilash
          setIsAuth(true);

          const currentUser = { username: username.trim(), role: userData.role || "user", id: docSnap.id };
          setCurrentUser(currentUser);

          // localStorage ga saqlash (refreshda ham saqlansin)
          localStorage.setItem("currentUser", JSON.stringify(currentUser));

          alert("Login muvaffaqiyatli!");
          navigate("/", { replace: true });
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