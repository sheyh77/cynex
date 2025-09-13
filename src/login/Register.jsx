import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setIsAuth, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "username") setUsernameError(false);
  };

  const registerUser = async () => {
    if (!formData.username.trim() || !formData.password || !formData.name.trim()) return;

    try {
      const userRef = doc(db, "users", formData.username.trim());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUsernameError(true);
        return;
      }

      const newUser = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        password: formData.password,
        createdAt: new Date().toISOString(),
        active: true,  // foydalanuvchi faol bo'lsin
        role: "user"   // default rol
      };

      await setDoc(userRef, newUser);

      // Avtomatik login qilish
      const currentUser = { username: newUser.username, role: newUser.role, id: userRef.id };
      setIsAuth(true);
      setCurrentUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      setFormData({ name: "", username: "", password: "" });
      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="register">
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <h1 className="register-title">cynex</h1>

        <input
          type="text"
          name="name"
          placeholder="Ismingiz"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={usernameError ? "error" : ""}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Parol"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="button" onClick={registerUser} className="register-button">
          Ro'yxatdan o'tish
        </button>

        <p className="register-in">
          Hisobingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;