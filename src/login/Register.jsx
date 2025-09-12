import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
  });
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1️⃣ Kod yuborish
  const sendCode = async () => {
    if (!formData.phone.startsWith("+")) {
      alert("Telefon raqam +998... formatida bo'lishi kerak");
      return;
    }

    const newCode = Math.floor(100000 + Math.random() * 900000); // 6 xonali
    setGeneratedCode(newCode);

    try {
      const res = await fetch("https://cynex-backend-1.onrender.com/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, code: newCode }),
      });


      const data = await res.json();
      if (data.success) alert("Kod yuborildi!");
      else alert("Xatolik: " + JSON.stringify(data.error));
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  // 2️⃣ Kodni tasdiqlash va Firebase-ga saqlash
  const verifyCode = async () => {
    if (+code !== generatedCode) {
      alert("Kod noto‘g‘ri!");
      return;
    }

    try {
      // Firebase-ga saqlash
      await setDoc(doc(db, "users", formData.username), {
        name: formData.name,
        username: formData.username,
        password: formData.password, // real loyihada hash qilinadi
        phone: formData.phone,
        createdAt: new Date(),
      });

      alert("Ro'yxatdan o'tish muvaffaqiyatli!");
      setFormData({ name: "", username: "", password: "", phone: "" });
      setCode("");
      setGeneratedCode(null);
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  return (
    <section className="register">
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="Ismingiz" value={formData.name} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Parol" value={formData.password} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="+998901234567" value={formData.phone} onChange={handleChange} required />

        {!generatedCode && (
          <button type="button" onClick={sendCode} className="register-button">Kod yuborish</button>
        )}

        {generatedCode && (
          <>
            <input type="text" placeholder="SMS kod" value={code} onChange={(e) => setCode(e.target.value)} />
            <button type="button" onClick={verifyCode} className="register-button">Ro'yxatdan o'tish</button>
          </>
        )}

        <p className="register-in">
          Hisobingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;