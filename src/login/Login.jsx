import { Lock, LogIn, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Login({ setIsAuth, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // Refreshdan keyin localStoragedagi userni o'qish
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
      navigate("/", { replace: true });
    }
  }, [navigate, setUser, setIsAuth]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert("Email va parolni to'ldiring");
      return;
    }

    setLoading(true);

    try {
      // 1. Firebase Auth orqali login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const uid = userCredential.user.uid;

      // 2. Firestore dan qo'shimcha user ma'lumotlarini olish
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Foydalanuvchi ma'lumotlari topilmadi!");
        setLoading(false);
        return;
      }

      const userData = docSnap.data();

      if (!userData.active) {
        alert("Siz bloklangansiz! Admin bilan bog'laning.");
        setLoading(false);
        return;
      }

      // lastLogin va online holatni yangilash
      await updateDoc(docRef, {
        lastLogin: new Date().toISOString(),
        online: true
      });

      const currentUser = {
        uid: uid,
        email: userCredential.user.email,
        username: userData.username,
        name: userData.name || "",
        role: userData.role || "user",
        active: userData.active,
      };

      // localStorage ga saqlash (refreshdan keyin ham ishlaydi)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setUser(currentUser);
      setIsAuth(true);

      alert("Login muvaffaqiyatli!");
      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
      alert("Login xatoligi: " + err.message);
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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