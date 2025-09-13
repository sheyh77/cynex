import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./layout/Header";
import Projects from "./components/Projects";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";
import Banner from "./components/Banner";
import Login from "./login/Login";
import Register from "./login/Register";

// Protected Route Component
function PrivateRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isAuth, setIsAuth] = useState(false); // login bo‘lsa true
  const [currentUser, setCurrentUser] = useState(null); // foydalanuvchi ma’lumotlari
  const [startVisible, setStartVisible] = useState(false); // Start modal uchun

  // App ochilganda localStorage orqali foydalanuvchini tiklash
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuth(true);
    }
  }, []);

  return (
    <Routes>
      {/* Login va Register sahifalari */}
      <Route
        path="/login"
        element={<Login setIsAuth={setIsAuth} setCurrentUser={setCurrentUser} />}
      />
      <Route
        path="/register"
        element={<Register setIsAuth={setIsAuth} setCurrentUser={setCurrentUser} />}
      />

      {/* Protected Home sahifalar */}
      <Route
        path="/"
        element={
          <PrivateRoute isAuth={isAuth}>
            <>
              <Header currentUser={currentUser} onStartClick={() => setStartVisible(true)} />
              <Banner onStartClick={() => setStartVisible(true)} />
              <Projects />
              <Features />
              <About />
              <Contact />
            </>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;