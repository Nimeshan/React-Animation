import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { svgPathProperties } from "svg-path-properties";

export default function HeroSection() {
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const [pathLength, setPathLength] = useState(0);

  // SVG PATH
  const svgPath =
    "M-24.5 101C285 315 5.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852";

  // Compute SVG total length once
  useEffect(() => {
    const props = new svgPathProperties(svgPath);
    setPathLength(props.getTotalLength());
  }, []);

  // Scroll listener — identical to Flutter behavior
  useEffect(() => {
    const elem = scrollRef.current;

    const onScroll = () => {
      const max = elem.scrollHeight - elem.clientHeight;
      let p = elem.scrollTop / max;
      if (p > 1) p = 1;

      controls.set({ progress: p });
    };

    elem.addEventListener("scroll", onScroll);
    return () => elem.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        backgroundColor: "#EFF0F6",
      }}
    >
      <div style={{ padding: "0 80px" }}>
        {/* TOP SECTION SAME AS FLUTTER */}
        <div style={{ height: "250px", position: "relative" }}>
          {/* SVG */}
          <motion.svg
            width="800"
            height="150"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <motion.path
              d={svgPath}
              stroke="#3137F1"
              strokeWidth="30"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={pathLength}
              animate={controls}
              initial={{ strokeDashoffset: pathLength }}
              style={{
                strokeDashoffset: controls.progress?.to((p) => pathLength * (1 - p))
              }}
            />
          </motion.svg>

          {/* TEXT EXACTLY SAME POSITIONS */}
          <h1
            style={{
              position: "absolute",
              top: 20,
              left: 115,
              fontSize: "76px",
              fontFamily: "Inter",
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
              fontSize: "76px",
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            Within Reach
          </h1>
        </div>

        {/* SPACING */}
        <div style={{ height: "20px" }} />

        {/* MAIN ROW (Video + Text) */}
        <div style={{ display: "flex", gap: "60px" }}>
          {/* VIDEO LEFT – EXACT LIKE FLUTTER */}
          <div
            style={{
              flex: 1,
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <video
              src="/assets/vid1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* TEXT RIGHT */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.5",
                fontFamily: "Inter",
              }}
            >
              Lusion is a digital production studio that brings your ideas to life
              through visually captivating designs and interactive experiences.
            </p>

            <button
              style={{
                marginTop: "20px",
                padding: "18px 30px",
                background: "white",
                color: "black",
                borderRadius: "50px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ABOUT US
            </button>
          </div>
        </div>

        {/* SCROLL SPACER */}
        <div style={{ height: "800px" }} />
      </div>
    </div>
  );
}