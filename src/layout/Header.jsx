import React, { useRef, useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { motion } from "framer-motion"; 

function Header() {
  const [active, setActive] = useState("Home");
  const MenuRef = useRef(".header-menu");
  const MenuBtn = useRef(".header-menu-btn");
  const CloseBtn = useRef(".header-menu-close");

  function MenuClick() {
    MenuRef.current.classList.add("active")
    MenuBtn.current.classList.add("removeBtn")
    CloseBtn.current.classList.add("addClose");
  }

  function CloseMenu() {
    MenuRef.current.classList.remove("active")
    MenuBtn.current.classList.remove("removeBtn")
    CloseBtn.current.classList.remove("addClose")
  }

  const handleClick = (e, item) => {
    e.preventDefault();
    setActive(item);

    const section = document.getElementById(item.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="cantainer">
        <div className="header-wrap">
          <div className="header-logo">
            <a href='asosiy'>cynex</a >
          </div>
          <nav className="header-nav">
            {["Asosiy", "Loyihalar", "Xususiyatlari", "Biz haqimizda", "Bog'lanish"].map((item) => (
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
          <button className="header-started">Boshlash</button>
          <button className="header-menu-btn" ref={MenuBtn} onClick={MenuClick}>
            <MenuIcon size={32} />
          </button>
          <motion.button
            className="header-menu-close"
            ref={CloseBtn}
            animate={{ rotate: 360 }}   // 360° aylanish
            transition={{
              repeat: Infinity,         // cheksiz takrorlansin
              duration: 2,              // 2 sekundda bir marta
              ease: "linear",           // tekis tezlikda
            }}
            onClick={CloseMenu}
          >
            <X size={32} />
          </motion.button>
        </div>
        <div className="header-menu" ref={MenuRef}>
          <nav className="header-menu-nav">
            {["Asosiy", "Loyihalar", "Xususiyatlari", "Biz haqimizda", "Bog'lanish"].map((item) => (
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
        </div>
      </div>
    </header>
  );
}

export default Header;