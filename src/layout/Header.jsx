import React, { useRef, useState } from 'react';
import { MenuIcon, UserCircle, X, Bell } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function Header({ onStartClick, notifications = [] }) {
  const [active, setActive] = useState("Asosiy");
  const MenuRef = useRef(null);
  const MenuBtn = useRef(null);
  const CloseBtn = useRef(null);

  const MenuClick = () => {
    if (MenuRef.current && MenuBtn.current && CloseBtn.current) {
      MenuRef.current.classList.add("active");
      MenuBtn.current.classList.add("removeBtn");
      CloseBtn.current.classList.add("addClose");
    }
  };

  const CloseMenu = () => {
    if (MenuRef.current && MenuBtn.current && CloseBtn.current) {
      MenuRef.current.classList.remove("active");
      MenuBtn.current.classList.remove("removeBtn");
      CloseBtn.current.classList.remove("addClose");
    }
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    setActive(item);
    const section = document.getElementById(item.toLowerCase());
    if (section) section.scrollIntoView({ behavior: "smooth" });
    CloseMenu();
  };

  const menuItems = ["Asosiy", "Loyihalar", "Xususiyatlari", "Biz haqimizda", "Bog'lanish"];

  // Faqat yangi kelgan xabarlar
  const newNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      <div className="cantainer">
        <div className="header-wrap">
          <div className="header-logo">
            <a href="#asosiy">cynex</a>
          </div>

          <nav className="header-nav">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`header-nav-title ${active === item ? "active" : ""}`}
                onClick={(e) => handleClick(e, item)}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Notification */}
          <div style={{ position: "relative", marginRight: 15 }} className='header-profile'>
            <Link to="/profile" state={{ activeTab: "3" }}>
              <Bell size={28} />
              {newNotificationsCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  {newNotificationsCount}
                </span>
              )}
            </Link>
            <Link to="/profile">
              <UserCircle size={32} />
            </Link>
          </div>


          <button className="header-menu-btn" ref={MenuBtn} onClick={MenuClick}>
            <MenuIcon size={32} />
          </button>

          <motion.button
            className="header-menu-close"
            ref={CloseBtn}
            onClick={CloseMenu}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <X size={32} />
          </motion.button>
        </div>

        <div className="header-menu" ref={MenuRef}>
          <nav className="header-menu-nav">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`header-menu-title ${active === item ? "active" : ""}`}
                onClick={(e) => handleClick(e, item)}
              >
                {item}
              </a>
            ))}
            <button className="header-started-menu" onClick={onStartClick}>Boshlash</button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;