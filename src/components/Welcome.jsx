import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >{char === ' ' ? '\u00a0' : char}</span>
  )
  )
}

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 }
}

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`
    })
  }

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    })
  }
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    })
  }
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  }
}
function Welcome() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
    return () => {
      titleCleanup();
      subtitleCleanup();
    }
  }, []);
  return (
    <section id="welcome">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 px-6 py-3 w-fit transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <p ref={subtitleRef}>
          {renderText("Hey, I'm ", 'text-3xl font-georama text-gray-300', 200)}
          {renderText("Hari Ram", 'text-3xl font-georama text-white font-bold', 200)}
          {renderText("! Welcome to my", 'text-3xl font-georama text-gray-300', 200)}
        </p>
      </div>
      <h1 ref={titleRef} className="mt-7">{renderText("Portfolio", 'text-9xl italic font-georama')}</h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  )
}

export default Welcome