import React, { useState } from "react";
import {
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import BannerImg from "/images/banner-img.png";
import Start from "../pages/Start";
import Detail from "../pages/Detail";

function Banner({ currentUser }) {
  const { t } = useTranslation();

  const [isStartVisible, setIsStartVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  return (
    <section id="asosiy" className="banner">
      {/* Background decorations */}
      <div className="banner-bg-grid"></div>

      <div className="banner-glow banner-glow-1"></div>
      <div className="banner-glow banner-glow-2"></div>

      <div className="container">
        <div className="banner-wrap">
          {/* LEFT CONTENT */}
          <div className="banner-content">
            <div className="banner-badge">
              <span className="banner-badge-dot"></span>
              <Sparkles size={15} />
              <span>{t("hero.smallTitle")}</span>
            </div>

            <h1 className="banner-title">
              {t("hero.title")}
            </h1>

            <p className="banner-desc">
              {t("hero.description")}
            </p>

            {/* Features */}
            <div className="banner-features">
              <div className="banner-feature">
                <CheckCircle2 size={17} />
                <span>{t("hero.fast")}</span>
              </div>

              <div className="banner-feature">
                <CheckCircle2 size={17} />
                <span>{t("hero.modern")}</span>
              </div>

              <div className="banner-feature">
                <CheckCircle2 size={17} />
                <span>{t("hero.support")}</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="banner-buttons">
              <button
                className="banner-primary"
                onClick={() => setIsStartVisible(true)}
              >
                <span>{t("hero.start")}</span>
                <ArrowRight size={19} />
              </button>

              <button
                className="banner-secondary"
                onClick={() => setIsDetailVisible(true)}
              >
                <span className="banner-play">
                  <Play size={14} fill="currentColor" />
                </span>

                <span>{t("hero.details")}</span>
              </button>
            </div>

            {/* Small trust info */}
            <div className="banner-trust">
              <div className="banner-trust-icon">
                <Zap size={17} />
              </div>

              <div>
                <strong>{t("hero.innovative")}</strong>
                <span>{t("hero.innovative")}</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="banner-visual">
            <div className="banner-visual-glow"></div>

            <div className="banner-image-card">
              <div className="banner-image-top">
                <div className="banner-window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="banner-window-label">
                  <span></span>
                  CYNEX PLATFORM
                </div>
              </div>

              <div className="banner-image">
                <img
                  src={BannerImg}
                  alt="CYNEX platform"
                />
              </div>
            </div>

            {/* Floating cards */}
            <div className="banner-floating-card banner-floating-card-1">
              <div className="floating-icon">
                <Zap size={18} />
              </div>

              <div>
                <span>{t("hero.performance")}</span>
                <strong>+87%</strong>
              </div>
            </div>

            <div className="banner-floating-card banner-floating-card-2">
              <div className="floating-status"></div>
              <div>
                <strong>{t("common.systemOnline")}</strong>
                <span>{t("hero.system")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Start
        visible={isStartVisible}
        setVisible={setIsStartVisible}
        currentUser={currentUser}
      />

      <Detail
        visible={isDetailVisible}
        setVisible={setIsDetailVisible}
      />
    </section>
  );
}

export default Banner;