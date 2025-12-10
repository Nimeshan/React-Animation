import { useEffect, useRef, useState } from "react";
import { svgPathProperties } from "svg-path-properties";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const scrollRef = useRef(null);
  const pathRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  const svgPath =
    "M-24.5 101C285 315 5.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852";

  // SVG path setup
  useEffect(() => {
    const props = new svgPathProperties(svgPath);
    const len = props.getTotalLength();
    setPathLength(len);

    if (pathRef.current) {
      pathRef.current.style.strokeDasharray = len;
      pathRef.current.style.strokeDashoffset = len;
    }
  }, []);

  // SVG scroll animation
  useEffect(() => {
    const el = scrollRef.current;

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const progress = Math.min(el.scrollTop / max, 1);
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = pathLength * (1 - progress);
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [pathLength]);

  // Scroll-linked video animation: rise from below to center
  useEffect(() => {
    const container = videoContainerRef.current;

    gsap.fromTo(
      container,
      {
        y: 400,        // start below
        scale: 0.8,
        opacity: 0.3,
      },
      {
        y: 0,          // move to normal position in layout
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          scroller: scrollRef.current,
          start: "top bottom",   // start when video enters bottom of viewport
          end: "top center",     // end when video reaches center
          scrub: true,           // fully scroll-linked
        },
      }
    );
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        backgroundColor: "#EFF0F6",
        position: "relative",
      }}
    >
      {/* SVG Path */}
      <svg
        width="1200"
        height="2000"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <path
          ref={pathRef}
          d={svgPath}
          fill="none"
          stroke="#3137F1"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          shapeRendering="geometricPrecision"
        />
      </svg>

      <div style={{ padding: "0 80px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ height: 250, position: "relative" }}>
          <h1
            style={{
              position: "absolute",
              top: 20,
              left: 115,
              fontSize: 76,
              fontWeight: 400,
            }}
          >
            Beyond Visions
          </h1>
          <h1
            style={{
              position: "absolute",
              top: 110,
              left: 0,
              fontSize: 76,
              fontWeight: 400,
            }}
          >
            Within Reach
          </h1>
        </div>

        <div style={{ height: 20 }} />

        {/* Video + Text Section */}
        <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
          {/* Video Container */}
          <div
            ref={videoContainerRef}
            style={{
              flex: 1,
              height: 400,
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              src="/assets/vid1.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                maxWidth: "420px",
                textAlign: "left",
                marginBottom: 20,
              }}
            >
              Lusion is a digital production studio that brings your ideas to life
              through visually captivating designs and interactive experiences.
            </p>
            <button
              style={{
                padding: "12px 28px",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                border: "none",
                borderRadius: "50px",
                fontSize: "16px",
                letterSpacing: "0.5px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
              }}
            >
              ABOUT US
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: 1200 }} />
      </div>
    </div>
  );
}
