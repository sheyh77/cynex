import React, { useRef, useState } from "react";
import {
  MenuIcon,
  UserCircle,
  X,
  Bell,
  Sparkles,
  ArrowUpRight,
  Languages,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header({ onStartClick, notifications = [] }) {
  const { t, i18n } = useTranslation();

  const [active, setActive] = useState("home");

  const MenuRef = useRef(null);
  const MenuBtn = useRef(null);
  const CloseBtn = useRef(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const MenuClick = () => {
    MenuRef.current?.classList.add("active");
    MenuBtn.current?.classList.add("removeBtn");
    CloseBtn.current?.classList.add("addClose");
  };

  const CloseMenu = () => {
    MenuRef.current?.classList.remove("active");
    MenuBtn.current?.classList.remove("removeBtn");
    CloseBtn.current?.classList.remove("addClose");
  };

  const handleClick = (e, item) => {
    e.preventDefault();

    setActive(item.key);

    const section = document.getElementById(item.id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    CloseMenu();
  };

  const menuItems = [
    {
      key: "home",
      label: t("nav.home"),
      id: "asosiy",
    },
    {
      key: "projects",
      label: t("nav.projects"),
      id: "loyihalar",
    },
    {
      key: "features",
      label: t("nav.features"),
      id: "xususiyatlari",
    },
    {
      key: "about",
      label: t("nav.about"),
      id: "biz haqimizda",
    },
    {
      key: "contact",
      label: t("nav.contact"),
      id: "bog'lanish",
    },
  ];

  const newNotificationsCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <header className="header">
      <div className="header-glow header-glow-one" />
      <div className="header-glow header-glow-two" />

      <div className="container">
        <div className="header-wrap">

          {/* LOGO */}
          <Link to="/" className="header-logo">
            <div className="header-logo-icon">
              <Sparkles size={17} />
            </div>

            <div className="header-logo-content">
              <span className="header-logo-main">
                CYNEX
              </span>

              <span className="header-logo-sub">
                IT SOLUTIONS
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="header-nav">
            {menuItems.map((item, index) => (
              <a
                key={item.key}
                href={`#${item.id}`}
                className={`header-nav-title ${
                  active === item.key ? "active" : ""
                }`}
                onClick={(e) => handleClick(e, item)}
              >
                <span className="header-nav-number">
                  0{index + 1}
                </span>

                <span>{item.label}</span>

                {active === item.key && (
                  <motion.span
                    className="header-nav-dot"
                    layoutId="headerActiveDot"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* LANGUAGE */}
          <div className="language-switcher">
            <Languages size={15} />

            {["uz", "ru", "en"].map((lang) => (
              <button
                key={lang}
                type="button"
                className={
                  i18n.language?.toLowerCase().startsWith(lang)
                    ? "active"
                    : ""
                }
                onClick={() => changeLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="header-actions">

            {/* NOTIFICATION */}
            <Link
              to="/profile"
              state={{ activeTab: "3" }}
              className="header-action-btn notification-btn"
              aria-label={t("nav.contact")}
            >
              <Bell size={20} />

              {newNotificationsCount > 0 && (
                <motion.span
                  className="notification-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {newNotificationsCount > 99
                    ? "99+"
                    : newNotificationsCount}
                </motion.span>
              )}
            </Link>

            {/* PROFILE */}
            <Link
              to="/profile"
              className="header-profile-btn"
              aria-label={t("nav.profile")}
            >
              <UserCircle size={21} />

              <span className="header-profile-text">
                {t("nav.profile")}
              </span>

              <ArrowUpRight
                className="header-profile-arrow"
                size={15}
              />
            </Link>
          </div>

          {/* MOBILE OPEN */}
          <button
            type="button"
            className="header-menu-btn"
            ref={MenuBtn}
            onClick={MenuClick}
            aria-label="Open menu"
          >
            <MenuIcon size={27} />
          </button>

          {/* MOBILE CLOSE */}
          <motion.button
            type="button"
            className="header-menu-close"
            ref={CloseBtn}
            onClick={CloseMenu}
            aria-label="Close menu"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={27} />
          </motion.button>
        </div>

        {/* MOBILE MENU */}
        <div className="header-menu" ref={MenuRef}>
          <div className="header-menu-inner">

            <div className="header-menu-top">
              <span>{t("common.menu")}</span>

              <div className="header-menu-status">
                <span />
                {t("common.systemOnline")}
              </div>
            </div>

            <nav className="header-menu-nav">
              {menuItems.map((item, index) => (
                <a
                  key={item.key}
                  href={`#${item.id}`}
                  className={`header-menu-title ${
                    active === item.key ? "active" : ""
                  }`}
                  onClick={(e) => handleClick(e, item)}
                >
                  <span className="header-menu-number">
                    0{index + 1}
                  </span>

                  <span>{item.label}</span>

                  <ArrowUpRight size={18} />
                </a>
              ))}

              <button
                type="button"
                className="header-started-menu"
                onClick={() => {
                  CloseMenu();
                  onStartClick?.();
                }}
              >
                <span>{t("nav.start")}</span>
                <ArrowUpRight size={20} />
              </button>
            </nav>

            <div className="header-menu-bottom">
              <span>CYNEX IT SOLUTIONS</span>
              <span>{t("common.year")}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;