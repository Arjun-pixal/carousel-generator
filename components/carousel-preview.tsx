"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
}

interface DesignSettings {
  backgroundElement: string;
  backgroundEnabled: boolean;
  colorPalette: number;
  useCustomColors: boolean;
  customColors: string[];
  fontSize: {
    title: string;
    subtitle: string;
    content: string;
  };
  fontFamily: string;
  slideLayout: string;
}

interface CarouselPreviewProps {
  slides: SlideData[];
  userProfile: UserProfile;
  designSettings: DesignSettings;
  isFullPreview?: boolean;
  forceFullSize?: boolean;
  showArrows?: boolean; // <-- add this prop
}

export default function CarouselPreview({
  slides,
  userProfile,
  designSettings,
  isFullPreview = false,
  forceFullSize = false,
  showArrows = false, // <-- default to false
}: CarouselPreviewProps) {
  function isDarkColor(hex: string): boolean {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.6;
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const colorPalettes = [
    ["#6366F1", "#000000", "#F1F5F9"], // Indigo + Soft Indigo + Light Gray 1
    ["#F43F5E", "#6B21A8", "#F8FAFC"], // Rose + Dark Purple + White 2 
    ["#0F172A", "#14B8A6", "#E0F2FE"], // Navy + Teal + Pale Blue 3
    ["#EF4444", "#FB7185", "#ADD8E6"], // Red + Soft Red + Dark Gray 4
    ["#4B5563", "#9CA3AF", "#FEFCE8"], // Gray + Cool Gray + Light Yellow 5
    ["#06B6D4", "#000000", "#ECFEFF"], // Cyan + Light Cyan + Soft Cyan 6
    ["#0F172A", "#1E3A8A", "#ECFEFF"], // Deep Navy + Blue + Pale Cyan 7
    ["#F43F5E", "#0F172A", "#FEF2F2"], // Rose + Light Rose + Blush 8
    // ["#78350F", "#D6D3D1", "#E7E5E4"], // Brown + Grayish + Off-white 9
    ["#6366F1", "#60A5FA", "#DBEAFE"], // Indigo + Sky + Light Blue 10
    ["#B91C1C", "#991B1B", "#FEE2E2"], // Red + Deep Red + Light Pink 11
    ["#1E293B", "#3B82F6", "#E0F2FE"], // Slate + Blue + Pale Blue 12
    ["#F59E0B", "#10B981", "#FEFCE8"], // Amber + Emerald + Light Yellow 13
    ["#10B981", "#F59E0B", "#FEF3C7"], // Emerald + Amber + Light Cream 14
    ["#7C2D12", "#BE185D", "#FECACA"], // Burgundy + Crimson + Light Rose 15
    // ["#78350F", "#92400E", "#FDE68A"], // Warm Brown + Orange + Light Yellow 16
    ["#1E3A8A", "#3B82F6", "#DBEAFE"], // Blue + Sky + Pale Blue 17
    ["#BE185D", "#F59E0B", "#FEF3C7"], // Crimson + Amber + Cream 18
    ["#B91C1C", "#DC2626", "#FCA5A5"], // Red + Red + Soft Red 19
    ["#4C1D95", "#7C3AED", "#DDD6FE"], // Dark Purple + Violet + Lavender 20
    ["#78350F", "#92400E", "#FDE68A"], // Warm Brown + Burnt Orange + Pale Yellow 21
    ["#B91C1C", "#0F172A", "#E2E8F0"], // Red + Navy + Light Gray 22
    ["#9333EA", "#8B5CF6", "#E9D5FF"], // Violet + Purple + Lilac 23
    // ["#7C2D12", "#A16207", "#FDE68A"], // Brown + Gold + Pale Yellow 24
  ];
  


  const currentColors = designSettings.useCustomColors
    ? designSettings.customColors
    : colorPalettes[designSettings.colorPalette];
  const isDarkBg = isDarkColor(currentColors[0]);
  const textColorClass = isDarkBg ? "text-white" : "text-gray-900";

  const pastedImageUrl = "/sample-pasted-bg.png";

  const handleSlideChange = (newIndex: number, dir: "left" | "right") => {
    if (animating || newIndex === currentSlide) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setAnimating(false);
    }, 350);
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % slides.length, "right");
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length, "left");
  };

  // Normalize backgroundElement to lowercase for matching
  const bgElement = (designSettings.backgroundElement || "").toLowerCase();

  const renderBackgroundPattern = () => {
    if (!designSettings.backgroundEnabled) return null;

    switch (bgElement) {
      /**
       * Case for rendering dots pattern
       * @returns {JSX.Element} Dots pattern
       */
      case "dots":
        return (
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Top-right dots (expanded diagonal pattern) */}

            <div className="absolute top-0 right-0 p-6 rotate-45 opacity-40 scale-110">
              <div className="grid grid-cols-10 gap-3">
                {[...Array(80)].map((_, i) => (
                  <span
                    key={`top-dot-${i}`}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: currentColors[0],
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute top-50 right-0 p-6 rotate-45 opacity-30 scale-110">
              <div className="grid grid-cols-15 gap-2">
                {[...Array(225)].map((_, i) => (
                  <span
                    key={`top-dot-${i}`}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: currentColors[0],
                    }}
                  />
                ))}
              </div>

            </div>
            {/* Bottom dots strip (more dots, tighter spacing) */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex justify-center space-x-1 opacity-60">
              {[...Array(50)].map((_, i) => (
                <span
                  key={`bottom-dot-${i}`}
                  className="w-1.5 h-3 rounded-full"
                  style={{
                    backgroundColor: currentColors[0],
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "blobs":
        return (
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Top-left blob */}
            <svg
              className="absolute top-[-50px] left-[-60px] w-64 h-64 opacity-40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={`url(#topBlobGradient)`}
                d="M39.4,-67.3C53.2,-57.6,68.6,-53.1,74.8,-42.2C81,-31.3,78,-14.2,75.5,2.2C73,18.6,71,34.2,63.8,46.9C56.5,59.7,44,69.6,29.7,73.4C15.4,77.1,-0.8,74.7,-17.6,70.5C-34.5,66.2,-51.9,60.1,-62.6,47.4C-73.2,34.7,-77.1,15.4,-74.7,-2.7C-72.3,-20.8,-63.7,-37.6,-51.7,-47.2C-39.8,-56.9,-24.5,-59.4,-9.8,-64.2C4.9,-69,19.8,-75.1,39.4,-67.3Z"
                transform="translate(100 100)"
              />
              <defs>
                <linearGradient id="topBlobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={currentColors[0]} />
                  <stop offset="100%" stopColor={currentColors[1] || currentColors[0]} />
                </linearGradient>
              </defs>
            </svg>

            {/* Bottom-right blob */}
            <svg
              className="absolute bottom-[-60px] right-[-40px] w-64 h-64 opacity-30 animate-pulse-slow"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={`url(#bottomBlobGradient)`}
                d="M45.4,-57.1C58.2,-47.4,68.3,-33.1,71.4,-18.6C74.4,-4.2,70.3,10.5,65.2,25.1C60.1,39.7,53.9,54.2,42.3,63.7C30.7,73.3,13.8,77.9,0.5,76.8C-12.8,75.7,-25.6,68.8,-35.1,59.1C-44.6,49.5,-50.8,37.1,-59.2,23.2C-67.6,9.4,-78.2,-6,-75.6,-18.4C-73,-30.8,-57.2,-40.1,-43.1,-48.5C-28.9,-56.9,-14.5,-64.4,0.5,-65.2C15.6,-66,31.1,-60.9,45.4,-57.1Z"
                transform="translate(100 100)"
              />
              <defs>
                <linearGradient id="bottomBlobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={currentColors[1] || currentColors[0]} />
                  <stop offset="100%" stopColor={currentColors[2] || currentColors[0]} />
                </linearGradient>
              </defs>
            </svg>

            <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
          </div>
        );

      case "grid":
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid grid-cols-8 grid-rows-8 gap-4 opacity-30">
              {[...Array(64)].map((_, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    background: currentColors[1],
                    transform: `translate(${i % 8 * 20}px, ${Math.floor(i / 8) * 20}px)`,
                  }}
                />
              ))}
            </div>
          </div>
        );
        return (
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(${currentColors[0]} 1px, transparent 1px),
                  linear-gradient(90deg, ${currentColors[0]} 1px, transparent 1px)`,
                backgroundSize: "25px 25px",
                backgroundPosition: "0 0"
              }}
            >
              {/* Add intersection dots for better visual effect */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at center, ${currentColors[0]} 1px, transparent 1px)`,
                  backgroundSize: "25px 25px",
                  backgroundPosition: "0 0",
                  opacity: 0.8
                }}
              />
            </div>
          </div>
        );
      case "waves":
        return (
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">

              {/* Large background waves */}
              <path
                fill={currentColors[0]}
                opacity="0.15"
                d="M0,70 Q25,50 50,70 T100,70 V100 H0 Z"
              />

              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.12"
                d="M0,65 Q25,45 50,65 T100,65 V100 H0 Z"
              />

              <path
                fill={currentColors[2] || currentColors[0]}
                opacity="0.10"
                d="M0,75 Q25,55 50,75 T100,75 V100 H0 Z"
              />

              {/* Medium waves */}
              <path
                fill={currentColors[0]}
                opacity="0.20"
                d="M0,55 Q12.5,40 25,55 T50,55 T75,55 T100,55 V100 H0 Z"
              />

              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.18"
                d="M0,60 Q12.5,45 25,60 T50,60 T75,60 T100,60 V100 H0 Z"
              />

              <path
                fill={currentColors[2] || currentColors[0]}
                opacity="0.16"
                d="M0,50 Q12.5,35 25,50 T50,50 T75,50 T100,50 V100 H0 Z"
              />

              {/* Small detailed waves */}
              <path
                fill={currentColors[0]}
                opacity="0.25"
                d="M0,45 Q6.25,35 12.5,45 T25,45 T37.5,45 T50,45 T62.5,45 T75,45 T87.5,45 T100,45 V100 H0 Z"
              />

              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.22"
                d="M0,40 Q6.25,30 12.5,40 T25,40 T37.5,40 T50,40 T62.5,40 T75,40 T87.5,40 T100,40 V100 H0 Z"
              />

              <path
                fill={currentColors[2] || currentColors[0]}
                opacity="0.20"
                d="M0,35 Q6.25,25 12.5,35 T25,35 T37.5,35 T50,35 T62.5,35 T75,35 T87.5,35 T100,35 V100 H0 Z"
              />

              {/* Top waves */}
              <path
                fill={currentColors[0]}
                opacity="0.08"
                d="M0,0 Q25,15 50,0 T100,0 V25 Q75,10 50,25 T0,25 Z"
              />

              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.06"
                d="M0,5 Q25,20 50,5 T100,5 V30 Q75,15 50,30 T0,30 Z"
              />

              {/* Inverted waves from top */}
              <path
                fill={currentColors[2] || currentColors[0]}
                opacity="0.10"
                d="M0,0 V20 Q25,5 50,20 T100,20 V0 Z"
              />

              <path
                fill={currentColors[0]}
                opacity="0.08"
                d="M0,0 V15 Q25,0 50,15 T100,15 V0 Z"
              />

              {/* Side waves */}
              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.12"
                d="M0,30 Q10,20 20,30 T40,30 T60,30 Q70,20 80,30 T100,30 V70 Q90,60 80,70 T60,70 T40,70 Q30,60 20,70 T0,70 Z"
              />

              {/* Diagonal waves */}
              <path
                fill={currentColors[2] || currentColors[0]}
                opacity="0.14"
                d="M0,25 Q20,15 40,25 T80,25 T100,25 V45 Q80,35 60,45 T20,45 T0,45 Z"
              />

              <path
                fill={currentColors[0]}
                opacity="0.12"
                d="M0,80 Q20,70 40,80 T80,80 T100,80 V100 H0 Z"
              />

              {/* Micro waves for texture */}
              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.18"
                d="M0,85 Q3.125,82 6.25,85 T12.5,85 T18.75,85 T25,85 T31.25,85 T37.5,85 T43.75,85 T50,85 T56.25,85 T62.5,85 T68.75,85 T75,85 T81.25,85 T87.5,85 T93.75,85 T100,85 V100 H0 Z"
              />

              <path
                fill={currentColors[2] || currentColors[0]}
                opacity="0.16"
                d="M0,90 Q3.125,87 6.25,90 T12.5,90 T18.75,90 T25,90 T31.25,90 T37.5,90 T43.75,90 T50,90 T56.25,90 T62.5,90 T68.75,90 T75,90 T81.25,90 T87.5,90 T93.75,90 T100,90 V100 H0 Z"
              />

              {/* Additional layered waves */}
              <path
                fill={currentColors[0]}
                opacity="0.14"
                d="M0,52 Q16.67,42 33.33,52 T66.67,52 T100,52 V78 Q83.33,68 66.67,78 T33.33,78 T0,78 Z"
              />

              <path
                fill={currentColors[1] || currentColors[0]}
                opacity="0.10"
                d="M0,28 Q33.33,18 66.67,28 T100,28 V42 Q66.67,32 33.33,42 T0,42 Z"
              />

            </svg>
          </div>
        );
      case "circles":
        return (
          <div className="absolute inset-0 opacity-50 pointer-events-none">

            {/* Large background circles with borders */}
            {[...Array(8)].map((_, i) => {
              const size = 60 + Math.random() * 80;
              const top = `${Math.random() * 80}%`;
              const left = `${Math.random() * 80}%`;
              const borderWidth = 1 + Math.random() * 3;

              return (
                <div
                  key={`large-circle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    top,
                    left,
                    width: `${size}px`,
                    height: `${size}px`,
                    border: `${borderWidth}px solid ${currentColors[i % currentColors.length]}`,
                    opacity: 0.15 + Math.random() * 0.1,
                  }}
                />
              );
            })}

            {/* Medium circles with fills */}
            {[...Array(12)].map((_, i) => {
              const size = 20 + Math.random() * 40;
              const top = `${Math.random() * 90}%`;
              const left = `${Math.random() * 90}%`;
              const isFilled = Math.random() > 0.5;

              return (
                <div
                  key={`medium-circle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    top,
                    left,
                    width: `${size}px`,
                    height: `${size}px`,
                    ...(isFilled
                      ? { backgroundColor: `${currentColors[i % currentColors.length]}40` }
                      : { border: `2px solid ${currentColors[i % currentColors.length]}60` }
                    ),
                    opacity: 0.3 + Math.random() * 0.2,
                  }}
                />
              );
            })}

            {/* Small dot circles */}
            {[...Array(20)].map((_, i) => {
              const size = 3 + Math.random() * 8;
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;

              return (
                <div
                  key={`dot-circle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    top,
                    left,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: currentColors[i % currentColors.length],
                    opacity: 0.4 + Math.random() * 0.3,
                  }}
                />
              );
            })}

            {/* Concentric circles */}
            <div
              className="absolute top-8 left-8 rounded-full"
              style={{
                width: "80px",
                height: "80px",
                border: `3px solid ${currentColors[0]}`,
                opacity: 0.2,
              }}
            >
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  border: `2px solid ${currentColors[0]}`,
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute inset-6 rounded-full"
                style={{
                  backgroundColor: `${currentColors[0]}30`,
                }}
              />
            </div>

            <div
              className="absolute bottom-12 right-16 rounded-full"
              style={{
                width: "100px",
                height: "100px",
                border: `2px solid ${currentColors[1] || currentColors[0]}`,
                opacity: 0.25,
              }}
            >
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  border: `2px solid ${currentColors[1] || currentColors[0]}`,
                  opacity: 0.8,
                }}
              />
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  border: `1px solid ${currentColors[1] || currentColors[0]}`,
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute inset-6 rounded-full"
                style={{
                  backgroundColor: `${currentColors[1] || currentColors[0]}20`,
                }}
              />
            </div>

            {/* Orbital circles */}
            <div
              className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "120px",
                height: "120px",
                border: `1px solid ${currentColors[0]}30`,
                opacity: 0.3,
              }}
            >
              <div
                className="absolute top-2 left-2 rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: currentColors[0],
                }}
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: currentColors[1] || currentColors[0],
                }}
              />
              <div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-full"
                style={{
                  width: "5px",
                  height: "5px",
                  backgroundColor: currentColors[2] || currentColors[0],
                }}
              />
            </div>

            {/* Corner circles */}
            <div
              className="absolute top-4 right-4 rounded-full"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: `${currentColors[0]}20`,
                border: `2px solid ${currentColors[0]}60`,
                opacity: 0.4,
              }}
            />

            <div
              className="absolute bottom-4 left-4 rounded-full"
              style={{
                width: "70px",
                height: "70px",
                border: `3px solid ${currentColors[2] || currentColors[0]}50`,
                opacity: 0.3,
              }}
            />

            {/* Clustered circles */}
            <div className="absolute top-1/3 right-1/4">
              <div
                className="absolute rounded-full"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: `${currentColors[0]}40`,
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute top-4 left-4 rounded-full"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: `${currentColors[1] || currentColors[0]}50`,
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute top-8 left-8 rounded-full"
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: `${currentColors[2] || currentColors[0]}60`,
                  opacity: 0.8,
                }}
              />
            </div>

            <div className="absolute bottom-1/3 left-1/3">
              <div
                className="absolute rounded-full"
                style={{
                  width: "25px",
                  height: "25px",
                  border: `2px solid ${currentColors[0]}`,
                  opacity: 0.5,
                }}
              />
              <div
                className="absolute top-3 left-3 rounded-full"
                style={{
                  width: "18px",
                  height: "18px",
                  border: `2px solid ${currentColors[1] || currentColors[0]}`,
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute top-6 left-6 rounded-full"
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: currentColors[2] || currentColors[0],
                  opacity: 0.7,
                }}
              />
            </div>

            {/* Ring circles */}
            <div
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "90px",
                height: "90px",
                border: `4px solid ${currentColors[1] || currentColors[0]}30`,
                opacity: 0.4,
              }}
            >
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  border: `2px solid ${currentColors[1] || currentColors[0]}50`,
                }}
              />
            </div>

            <div
              className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 rounded-full"
              style={{
                width: "110px",
                height: "110px",
                border: `2px solid ${currentColors[2] || currentColors[0]}20`,
                opacity: 0.3,
              }}
            >
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  border: `1px solid ${currentColors[2] || currentColors[0]}40`,
                }}
              />
              <div
                className="absolute inset-6 rounded-full"
                style={{
                  border: `1px solid ${currentColors[2] || currentColors[0]}60`,
                }}
              />
            </div>

            {/* Micro dots pattern */}
            {[...Array(15)].map((_, i) => {
              const size = 2 + Math.random() * 4;
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;

              return (
                <div
                  key={`micro-dot-${i}`}
                  className="absolute rounded-full"
                  style={{
                    top,
                    left,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: currentColors[i % currentColors.length],
                    opacity: 0.5 + Math.random() * 0.3,
                  }}
                />
              );
            })}

            {/* Gradient circles */}
            <div
              className="absolute top-2/3 left-1/4 rounded-full"
              style={{
                width: "50px",
                height: "50px",
                background: `radial-gradient(circle, ${currentColors[0]}40 0%, transparent 70%)`,
                opacity: 0.6,
              }}
            />

            <div
              className="absolute top-1/5 left-2/3 rounded-full"
              style={{
                width: "40px",
                height: "40px",
                background: `radial-gradient(circle, ${currentColors[1] || currentColors[0]}50 0%, transparent 60%)`,
                opacity: 0.7,
              }}
            />

            <div
              className="absolute bottom-1/5 right-1/5 rounded-full"
              style={{
                width: "35px",
                height: "35px",
                background: `radial-gradient(circle, ${currentColors[2] || currentColors[0]}60 0%, transparent 50%)`,
                opacity: 0.8,
              }}
            />

            {/* Static connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={currentColors[0]} />
                  <stop offset="100%" stopColor={currentColors[1] || currentColors[0]} />
                </linearGradient>
              </defs>

              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="70%" y1="15%" x2="85%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="20%" y1="70%" x2="40%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="60%" y1="60%" x2="80%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="15%" y1="50%" x2="35%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="2,2" />

              <path d="M 25,25 Q 50,15 75,25" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="2,2" />
              <path d="M 20,80 Q 50,70 80,80" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" />
            </svg>
          </div>
        );
      case "triangles":
        return (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Large background triangles */}
            {[...Array(6)].map((_, i) => {
              const size = 80 + Math.random() * 120;
              const top = `${Math.random() * 90}%`;
              const left = `${Math.random() * 90}%`;
              const rotate = `${Math.random() * 360}deg`;

              return (
                <div
                  key={`bg-triangle-${i}`}
                  className="absolute"
                  style={{
                    top,
                    left,
                    width: 0,
                    height: 0,
                    opacity: 0.05,
                    transform: `rotate(${rotate})`,
                    borderLeft: `${size / 2}px solid transparent`,
                    borderRight: `${size / 2}px solid transparent`,
                    borderBottom: `${size}px solid ${currentColors[0]}`,
                    filter: 'blur(0.5px)',
                  }}
                />
              );
            })}

            {/* Small triangles scattered around */}
            {[...Array(12)].map((_, i) => {
              const size = 4 + Math.random() * 8;
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;
              const rotation = Math.random() * 360;
              const isUpward = Math.random() > 0.5;

              return (
                <div
                  key={`small-triangle-${i}`}
                  className="absolute"
                  style={{
                    left: `${left}`,
                    top: `${top}`,
                    width: 0,
                    height: 0,
                    opacity: 0.4,
                    transform: `rotate(${rotation}deg)`,
                    ...(isUpward ? {
                      borderLeft: `${size}px solid transparent`,
                      borderRight: `${size}px solid transparent`,
                      borderBottom: `${size * 1.5}px solid ${currentColors[1]}`,
                    } : {
                      borderLeft: `${size}px solid transparent`,
                      borderRight: `${size}px solid transparent`,
                      borderTop: `${size * 1.5}px solid ${currentColors[1]}`,
                    })
                  }}
                />
              );
            })}

            {/* Medium triangles in corners */}
            <div
              className="absolute"
              style={{
                top: "10%",
                right: "15%",
                width: 0,
                height: 0,
                opacity: 0.3,
                borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent",
                borderBottom: `36px solid ${currentColors[2] || currentColors[0]}`,
                transform: "rotate(-30deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                bottom: "20%",
                left: "10%",
                width: 0,
                height: 0,
                opacity: 0.25,
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                borderTop: `30px solid ${currentColors[1]}`,
                transform: "rotate(45deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: "70%",
                right: "20%",
                width: 0,
                height: 0,
                opacity: 0.35,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderBottom: `24px solid ${currentColors[2] || currentColors[0]}`,
                transform: "rotate(90deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: "25%",
                left: "25%",
                width: 0,
                height: 0,
                opacity: 0.2,
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderTop: `32px solid ${currentColors[1]}`,
                transform: "rotate(120deg)",
              }}
            />

            {/* Additional triangles in different areas */}
            <div
              className="absolute"
              style={{
                top: "40%",
                left: "70%",
                width: 0,
                height: 0,
                opacity: 0.3,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: `20px solid ${currentColors[0]}`,
                transform: "rotate(180deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: "80%",
                left: "60%",
                width: 0,
                height: 0,
                opacity: 0.25,
                borderLeft: "14px solid transparent",
                borderRight: "14px solid transparent",
                borderTop: `28px solid ${currentColors[2] || currentColors[1]}`,
                transform: "rotate(270deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: "55%",
                left: "15%",
                width: 0,
                height: 0,
                opacity: 0.4,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: `16px solid ${currentColors[1]}`,
                transform: "rotate(315deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: "15%",
                left: "50%",
                width: 0,
                height: 0,
                opacity: 0.3,
                borderLeft: "11px solid transparent",
                borderRight: "11px solid transparent",
                borderTop: `22px solid ${currentColors[0]}`,
                transform: "rotate(60deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: "35%",
                right: "40%",
                width: 0,
                height: 0,
                opacity: 0.35,
                borderLeft: "13px solid transparent",
                borderRight: "13px solid transparent",
                borderBottom: `26px solid ${currentColors[2] || currentColors[0]}`,
                transform: "rotate(150deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                bottom: "40%",
                right: "10%",
                width: 0,
                height: 0,
                opacity: 0.25,
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderTop: `18px solid ${currentColors[1]}`,
                transform: "rotate(210deg)",
              }}
            />

            {/* Central focal triangle */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                opacity: 0.15,
                borderLeft: "25px solid transparent",
                borderRight: "25px solid transparent",
                borderBottom: `50px solid ${currentColors[0]}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        );

      case "pasted-image":
        return (
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <img
              src={pastedImageUrl}
              alt="Pasted background"
              className="w-full h-full object-cover"
              style={{
                mixBlendMode: "multiply",
                filter: "brightness(0.8) contrast(1.1)"
              }}
            />
          </div>
        );
      case "blobs":
        return (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute top-10 left-10" width="120" height="120">
              <ellipse cx="60" cy="60" rx="50" ry="40" fill={currentColors[0]} opacity="0.25">
                <animate attributeName="rx" values="50;60;50" dur="4s" repeatCount="indefinite" />
                <animate attributeName="ry" values="40;45;40" dur="3s" repeatCount="indefinite" />
              </ellipse>
            </svg>
            <svg className="absolute bottom-10 right-10" width="100" height="100">
              <ellipse cx="50" cy="50" rx="40" ry="30" fill={currentColors[1] || currentColors[0]} opacity="0.2">
                <animate attributeName="ry" values="30;40;30" dur="5s" repeatCount="indefinite" />
                <animate attributeName="rx" values="40;35;40" dur="4s" repeatCount="indefinite" />
              </ellipse>
            </svg>
            <svg className="absolute top-1/2 left-1/4" width="80" height="80">
              <ellipse cx="40" cy="40" rx="35" ry="25" fill={currentColors[2] || currentColors[0]} opacity="0.15">
                <animate attributeName="rx" values="35;45;35" dur="6s" repeatCount="indefinite" />
                <animate attributeName="ry" values="25;30;25" dur="4s" repeatCount="indefinite" />
              </ellipse>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (slides.length === 0) return null;

  const slide = slides.length === 1 ? slides[0] : slides[currentSlide];

  return (
    <div
      className={forceFullSize ? "" : "space-y-4"}
      style={
        forceFullSize
          ? { width: 1080, height: 1080, background: "#fff", padding: 0, margin: 0 }
          : undefined
      }
    >
      <div className="relative" style={forceFullSize ? { width: 1080, height: 1080 } : {}}>
        <div
          className={`relative w-full h-full overflow-hidden shadow-lg ${designSettings.fontFamily} ${forceFullSize ? "" : "rounded-2xl"}`}
          style={{
            width: forceFullSize ? 1080 : undefined,
            height: forceFullSize ? 1080 : 500,
            background: currentColors[2], // Use third color as main background
            borderRadius: forceFullSize ? 0 : undefined,
          }}
        >
          {renderBackgroundPattern()}
          <div
            className={`relative z-10 ${forceFullSize ? "" : "p-6"} h-full flex flex-col transition-all duration-300`}
            style={{
              opacity: animating ? 0.5 : 1,
              pointerEvents: animating ? "none" : "auto",
              width: "100%",
              height: "100%",
              padding: forceFullSize ? 64 : undefined,
              boxSizing: "border-box",
            }}
          >
            {/* Data section: layout changes only for centered/left-aligned */}
            <div className="flex-1 flex flex-col justify-center">
              {(designSettings.slideLayout === "centered" || designSettings.slideLayout === "left-aligned" || designSettings.slideLayout === "right-aligned") ? (
                <div
                  className={
                    designSettings.slideLayout === "centered"
                      ? "flex flex-col justify-center items-center text-center space-y-3"
                        : designSettings.slideLayout === "left-aligned"
                      ? "flex flex-col justify-center items-start text-left space-y-3"
                      : "flex flex-col justify-center items-end text-right space-y-3"
                  }
                >
                  <h3 className={`${designSettings.fontSize.title} font-bold leading-tight`} style={{ color: currentColors[0] }}>{slide.title}</h3>
                  {slide.subtitle && <p className={`${designSettings.fontSize.subtitle} opacity-90`} style={{ color: currentColors[1] }}>{slide.subtitle}</p>}
                  {slide.content && (
                    <p className={`${designSettings.fontSize.content} opacity-80 leading-relaxed`} style={{ color: currentColors[1] }}>{slide.content}</p>
                  )}
                </div>
              ) : (
                // For other layouts, show data in default (centered) style
                <div className="space-y-3">
                  <h3 className={`${designSettings.fontSize.title} font-bold leading-tight`} style={{ color: currentColors[0] }}>{slide.title}</h3>
                  {slide.subtitle && <p className={`${designSettings.fontSize.subtitle} opacity-90`} style={{ color: currentColors[1] }}>{slide.subtitle}</p>}
                  {slide.content && (
                    <p className={`${designSettings.fontSize.content} opacity-80 leading-relaxed`} style={{ color: currentColors[1] }}>{slide.content}</p>
                  )}
                </div>
              )}
            </div>
            {/* Profile section always at the bottom, always left-aligned */}
            <div className="flex items-center mt-4">
              <img
                src={userProfile.avatar || "/placeholder.svg"}
                alt={userProfile.name}
                className="w-10 h-10 rounded-full border-2"
                style={{ borderColor: currentColors[1] }}
              />
              <div className="ml-3">
                <div className="text-sm font-semibold" style={{ color: currentColors[1] }}>{userProfile.name}</div>
                <div className="text-xs opacity-75" style={{ color: currentColors[1] }}>{userProfile.handle}</div>
              </div>
            </div>
          </div>
          {/* Show arrows if showArrows is true and more than one slide */}
          {showArrows && slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={animating}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextSlide}
                disabled={animating}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index, index > currentSlide ? "right" : "left")}
                className={`transition-all duration-300 rounded-full
                  ${index === currentSlide
                    ? "bg-blue-600 w-6 h-2 scale-125 opacity-100"
                    : "bg-gray-300 w-2 h-2 opacity-60 hover:opacity-90 hover:scale-110"}
                `}
                style={{
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {!isFullPreview && slides.length > 1 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">All Slides</h4>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {slides.map((slideItem, index) => (
              <button
                key={slideItem.id}
                onClick={() => handleSlideChange(index, index > currentSlide ? "right" : "left")}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentSlide ? "border-blue-500 scale-105" : "border-gray-200 hover:border-gray-300"
                  }`}
                style={{
                  background: `linear-gradient(135deg, ${currentColors[0]}, ${currentColors[1]})`,
                }}
              >
                <div className={`w-full h-full flex items-center justify-center ${textColorClass} text-xs font-medium`}>
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Global styles for animation and backgrounds */}
      <style jsx global>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-40px); opacity: 0.5; }
        }
        @keyframes slideRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(40px); opacity: 0.5; }
        }
        .animate-slide-left {
          animation: slideLeft 0.35s;
        }
        .animate-slide-right {
          animation: slideRight 0.35s;
        }
        @keyframes bgmove {
          0% { background-position: 0px 0px; }
          100% { background-position: 25px 25px; }
        }
        .bg-dots-anim {
          background-image: radial-gradient(circle, ${currentColors[0]} 3px, transparent 3px);
          background-size: 25px 25px;
          animation: bgmove 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
