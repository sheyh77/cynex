import {
  User,
  AtSign,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ setIsAuth, setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const { name, username, email, password } = formData;

    if (!name || !username || !email || !password) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      // Firebase Auth
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        email,
        uid: user.uid,
        role: "user",
        active: true,
        createdAt: new Date().toISOString(),
      });

      const currentUser = {
        uid: user.uid,
        name,
        username,
        email,
        role: "user",
        active: true,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );

      setIsAuth(true);
      setUser(currentUser);

      alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");

      navigate("/", {
        replace: true,
      });
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      if (err.code === "auth/email-already-in-use") {
        alert("Bu email allaqachon ro‘yxatdan o‘tgan!");
      } else if (err.code === "auth/invalid-email") {
        alert("Email formati noto‘g‘ri!");
      } else if (err.code === "auth/weak-password") {
        alert("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!");
      } else {
        alert("Xatolik: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleRegister();
    }
  };

  return (
    <main className="register-page">

      {/* ================================
          BACKGROUND
      ================================= */}

      <div className="register-bg">

        <div className="register-grid"></div>

        <div className="register-orb register-orb-1"></div>
        <div className="register-orb register-orb-2"></div>
        <div className="register-orb register-orb-3"></div>

      </div>


      {/* ================================
          BACK TO HOME
      ================================= */}

      <Link
        to="/"
        className="register-back"
      >
        <ArrowLeft size={17} />
        <span>Bosh sahifaga</span>
      </Link>


      {/* ================================
          REGISTER CARD
      ================================= */}

      <section className="register-card">

        {/* Logo */}

        <div className="register-brand">

          <div className="register-logo">
            <span>&lt;</span>
            <span>/</span>
            <span>&gt;</span>
          </div>

          <div>

            <div className="register-brand-name">
              CYNEX
            </div>

            <div className="register-brand-subtitle">
              IT SOLUTIONS
            </div>

          </div>

        </div>


        {/* Header */}

        <div className="register-header">

          <div className="register-badge">
            <UserPlus size={15} />
            <span>Create your account</span>
          </div>

          <h1>
            Create account
          </h1>

          <p>
            CYNEX platformasidan foydalanish uchun
            yangi hisob yarating.
          </p>

        </div>


        {/* ================================
            FORM
        ================================= */}

        <div className="register-form">

          {/* NAME */}

          <div className="register-field">

            <label htmlFor="name">
              Full name
            </label>

            <div className="register-input-wrapper">

              <User size={19} />

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ismingiz"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="name"
              />

            </div>

          </div>


          {/* USERNAME */}

          <div className="register-field">

            <label htmlFor="username">
              Username
            </label>

            <div className="register-input-wrapper">

              <AtSign size={19} />

              <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="username"
              />

            </div>

          </div>


          {/* EMAIL */}

          <div className="register-field">

            <label htmlFor="email">
              Email address
            </label>

            <div className="register-input-wrapper">

              <Mail size={19} />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@example.com"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="register-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="register-input-wrapper">

              <Lock size={19} />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            <div className="register-password-hint">
              Minimum 6 characters
            </div>

          </div>


          {/* REGISTER BUTTON */}

          <button
            type="button"
            className="register-submit"
            onClick={handleRegister}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="register-spinner"></span>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>
                  Ro‘yxatdan o‘tish
                </span>

                <UserPlus size={19} />
              </>
            )}

          </button>

        </div>


        {/* LOGIN */}

        <div className="register-login">

          <span>
            Hisobingiz bormi?
          </span>

          <Link to="/login">
            Kirish
            <span>→</span>
          </Link>

        </div>


        {/* SECURITY */}

        <div className="register-security">

          <ShieldCheck size={16} />

          <span>
            Your information is protected with secure
            authentication
          </span>

        </div>

      </section>


      {/* COPYRIGHT */}

      <div className="register-copyright">
        © 2026 CYNEX IT SOLUTIONS
      </div>

    </main>
  );
}