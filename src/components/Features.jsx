import React from 'react';
import FeaturesImg from "/images/banner-img.png";

function Features() {
  return (
    <section id='xususiyatlari' className="features">
      <div className="cantainer">
        <div className="features-wrap">
          <h1 className="features-title">Dasturlar xususiyatlari</h1>
          <div className="features-about">
            <div className="features-about-desc">
              <div className="features-about-desc-item">
                <p className="features-item-title">Admin panel</p>
                <p className="features-item-sub">Admin panel - biznesingizni boshqarishda sizga juda ko'p yordam beradi. Masalan, ishchilar yoki foydalanuvchilar haqida malumot oldi-sotdi bo'lsa qancha mahsulot sotildi qaytarildi barchasi haqida sizga malumot berib boradi va online dokon bo'lsa mahsulotlarni qoshish o'chirish barchasini qilishingiz mumkin.</p>
              </div>
              <div className="features-about-desc-item">
                <p className="features-item-title">Website</p>
                <p className="features-item-sub">Tezkor va zamonaviy korinishdagi website lar yaratamiz. Turli mobil desktoplarga mos va qulay korinishda, foydalanuvchi malumotlari himoyalangan, admin panelda ozingiz boshqarasiz.</p>
              </div>
            </div>
            <div className="features-about-img">
              <img src={FeaturesImg} alt="admin panel image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features;