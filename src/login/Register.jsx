// src/pages/Register.jsx
import React, { useState } from "react";
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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, username, email, password } = formData;

    if (!name || !username || !email || !password) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      // Firebase Auth - ro'yxatdan o'tkazish
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Firestore - foydalanuvchini saqlash
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

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setIsAuth(true);
      setUser(currentUser);

      alert("Ro'yxatdan o'tish muvaffaqiyatli!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Xatolik: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register">
      <h2 className="register-title">Ro‘yxatdan o‘tish</h2>
      <div className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Ismingiz"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Parol"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="register-button"
        >
          {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        <p className="register-in">
          Hisobingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </div>
    </section>
  );
}
