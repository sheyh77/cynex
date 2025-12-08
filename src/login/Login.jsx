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

  // LocalStoragedan foydalanuvchini o‘qish
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
      navigate("/", { replace: true });
    }
  }, []);

  const handleLogin = async () => {
    const cleanEmail = email.trim();

    console.log("EMAIL:", cleanEmail); // 🔥 Debug uchun

    if (!cleanEmail || !password) {
      alert("Email va parolni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      // Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      const uid = userCredential.user.uid;

      // Firestore dan user ma'lumotlarini olish
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Foydalanuvchi topilmadi!");
        return;
      }

      const userData = docSnap.data();

      if (!userData.active) {
        alert("Siz bloklangansiz!");
        return;
      }

      // Login vaqtini update qilish
      await updateDoc(docRef, {
        lastLogin: new Date().toISOString(),
        online: true,
      });

      const currentUser = {
        uid,
        email: userCredential.user.email,
        username: userData.username,
        name: userData.name || "",
        role: userData.role || "user",
        active: userData.active,
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setUser(currentUser);
      setIsAuth(true);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("FIREBASE LOGIN ERROR:", err);

      if (err.code === "auth/invalid-email") {
        alert("Email formati noto‘g‘ri! Masalan: example@gmail.com");
      } else if (err.code === "auth/user-not-found") {
        alert("Bunday foydalanuvchi mavjud emas!");
      } else if (err.code === "auth/wrong-password") {
        alert("Parol noto‘g‘ri!");
      } else {
        alert("Login xatoligi: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <h1 className="login-title">cynex Login</h1>
      <div className="login-form">

        <label htmlFor="">Email</label>
        <div className="login-form-inputs">
          <User />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
          />
        </div>

        <label htmlFor="">Password</label>
        <div className="login-form-inputs">
          <Lock />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
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
