import { Github, Instagram, Send } from "lucide-react";
import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // inputlarda yozilgan qiymatlarni olish
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // forma yuborilganda
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.ok) {
        alert(`✅ ${data.msg}`);
        setFormData({ name: "", phone: "", message: "" });
      } else {
        alert(`❌ Xatolik: ${data.msg || "Xabar yuborilmadi"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Server bilan ulanishda muammo!");
    }
  };

  return (
    <section id="bog'lanish" className="contact">
      <div className="cantainer">
        <div className="contact-wrap">
          {/* Chap taraf */}
          <div className="contact-left">
            <p className="contact-left-title">Biz bilan bog'lanish</p>
            <p className="contact-left-sub">
              Sizda loyiha g‘oyasi, savol yoki hamkorlik taklifi bormi? Quyidagi forma orqali murojaat qiling yoki ijtimoiy tarmoqlarim orqali bog‘lanishingiz mumkin.
            </p>
            <div className="contact-left-social">
              <a href="https://www.instagram.com/cynex.team?igsh=OTM3M3BjY3BoNzJ2">
                <Instagram size={32} />
              </a>
              <a href="https://t.me/cynexteam">
                <Send size={32} />
              </a>
              <a href="https://github.com/sheyh77">
                <Github size={32} />
              </a>
            </div>
          </div>

          {/* O‘ng taraf (forma) */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Ism</label>
              <input
                type="text"
                name="name"
                placeholder="Ismingizni kiriting"
                required
                value={formData.name}
                onChange={handleChange}
              />

              <label>Telefon raqam</label>
              <input
                type="tel"
                name="phone"
                placeholder="+998 90 123 45 67"
                required
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Xabar</label>
              <textarea
                name="message"
                placeholder="Xabaringizni yozing..."
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit">Yuborish</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;