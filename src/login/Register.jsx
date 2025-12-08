// src/pages/Register.jsx
import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ setIsAuth, setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      // Firebase Auth orqali foydalanuvchi yaratish
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore-ga qo‘shimcha ma’lumot saqlash
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
        role: "user",
        active: true,
        createdAt: new Date().toISOString(),
      });

      const currentUser = {
        uid: user.uid,
        name,
        email,
        role: "user",
        active: true,
      };

      // LocalStorage ga saqlash
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
    <div className="register-container">
      <h2>Ro‘yxatdan o‘tish</h2>
      <input
        type="text"
        name="name"
        placeholder="Ismingiz"
        value={formData.name}
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
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
      </button>
      <p>
        Hisobingiz bormi? <Link to="/login">Kirish</Link>
      </p>
    </div>
  );
}