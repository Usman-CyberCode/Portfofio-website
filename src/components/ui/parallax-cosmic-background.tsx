"use client";

import React, { useEffect, useState } from "react";

interface CosmicParallaxBgProps {
  /**
   * Main heading text (displayed large in the center)
   */
  head?: string;

  /**
   * Subtitle text (displayed below the heading)
   * Comma-separated string that will be split into animated parts
   */
  text?: string;

  /**
   * Whether the text animations should loop
   * @default true
   */
  loop?: boolean;

  /**
   * Custom class name for additional styling
   */
  className?: string;

  /**
   * Whether to display text or only the stars & cosmic horizon backdrop
   * @default true
   */
  showText?: boolean;
}

/**
 * A cosmic parallax background component with animated stars and optional cosmic horizon
 */
const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head = "",
  text = "",
  loop = true,
  className = "",
  showText = false,
}) => {
  const [smallStars, setSmallStars] = useState<string>("");
  const [mediumStars, setMediumStars] = useState<string>("");
  const [bigStars, setBigStars] = useState<string>("");

  // Split the text by commas and trim whitespace
  const textParts = text ? text.split(",").map((part) => part.trim()) : [];

  // Generate random star positions
  const generateStarBoxShadow = (count: number): string => {
    const shadows = [];

    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px rgba(255, 255, 255, 0.85)`);
    }

    return shadows.join(", ");
  };

  useEffect(() => {
    // Generate star shadows when component mounts
    setSmallStars(generateStarBoxShadow(180));
    setMediumStars(generateStarBoxShadow(60));
    setBigStars(generateStarBoxShadow(24));

    // Set animation iteration based on loop prop
    document.documentElement.style.setProperty(
      "--animation-iteration",
      loop ? "infinite" : "1"
    );
  }, [loop]);

  return (
    <div
      className={`cosmic-parallax-container absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Stars layers */}
      <div
        id="stars"
        style={{ boxShadow: smallStars }}
        className="cosmic-stars"
      />
      <div
        id="stars2"
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"
      />
      <div
        id="stars3"
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"
      />

      {/* Horizon and Earth glow (soft subtle atmospheric curve) */}
      <div id="horizon" className="cosmic-horizon">
        <div className="glow" />
      </div>

      {showText && head && (
        <>
          <div id="title">{head.toUpperCase()}</div>
          <div id="subtitle">
            {textParts.map((part, index) => (
              <React.Fragment key={index}>
                <span className={`subtitle-part-${index + 1}`}>
                  {part.toUpperCase()}
                </span>
                {index < textParts.length - 1 && " "}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { CosmicParallaxBg };
export default CosmicParallaxBg;
