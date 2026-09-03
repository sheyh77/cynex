import {
  ArrowUpRight,
  CheckCircle2,
  CircleCheck,
  Clock,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import Logo from "/images/cynexLogo.png";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  const aboutItems = [
    {
      icon: Users,
      number: "01",
      title: t("about.experienced"),
      desc: t("about.experiencedDesc"),
    },
    {
      icon: CircleCheck,
      number: "02",
      title: t("about.reliable"),
      desc: t("about.reliableDesc"),
    },
    {
      icon: Clock,
      number: "03",
      title: t("about.fastQuality"),
      desc: t("about.fastQualityDesc"),
    },
  ];

  return (
    <section className="about" id="biz haqimizda">
      <div className="about-bg-grid" />
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />

      <div className="cantainer">
        <div className="about-wrap">

          {/* LEFT */}
          <div className="about-left">
            <div className="about-label">
              <Sparkles size={15} />
              <span>{t("about.label")}</span>
            </div>

            <div className="about-visual">

              <div className="about-visual-grid" />

              <div className="about-logo-orbit orbit-1" />
              <div className="about-logo-orbit orbit-2" />

              <div className="about-logo-card">
                <div className="about-logo-glow" />

                <img src={Logo} alt="CYNEX" />

                <div className="about-logo-status">
                  <span className="status-dot" />
                  <span>{t("common.systemOnline")}</span>
                </div>
              </div>

              <div className="about-floating-card about-floating-card-top">
                <div className="floating-icon">
                  <Zap size={18} />
                </div>
                <div>
                  <span>{t("about.performance")}</span>
                  <strong>+98%</strong>
                </div>
              </div>

              <div className="about-floating-card about-floating-card-bottom">
                <CheckCircle2 size={18} />
                <div>
                  <span>{t("about.quality")}</span>
                  <strong>{t("common.premium")}</strong>
                </div>
              </div>

              <div className="about-visual-number">
                <span>2026</span>
                <small>
                  {t("about.future")}
                  <br />
                  {t("about.technology")}
                </small>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-right-desc">

            <div className="about-title-wrap">
              <span className="about-title-small">
                CYNEX IT SOLUTIONS
              </span>

              <h1 className="about-title">
                {t("about.titlePart1")}{" "}
                <span>{t("about.titleHighlight")}</span>
              </h1>
            </div>

            <p className="about-right-desc-sub">
              {t("about.description")}
            </p>

            <div className="about-line" />

            <div className="about-items">
              {aboutItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="about-right-desc-item" key={item.number}>

                    <div className="about-item-number">
                      {item.number}
                    </div>

                    <div className="about-item-icon-wrap">
                      <Icon
                        className="about-item-icon"
                        size={24}
                      />
                    </div>

                    <div className="about-item-subtitle">
                      <p className="about-item-subtitle-title">
                        {item.title}
                      </p>

                      <p className="about-item-subtitle-desc">
                        {item.desc}
                      </p>
                    </div>

                    <ArrowUpRight
                      className="about-item-arrow"
                      size={20}
                    />
                  </div>
                );
              })}
            </div>

            <div className="about-bottom">
              <div className="about-bottom-stat">
                <strong>100%</strong>
                <span>{t("about.customerFocus")}</span>
              </div>

              <div className="about-bottom-stat">
                <strong>24/7</strong>
                <span>{t("common.support")}</span>
              </div>

              <div className="about-bottom-stat">
                <strong>∞</strong>
                <span>{t("about.opportunities")}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;