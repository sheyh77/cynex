import React from 'react';
import BannerImg from "/images/banner-img.png"; 

function Banner() {
  return (
    <section id='asosiy' className="banner">
        <div className="cantainer">
            <div className="banner-wrap">
                <p className="banner-title">Ish jarayonini osonlikcha <br /> soddalashtiring</p>
                <p className="banner-desc">Bizning platformamiz samaradorlikni oshirish uchun tushunchalar va moslashtirilgan takliflarni taqdim etuvchi vositalar bilan integratsiyalashgan.</p>
                <div className="banner-buttons">
                    <button className='header-started'>Boshlash</button>
                    <button className='banner-more'>Batafsil malumot</button>
                </div>
                <div className="banner-image">
                    <img src={BannerImg} alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner