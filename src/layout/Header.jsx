import React, { useRef, useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { motion } from "framer-motion";

function Header({ onStartClick }) {
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

    CloseMenu(); // menu ichida bo‘lsa yopish
  };

  const menuItems = ["Asosiy", "Loyihalar", "Xususiyatlari", "Biz haqimizda", "Bog'lanish"];

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

          <button className="header-started" onClick={onStartClick}>Boshlash</button>

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