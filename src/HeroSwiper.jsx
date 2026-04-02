import { useState, useEffect, useRef } from "react";
import "./HeroSwiper.css";

const slides = [
  {
    badge: "🇺🇿 O'zbekiston #1",
    title: ["Eng yirik", "Bloger Marketplace"],
    highlightLine: 1,
    desc: "500+ tasdiqlangan bloger bir platformada. Toping, solishtiring va reklama bering — tez va oson.",
    btn1: "Blogerlarni ko'rish →",
    btn2: "Reklama berish",
    stats: [
      { num: "500+", label: "Bloger", sub: "Tasdiqlangan" },
      { num: "12M+", label: "Auditoriya", sub: "Faol foydalanuvchi" },
      { num: "3x", label: "O'rtacha ROI", sub: "Kafolatlangan" },
    ],
    theme: "slide-red",
  },
  {
    badge: "✦ Premium xizmat",
    title: ["Brendingizni", "Kuchaytiring"],
    highlightLine: 1,
    desc: "AI yordamida eng mos blogerlarni toping. Kampaniyangizni boshqaring va natijalarni real vaqtda kuzating.",
    btn1: "Bepul boshlash →",
    btn2: "Demo ko'rish",
    stats: [
      { num: "98%", label: "Mamnuniyat", sub: "Mijozlar reytingi" },
      { num: "48h", label: "Tezlik", sub: "Kampaniya ishlashi" },
      { num: "200+", label: "Brendlar", sub: "Ishonch bildirgan" },
    ],
    theme: "slide-dark",
  },
  {
    badge: "🚀 Yangi imkoniyat",
    title: ["Bloger bo'lib", "Daromad Oling"],
    highlightLine: 1,
    desc: "O'z auditoriyangizni monetizatsiya qiling. Brendlar bilan to'g'ridan-to'g'ri ishlang va daromadingizni oshiring.",
    btn1: "Ro'yxatdan o'tish →",
    btn2: "Ko'proq bilish",
    stats: [
      { num: "5M+", label: "To'lovlar", sub: "Blogerlarga berilgan" },
      { num: "30%", label: "O'sish", sub: "Oylik daromad" },
      { num: "0%", label: "Komissiya", sub: "1 oy bepul" },
    ],
    theme: "slide-orange",
  },
];

const DURATION = 4500;

export default function HeroSwiper() {
  const [cur, setCur] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progRef = useRef(null);
  const touchStartX = useRef(0);

  const goTo = (n) => {
    setCur(n);
    setProgress(0);
  };

  const next = () => goTo((cur + 1) % slides.length);
  const prev = () => goTo((cur - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const step = 100 / (DURATION / 100);
    let val = 0;
    progRef.current = setInterval(() => {
      val += step;
      setProgress(Math.min(val, 100));
      if (val >= 100) {
        clearInterval(progRef.current);
        setCur((c) => (c + 1) % slides.length);
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(progRef.current);
  }, [cur, paused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
  };

  return (
    <div className="hero-wrap">
      <div
        className="swiper"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="swiper-wrapper"
          style={{ transform: `translateX(-${cur * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className={`swiper-slide ${slide.theme}`}>
              <div className="blob b1" />
              <div className="blob b2" />
              <div className="slide-content">
                <div className="slide-badge">{slide.badge}</div>
                <h1 className="slide-title">
                  {slide.title[0]}
                  <br />
                  <span>{slide.title[1]}</span>
                </h1>
                <p className="slide-desc">{slide.desc}</p>
                <div className="btn-group">
                  <button className="btn-primary">{slide.btn1}</button>
                  <button className="btn-outline">{slide.btn2}</button>
                </div>
              </div>
              <div className="stats-side">
                {slide.stats.map((s, j) => (
                  <div key={j} className="stat-card">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-info">
                      <span className="stat-label">{s.label}</span>
                      <span className="stat-sub">{s.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="progress-bar" style={{ width: `${progress}%` }} />

        <div className="swiper-pagination">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`swiper-dot ${i === cur ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button className="swiper-btn swiper-prev" onClick={prev}>
          ‹
        </button>
        <button className="swiper-btn swiper-next" onClick={next}>
          ›
        </button>
      </div>
    </div>
  );
}
