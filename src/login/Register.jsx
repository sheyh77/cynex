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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "username") setUsernameError(false);
  };

  const registerUser = async () => {
    const name = formData.name.trim();
    const username = formData.username.trim();
    const password = formData.password;

    if (!name || !username || !password) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUsernameError(true);
        setLoading(false);
        return;
      }

      const newUser = {
        name,
        username,
        password,
        createdAt: new Date().toISOString(),
        active: true,
        role: "user",
        lastLogin: new Date().toISOString(),
        online: true
      };

      await setDoc(userRef, newUser);

      const currentUser = { username: newUser.username, role: newUser.role, id: userRef.id };
      setIsAuth(true);
      setCurrentUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      alert("Ro'yxatdan o'tish muvaffaqiyatli!");      

      setFormData({ name: "", username: "", password: "" });
      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi: " + err.message);
    } finally {
      setLoading(false);
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
        {usernameError && <p style={{ color: "red" }}>Username mavjud!</p>}

        <input
          type="password"
          name="password"
          placeholder="Parol"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={registerUser}
          className="register-button"
          disabled={loading}
        >
          {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        <p className="register-in">
          Hisobingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;