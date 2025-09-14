import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./layout/Header";
import Banner from "./components/Banner";
import Projects from "./components/Projects";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./login/Login";
import Register from "./login/Register";
import Start from "./pages/Start";
import Profile from "./pages/Profile";
import useFCM from "./hook/useFcmHook";

function PrivateRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [startVisible, setStartVisible] = useState(false);

  // ✅ Refreshdan keyin userni saqlash
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData && userData.active) {
          setUser(userData);
          setIsAuth(true);
        } else {
          localStorage.removeItem("currentUser");
        }
      }
    } catch (err) {
      console.error("localStorage parsing error:", err);
      localStorage.removeItem("currentUser");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuth(false);
    setUser(null);
  };

  // FCM hook
  useFCM(user);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register setIsAuth={setIsAuth} setUser={setUser} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={isAuth}>
              <>
                <Header onStartClick={() => setStartVisible(true)} currentUser={user} />
                <Banner onStartClick={() => setStartVisible(true)} currentUser={user} />
                <Projects />
                <Features />
                <About />
                <Contact />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Profile currentUser={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
      </Routes>

      {startVisible && (
        <Start visible={startVisible} setVisible={setStartVisible} currentUser={user} />
      )}
    </>
  );
}

export default App;