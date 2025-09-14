import React, { useState } from "react";
import BannerImg from "/images/banner-img.png";
import Start from "../pages/Start";   // Headerda ishlatgan modal
import Detail from "../pages/Detail"; // Kurs haqida modal

function Banner({ currentUser }) {
  const [isStartVisible, setIsStartVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  return (
    <section id="asosiy" className="banner">
      <div className="cantainer">
        <div className="banner-wrap">
          <p className="banner-title">
            Ish jarayonini osonlikcha <br /> soddalashtiring
          </p>
          <p className="banner-desc">
            Bizning platformamiz samaradorlikni oshirish uchun tushunchalar va
            moslashtirilgan takliflarni taqdim etuvchi vositalar bilan
            integratsiyalashgan.
          </p>
          <div className="banner-buttons">
            <button
              className="header-started"
              onClick={() => setIsStartVisible(true)}
            >
              Boshlash
            </button>
            <button
              className="banner-more"
              onClick={() => setIsDetailVisible(true)}
            >
              Batafsil ma'lumot
            </button>
          </div>
          <div className="banner-image">
            <img src={BannerImg} alt="" />
          </div>
        </div>
      </div>

      {/* Modal (Start component) */}
      <Start
        visible={isStartVisible}
        setVisible={setIsStartVisible}
        currentUser={currentUser}
      />

      {/* Modal (Detail component) */}
      <Detail
        visible={isDetailVisible}
        setVisible={setIsDetailVisible}
      />
    </section>
  );
}

export default Banner;