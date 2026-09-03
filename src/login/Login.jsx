import {
  Lock,
  LogIn,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Login({ setIsAuth, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  // LocalStorage'dan foydalanuvchini o'qish
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
      navigate("/", { replace: true });
    }
  }, [navigate, setUser, setIsAuth]);

  const handleLogin = async () => {
    const cleanEmail = email.trim();

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

      // Firestore'dan user ma'lumotlarini olish
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

      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );

      setUser(currentUser);
      setIsAuth(true);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("FIREBASE LOGIN ERROR:", err);

      if (err.code === "auth/invalid-email") {
        alert("Email formati noto‘g‘ri!");
      } else if (err.code === "auth/user-not-found") {
        alert("Bunday foydalanuvchi mavjud emas!");
      } else if (err.code === "auth/wrong-password") {
        alert("Parol noto‘g‘ri!");
      } else if (err.code === "auth/invalid-credential") {
        alert("Email yoki parol noto‘g‘ri!");
      } else {
        alert("Login xatoligi: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <main className="login-page">
      {/* Background decorations */}
      <div className="login-bg">
        <div className="login-orb login-orb-1"></div>
        <div className="login-orb login-orb-2"></div>
        <div className="login-orb login-orb-3"></div>

        <div className="login-grid"></div>
      </div>

      {/* Back to home */}
      <Link to="/" className="login-back">
        <ArrowLeft size={17} />
        <span>Bosh sahifaga</span>
      </Link>

      {/* Login Card */}
      <section className="login-card">
        {/* Logo */}
        <div className="login-brand">
          <div className="login-logo">
            <span>&lt;</span>
            <span>/</span>
            <span>&gt;</span>
          </div>

          <div>
            <div className="login-brand-name">CYNEX</div>
            <div className="login-brand-subtitle">
              IT SOLUTIONS
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="login-header">
          <div className="login-badge">
            <ShieldCheck size={15} />
            <span>Secure access</span>
          </div>

          <h1>Welcome back</h1>

          <p>
            Hisobingizga kiring va CYNEX platformasidan
            foydalanishni davom ettiring.
          </p>
        </div>

        {/* Form */}
        <div className="login-form">
          {/* Email */}
          <div className="login-field">
            <label htmlFor="email">
              Email address
            </label>

            <div className="login-input-wrapper">
              <User size={19} />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="your@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <div className="login-password-label">
              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert(
                    "Parolni tiklash funksiyasi tez orada qo‘shiladi."
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="login-input-wrapper">
              <Lock size={19} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            className="login-submit"
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Kirish</span>
                <LogIn size={19} />
              </>
            )}
          </button>
        </div>

        {/* Register */}
        <div className="login-register">
          <span>Akkauntingiz yo‘qmi?</span>

          <Link to="/register">
            Register
            <span>→</span>
          </Link>
        </div>

        {/* Security */}
        <div className="login-security">
          <ShieldCheck size={16} />

          <span>
            Your information is protected with secure
            authentication
          </span>
        </div>
      </section>

      {/* Bottom copyright */}
      <div className="login-copyright">
        © 2026 CYNEX IT SOLUTIONS
      </div>
    </main>
  );
}

export default Login;