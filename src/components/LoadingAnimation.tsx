import { useEffect, useRef } from "react";
import logoWhite from "@/assets/logo-white.svg";
import "./LoadingAnimation.css";

const phrases = [
  "Feeding unicorns",
  "Grabbing tasks",
  "Collating conversations",
  "Reticulating splines",
  "Pondering emptiness",
  "Considering alternatives",
  "Shuffling bits",
  "Celebrating moments",
  "Generating phrases",
  "Simulating workflow",
  "Empowering humanity",
  "Being aspirational",
  "Doing the hokey pokey",
  "Bueller",
  "Cracking jokes",
  "Slacking off",
];

function shuffleArray(array: string[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

function createSVG(
  tag: string,
  properties: Record<string, string | number>,
  children?: SVGElement[]
): SVGElement {
  const newElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tag
  );
  for (const prop in properties) {
    newElement.setAttribute(prop, String(properties[prop]));
  }
  if (children) {
    children.forEach((child) => {
      newElement.appendChild(child);
    });
  }
  return newElement;
}

function createPhraseSvg(phrase: string, yOffset: number): SVGElement {
  const text = createSVG("text", {
    fill: "white",
    x: 50,
    y: yOffset,
    "font-size": 18,
    "font-family": "Arial",
  });
  text.appendChild(document.createTextNode(phrase + "..."));
  return text;
}

function createCheckSvg(yOffset: number, index: number): SVGElement {
  const checkmarkIdPrefix = "loadingCheckSVG-";
  const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";

  const check = createSVG("polygon", {
    points:
      "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
    fill: "rgba(255,255,255,1)",
    id: checkmarkIdPrefix + index,
  });
  const circle_outline = createSVG("path", {
    d: "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
    fill: "white",
  });
  const circle = createSVG("circle", {
    id: checkmarkCircleIdPrefix + index,
    fill: "rgba(255,255,255,0)",
    cx: 16,
    cy: 16,
    r: 15,
  });
  const group = createSVG("g", {
    transform: "translate(10 " + (yOffset - 20) + ") scale(.9)",
  }, [circle, check, circle_outline] as SVGElement[]);
  return group;
}

function easeInOut(t: number): number {
  const period = 200;
  return (Math.sin(t / period + 100) + 1) / 2;
}

const LoadingAnimation = () => {
  const phrasesRef = useRef<SVGGElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const phrasesGroup = phrasesRef.current;
    if (!phrasesGroup) return;

    // Clear existing content
    phrasesGroup.innerHTML = "";

    const shuffledPhrases = shuffleArray(phrases);
    const verticalSpacing = 50;

    // Add phrases to the SVG
    shuffledPhrases.forEach((phrase, index) => {
      const yOffset = 30 + verticalSpacing * index;
      phrasesGroup.appendChild(createPhraseSvg(phrase, yOffset));
      phrasesGroup.appendChild(createCheckSvg(yOffset, index));
    });

    // Animation logic
    let currentY = 0;
    const totalHeight = shuffledPhrases.length * verticalSpacing;

    const checkmarkIdPrefix = "loadingCheckSVG-";
    const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";

    const checks = shuffledPhrases.map((_, i) => ({
      check: document.getElementById(checkmarkIdPrefix + i),
      circle: document.getElementById(checkmarkCircleIdPrefix + i),
    }));

    function animateLoading() {
      const now = new Date().getTime();
      phrasesGroup!.setAttribute("transform", "translate(0 " + currentY + ")");
      currentY -= 1.35 * easeInOut(now);

      // Reset to loop infinitely when reaching the end
      if (currentY < -totalHeight + 100) {
        currentY = 0;
        // Reset all checkmarks
        checks.forEach((check) => {
          if (check.circle) check.circle.setAttribute("fill", "rgba(255, 255, 255, 0)");
          if (check.check) check.check.setAttribute("fill", "rgba(255, 255, 255, 1)");
        });
      }

      checks.forEach((check, i) => {
        const colorChangeBoundary = -i * verticalSpacing + verticalSpacing + 15;
        if (currentY < colorChangeBoundary && check.circle && check.check) {
          const alpha = Math.max(
            Math.min(1 - (currentY - colorChangeBoundary + 15) / 30, 1),
            0
          );
          check.circle.setAttribute("fill", "rgba(255, 255, 255, " + alpha + ")");
          // Primary color: #05D3D3 = rgb(5, 211, 211)
          const checkColor = [
            Math.round(255 * (1 - alpha) + 5 * alpha),
            Math.round(255 * (1 - alpha) + 211 * alpha),
            Math.round(255 * (1 - alpha) + 211 * alpha),
          ];
          check.check.setAttribute(
            "fill",
            "rgba(" + checkColor[0] + ", " + checkColor[1] + "," + checkColor[2] + ", 1)"
          );
        }
      });

      animationRef.current = requestAnimationFrame(animateLoading);
    }

    animateLoading();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="loading-page">
      <div className="loading-phrase-box">
        <svg width="100%" height="100%">
          <defs>
            <mask
              id="mask"
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
            >
              <linearGradient
                id="linearGradient"
                gradientUnits="objectBoundingBox"
                x2="0"
                y2="1"
              >
                <stop stopColor="white" stopOpacity="0" offset="0%" />
                <stop stopColor="white" stopOpacity="1" offset="30%" />
                <stop stopColor="white" stopOpacity="1" offset="70%" />
                <stop stopColor="white" stopOpacity="0" offset="100%" />
              </linearGradient>
              <rect width="100%" height="100%" fill="url(#linearGradient)" />
            </mask>
          </defs>
          <g width="100%" height="100%" style={{ mask: "url(#mask)" }}>
            <g id="phrases" ref={phrasesRef}></g>
          </g>
        </svg>
      </div>
      <div className="loading-footer">
        <img src={logoWhite} alt="Logo" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingAnimation;
