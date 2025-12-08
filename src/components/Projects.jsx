import React from "react";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <section id="loyihalar" className="projects">
      <div className="cantainer">
        <div className="projects-wrap">
          <div className="projects-desc">
            <h1 className="projects-desc-title">
              Har bir loyihaga alohida mehr beramiz
            </h1>
            <p className="projects-desc-sub">
              Biz jamiyatga va hamkorlarimizga o‘z maqsadlariga erishishga,
              qulaylikni ta’minlashga va hayotni yangi imkoniyatlar bilan
              to‘ldirishga yordam beradigan noyob IT yechimlarni yaratamiz.
            </p>
          </div>
          <div className="projects-card">
            <div className="projects-card-item">
              <div className="projects-card-item-desc">
                <h1 className="projects-card-item-desc-title">
                  Kafe va restoran uchun
                </h1>
                <p className="projects-card-item-desc-sub">
                  Bu turdagi saytlarda online buyurtmalar olishingiz va
                  biznesingizni to'liq aftomatlashtirasiz. Buyurtmalarni
                  boshqarasiz qancha buyurtma kelyabdi qanchasi bekor qilindi va
                  qabul qilinganligi haqda kunlik axbarot olib borasiz.
                </p>
                <Link to="https://cofeshop-lk6b.vercel.app/">
                  <button className="projects-card-item-desc-btn">
                    Ko'rish
                  </button>
                </Link>
              </div>
              <div className="projects-card-item-about">
                <div className="projects-card-item-about-img">
                  <img
                    src="https://roomester.ru/wp-content/uploads/2018/04/dizajn-kafe.jpg"
                    alt=""
                  />
                </div>
                <div className="projects-card-item-about-desc">
                  <p className="projects-card-item-about-desc-title">
                    Batafsil
                  </p>
                  <p className="projects-card-item-about-desc-sub">
                    Ushbu web dastur yaratish davomida TypeScript, React,
                    JavaScript, SASS, Antd va iconkalar uchun lucide-react dan
                    foydalanildi. Backend to'liq TypeScriptda tuzilgan va api
                    lar frontend bilan ulangan.
                  </p>
                </div>
              </div>
            </div>
            <div className="projects-card-item">
              <div className="projects-card-item-desc">
                <h1 className="projects-card-item-desc-title">Bolalar uchun</h1>
                <p className="projects-card-item-desc-sub">
                  Ushbu web dastur yosh bolalarni turli hil videolardan saqlash
                  maqsadida yaratildi. Siz bu dasturda bolalar uchun 3 tilda
                  qiziqarli multfilmlar va o'yinlarni korinishingiz mumkin.
                </p>
                <Link to="https://kidstv-admin.vercel.app/">
                  <button className="projects-card-item-desc-btn">
                    Ko'rish
                  </button>
                </Link>
              </div>
              <div className="projects-card-item-about">
                <div className="projects-card-item-about-img">
                  <img
                    src="https://www.shutterstock.com/image-photo/newborn-baby-girl-plays-her-600nw-2465282899.jpg"
                    alt=""
                  />
                </div>
                <div className="projects-card-item-about-desc">
                  <p className="projects-card-item-about-desc-title">
                    Batafsil
                  </p>
                  <p className="projects-card-item-about-desc-sub">
                    Dasturni yaratishda React, JavaScript, SASS, Antd va backend
                    da pythondan foydalanildi. Yosh bolalarni ahloqsiz video va
                    reklamadan saqlash bilim berish maqsadida yaratildi.
                  </p>
                </div>
              </div>
            </div>
            <div className="projects-card-item">
              <div className="projects-card-item-desc">
                <h1 className="projects-card-item-desc-title">Hisobot</h1>
                <p className="projects-card-item-desc-sub">
                  Oylik, kunlik va haftalik harajatlaringizni hisoblashda sizga
                  katta yordam beruvchi dastur.
                </p>
                <Link to="https://hisobot-umber.vercel.app/#/login">
                  <button className="projects-card-item-desc-btn">
                    Ko'rish
                  </button>
                </Link>
              </div>
              <div className="projects-card-item-about">
                <div className="projects-card-item-about-img">
                  <img
                    src="https://hisobot.com/assets/img/hisobot.jpg"
                    alt=""
                  />
                </div>
                <div className="projects-card-item-about-desc">
                  <p className="projects-card-item-about-desc-title">
                    Batafsil
                  </p>
                  <p className="projects-card-item-about-desc-sub">
                    Hisobot dasturi juda mukammal va aqlli ravishda yaratilgan
                    sizning barcha kirim-chiqimlaringiz hisoblab bera oladi.
                    Dastur React da tuzilgan Backend esa python da mukammal
                    qilib yaratilgan..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;