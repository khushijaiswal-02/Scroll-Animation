
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarVisual from "./CarVisual.jsx";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "58%",
    description: "Increase in pick up point use",
    color: "stat-lime",
  },
  {
    value: "27%",
    description: "Increase in pick up point use",
    color: "stat-dark",
  },
  {
    value: "23%",
    description: "Decreased in customer phone calls",
    color: "stat-blue",
  },
  {
    value: "40%",
    description: "Decreased in customer phone calls",
    color: "stat-orange",
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const carRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // The initial headline reveal.
      gsap.from(".hero-heading", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
      });

      // Keep the cards hidden until the scroll timeline reaches them.
      gsap.set(".stat-card", {
        autoAlpha: 0,
        y: 28,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: stageRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Car and heading move together through the horizontal strip.
      timeline.fromTo(
        carRef.current,
        {
          x: () => -window.innerWidth * 0.2,
        },
        {
          x: () => window.innerWidth * 0.25,
          ease: "none",
          duration: 2,
        },
        0
      );

      timeline.fromTo(
        ".hero-heading",
        { x: 0 },
        {
          x: () => -window.innerWidth * 0.1,
          ease: "none",
          duration: 2,
        },
        0
      );

      // Reveal each card separately at progressively later scroll positions.
      stats.forEach((_, index) => {
        timeline.to(
          `.stat-card-${index}`,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            ease: "power2.out",
          },
          0.45 + index * 0.42
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-scroll-section">
      <div ref={stageRef} className="hero-stage">
        <div className="hero-strip">
          <div className="hero-green-panel" />

          <h1 className="hero-heading">
            WELCOME ITZ FIZZ
          </h1>

          <div className="hero-car">
            <CarVisual carRef={carRef} />
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <article
              key={stat.value}
              className={`stat-card stat-card-${index} ${stat.color}`}
            >
              <p className="stat-value">{stat.value}</p>
              <p className="stat-description">
                {stat.description}
              </p>
            </article>
          ))}
        </div>

        <div className="hero-scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}