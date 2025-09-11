import { CircleCheck, Clock, Users } from 'lucide-react';
import React from 'react';

function About() {
  return (
    <section className="about" id='biz haqimizda'>
      <div className="cantainer">
        <div className="about-wrap">
          <div className="about-left-image">
            {/* <img src={} alt="" /> */}
          </div>
          <div className="about-right-desc">
            <h1 className="about-title">Biz haqimizda</h1>
            <p className="about-right-desc-sub">Bizning jamoamiz innovatsion yechimlar va yuqori sifatli xizmatlar taqdim etishga intiladi. Bizning maqsadimiz - mijozlarimizning muvaffaqiyatga erishishlariga yordam berish.</p>
            <div className="about-right-desc-item">
              <Users className='about-item-icon' size={32} />
              <div className="about-item-subtitle">
                <p className="about-item-subtitle-title">Tajribali mutaxasislar</p>
                <p className="about-item-subtitle-desc">Bizning jamoamiz sohada ko'p yillik tajribaga ega mutaxassislardan iborat.</p>
              </div>
            </div>
            <div className="about-right-desc-item">
              <CircleCheck className='about-item-icon' size={32} />
              <div className="about-item-subtitle">
                <p className="about-item-subtitle-title">Ishonchli hamkor</p>
                <p className="about-item-subtitle-desc">Mijozlarimiz bizga ishonishadi, chunki biz har doim ularning manfaatlarini ustun qo'yamiz.</p>
              </div>
            </div>
            <div className="about-right-desc-item">
              <Clock className='about-item-icon' size={32} />
              <div className="about-item-subtitle">
                <p className="about-item-subtitle-title">Tezkor va sifatli hizmat</p>
                <p className="about-item-subtitle-desc">Bizning xizmatlarimiz tezkor va sifatli bo'lib, mijozlarimizning vaqtini tejaydi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About