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
import Start from "./pages/Start"; // bu yerda Start modal

function PrivateRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [startVisible, setStartVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/register"
          element={<Register setIsAuth={setIsAuth} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={isAuth}>
              <>
                <Header onStartClick={() => setStartVisible(true)} currentUser={currentUser} />
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

      {startVisible && (
        <Start
          visible={startVisible}
          setVisible={setStartVisible}
          currentUser={currentUser}
        />
      )}
    </>
  );
}

export default App;