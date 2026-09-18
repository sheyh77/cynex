import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect, useRef } from "react";

import Header from "./layout/Header";
import Banner from "./components/Banner";
import useFCM from "./hook/useFcmHook";

const Projects = lazy(() => import("./components/Projects"));
const DynamicContent = lazy(() => import("./components/DynamicContent"));
const Features = lazy(() => import("./components/Features"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Login = lazy(() => import("./login/Login"));
const Register = lazy(() => import("./login/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const Profile = lazy(() => import("./pages/Profile"));
const Start = lazy(() => import("./pages/Start"));

const getStoredActiveUser = () => {
  try {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) return null;

    const userData = JSON.parse(storedUser);
    return userData?.active ? userData : null;
  } catch (err) {
    console.error("localStorage parsing error:", err);
    localStorage.removeItem("currentUser");
    return null;
  }
};

const PageLoader = () => <div className="page-loader" aria-label="Loading" />;

function App() {
  const [user, setUser] = useState(() => getStoredActiveUser());
  const [isAuth, setIsAuth] = useState(() => Boolean(getStoredActiveUser()));
  const [startVisible, setStartVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationsReadyRef = useRef(false);
  const notificationAudioRef = useRef(null);

  useEffect(() => {
    notificationAudioRef.current = new Audio("/sounds/notification.mp3");

    const unlockAudio = () => {
      const audio = notificationAudioRef.current;
      if (!audio) return;

      audio.volume = 0;
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
        })
        .catch(() => {
          audio.volume = 1;
        });

      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("pointerdown", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    const storedUser = getStoredActiveUser();

    if (storedUser) {
      setUser(storedUser);
      setIsAuth(true);
    } else {
      setUser(null);
      setIsAuth(false);
    }
  }, []);

  // ❗ ASOSIY O‘ZGARISH: Endi faqat /profile ga kirganda chek qilinadi
  const PrivateRoute = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" replace />;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuth(false);
    setUser(null);
  };

  // Firestore monitoring
  useEffect(() => {
    if (!user?.uid) return undefined;

    let unsubscribe;
    let cancelled = false;

    const subscribeToUser = async () => {
      const [{ doc, onSnapshot }, { db }] = await Promise.all([
        import("firebase/firestore"),
        import("../firebaseConfig.js"),
      ]);

      if (cancelled) return;

      unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (!docSnap.exists() || !docSnap.data()?.active) {
          localStorage.removeItem("currentUser");
          setUser(null);
          setIsAuth(false);
          alert("Siz bloklangansiz yoki o‘chirildingiz!");
          return;
        }

        const latestUser = {
          ...user,
          ...docSnap.data(),
          uid: user.uid,
          active: true,
        };

        localStorage.setItem("currentUser", JSON.stringify(latestUser));
        setUser(latestUser);
        setIsAuth(true);
      });
    };

    subscribeToUser();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) {
      setNotifications([]);
      notificationsReadyRef.current = false;
      return undefined;
    }

    let unsubscribe;
    let cancelled = false;

    const subscribeToNotifications = async () => {
      const [{ collection, onSnapshot, orderBy, query }, { db }] = await Promise.all([
        import("firebase/firestore"),
        import("../firebaseConfig.js"),
      ]);

      if (cancelled) return;

      const notificationsQuery = query(
        collection(db, "notifications"),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
        const nextNotifications = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data(),
          }))
          .filter((item) => item.userId === "all" || item.userId === user.uid);

        setNotifications((currentNotifications) => {
          if (notificationsReadyRef.current) {
            const currentIds = new Set(currentNotifications.map((item) => item.id));
            const hasNewNotification = nextNotifications.some(
              (item) => !currentIds.has(item.id)
            );

            if (hasNewNotification) {
              const audio = notificationAudioRef.current;
              if (audio) {
                audio.currentTime = 0;
                audio.play().catch(() => {});
              }
            }
          }

          return nextNotifications;
        });

        notificationsReadyRef.current = true;
      });
    };

    subscribeToNotifications();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [user?.uid]);

  useFCM(user);

  return (
    <>
      <Routes>
        {/* Login & Register */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <Login setIsAuth={setIsAuth} setUser={setUser} />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<PageLoader />}>
              <Register setIsAuth={setIsAuth} setUser={setUser} />
            </Suspense>
          }
        />

        {/* 👇 ENDILIKDA asosiy sahifa hamma uchun ochiq */}
        <Route
          path="/"
          element={
            <>
              <Header
                onStartClick={() => setStartVisible(true)}
                currentUser={user}
                notifications={notifications}
              />
              <Banner onStartClick={() => setStartVisible(true)} currentUser={user} />
              <Suspense fallback={<PageLoader />}>
                <Projects />
                <DynamicContent />
                <Features />
                <About />
                <Contact />
              </Suspense>
            </>
          }
        />

        {/* 👇 faqat Profile sahifasi himoyalangan */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<PageLoader />}>
                <Profile
                  currentUser={user}
                  onLogout={handleLogout}
                  notifications={notifications}
                />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Suspense fallback={<PageLoader />}>
                <Admin currentUser={user} />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>

      {startVisible && (
        <Suspense fallback={null}>
          <Start visible={startVisible} setVisible={setStartVisible} currentUser={user} />
        </Suspense>
      )}
    </>
  );
}


export default App;