import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
  const [isAuth, setIsAuth] = useState(false); // login bo‘lsa true qilamiz

  return (
      <Routes>
        {/* Login va Register ochiq sahifalar */}
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register />} />

        {/* Barcha boshqa sahifalar faqat login bo‘lganda ochiladi */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={isAuth}>
              <>
                <Header />
                <Banner />
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