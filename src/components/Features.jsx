import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  LayoutDashboard,
  Monitor,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import FeaturesImg from "/images/banner-img.png";
import { useTranslation } from "react-i18next";

function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: LayoutDashboard,
      title: t("features.admin"),
      text: t("features.adminDescription"),
      number: "01",
    },
    {
      icon: Monitor,
      title: t("features.website"),
      text: t("features.websiteDescription"),
      number: "02",
    },
  ];

  return (
    <section id="xususiyatlari" className="features">
      {/* Background */}
      <div className="features-bg-grid"></div>

      <div className="features-glow features-glow-1"></div>
      <div className="features-glow features-glow-2"></div>

      <div className="container">
        <div className="features-wrap">

          {/* HEADER */}
          <div className="features-header">
            <div className="features-label">
              <Sparkles size={15} />
              <span>{t("features.label")}</span>
            </div>

            <h2 className="features-title">
              {t("features.titlePart1")}
              <span> {t("features.titleHighlight")}</span>
            </h2>

            <p className="features-subtitle">
              {t("features.subtitle")}
            </p>
          </div>

          {/* MAIN */}
          <div className="features-main">

            {/* LEFT */}
            <div className="features-about">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    className="features-about-desc-item"
                    key={feature.number}
                  >
                    <div className="features-item-top">
                      <div className="features-item-icon">
                        <Icon size={20} />
                      </div>

                      <span className="features-item-number">
                        {feature.number}
                      </span>
                    </div>

                    <h3 className="features-item-title">
                      {feature.title}
                    </h3>

                    <p className="features-item-sub">
                      {feature.text}
                    </p>

                    <div className="features-item-bottom">
                      <CheckCircle2 size={15} />
                      <span>{t("features.professional")}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT IMAGE */}
            <div className="features-visual">

              <div className="features-visual-glow"></div>

              <div className="features-image-card">

                {/* Browser top */}
                <div className="features-browser-top">
                  <div className="features-browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="features-browser-address">
                    <span></span>
                    CYNEX DASHBOARD
                  </div>

                  <div className="features-browser-icon">
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                {/* Image */}
                <div className="features-about-img">
                  <img
                    src={FeaturesImg}
                    alt="CYNEX admin panel"
                  />

                  <div className="features-image-overlay"></div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="features-floating features-floating-1">
                <div className="features-floating-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>{t("features.secure")}</strong>
                  <span>{t("features.secureDescription")}</span>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="features-floating features-floating-2">
                <div className="features-floating-icon">
                  <Zap size={18} />
                </div>

                <div>
                  <strong>{t("features.fast")}</strong>
                  <span>{t("features.fastDescription")}</span>
                </div>
              </div>

              {/* Bottom badge */}
              <div className="features-code-badge">
                <Code2 size={15} />
                <span>{t("features.modernTechnology")}</span>
              </div>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="features-bottom">
            <div className="features-bottom-item">
              <strong>100%</strong>
              <span>{t("common.responsive")}</span>
            </div>

            <div className="features-bottom-line"></div>

            <div className="features-bottom-item">
              <strong>24/7</strong>
              <span>{t("common.support")}</span>
            </div>

            <div className="features-bottom-line"></div>

            <div className="features-bottom-item">
              <strong>Secure</strong>
              <span>{t("common.dataProtection")}</span>
            </div>

            <div className="features-bottom-line"></div>

            <div className="features-bottom-item">
              <strong>Modern</strong>
              <span>{t("common.modernTechnology")}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;