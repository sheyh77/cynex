import {
  Github,
  Instagram,
  Send,
  ArrowUpRight,
  Mail,
  Phone,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Inputlarda yozilgan qiymatlarni olish
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Forma yuborilganda
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("https://cynex-n53x.onrender.com/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.ok) {
        alert(`✅ ${data.msg}`);

        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        alert(
          `❌ ${t("contact.error")}: ${
            data.msg || t("contact.messageNotSent")
          }`
        );
      }
    } catch (err) {
      console.error("Error:", err);

      alert(`❌ ${t("contact.serverError")}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bog'lanish" className="contact">
      {/* Background */}
      <div className="contact-bg-grid"></div>

      <div className="contact-glow contact-glow-1"></div>
      <div className="contact-glow contact-glow-2"></div>

      <div className="container">
        <div className="contact-wrap">

          {/* =========================
              LEFT
          ========================= */}

          <div className="contact-left">

            <div className="contact-label">
              <Sparkles size={15} />
              <span>{t("contact.label")}</span>
            </div>

            <h2 className="contact-left-title">
              {t("contact.titlePart1")}
              <span> {t("contact.titleHighlight")} </span>
              {t("contact.titlePart2")}
            </h2>

            <p className="contact-left-sub">
              {t("contact.description")}
            </p>

            {/* Contact info */}
            <div className="contact-info">

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MessageSquare size={18} />
                </div>

                <div>
                  <span>{t("contact.responseTime")}</span>
                  <strong>{t("contact.within24Hours")}</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone size={18} />
                </div>

                <div>
                  <span>{t("contact.phone")}</span>
                  <strong>+998 90 123 45 67</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={18} />
                </div>

                <div>
                  <span>{t("contact.email")}</span>
                  <strong>cynex.team@gmail.com</strong>
                </div>
              </div>

            </div>

            {/* Social */}
            <div className="contact-social-wrap">
              <span className="contact-social-title">
                {t("contact.social")}
              </span>

              <div className="contact-left-social">

                <a
                  href="https://www.instagram.com/cynex.team?igsh=OTM3M3BjY3BoNzJ2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href="https://t.me/cynexteam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <Send size={20} />
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href="https://github.com/sheyh77"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                  <ArrowUpRight size={13} />
                </a>

              </div>
            </div>
          </div>

          {/* =========================
              RIGHT FORM
          ========================= */}

          <div className="contact-right">

            <div className="contact-form-header">
              <div className="contact-form-icon">
                <MessageSquare size={19} />
              </div>

              <div>
                <span>{t("contact.formLabel")}</span>
                <strong>{t("contact.formTitle")}</strong>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* Name */}
              <div className="contact-field">
                <label htmlFor="contact-name">
                  {t("contact.name")}
                </label>

                <div className="contact-input-wrap">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder={t("contact.namePlaceholder")}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="contact-field">
                <label htmlFor="contact-phone">
                  {t("contact.phoneNumber")}
                </label>

                <div className="contact-input-wrap">
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+998 90 123 45 67"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="contact-field">
                <label htmlFor="contact-message">
                  {t("contact.message")}
                </label>

                <div className="contact-input-wrap contact-textarea-wrap">
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={t("contact.messagePlaceholder")}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="contact-spinner"></span>
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    <span>{t("contact.sendMessage")}</span>

                    <span className="contact-submit-icon">
                      <ArrowUpRight size={18} />
                    </span>
                  </>
                )}
              </button>

              <div className="contact-form-security">
                <span className="contact-security-dot"></span>
                {t("contact.security")}
              </div>

            </form>
          </div>

        </div>

        {/* Bottom line */}
        <div className="contact-bottom">
          <span>{t("contact.startProject")}</span>

          <div className="contact-bottom-line"></div>

          <strong>
            {t("contact.bottomTitle")}
          </strong>
        </div>

      </div>
    </section>
  );
}

export default Contact;