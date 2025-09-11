import { useEffect } from 'react';
import Header from './layout/Header';
import Projects from './components/Projects';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';

// AOS import qilish
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from './components/Banner';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <Projects />
      <Features />
      <About />
      <Contact />
    </>
  )
}

export default App;
