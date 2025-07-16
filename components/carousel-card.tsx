"use client"

import EditableText from "@/components/editable-text"
import React from "react";

interface CarouselCardProps {
  selectedPalette: number
  backgroundElement: string
  backgroundEnabled: boolean
  content: {
    heading: string
    subheading: string
    bodyText: string
    profileName: string
    profileHandle: string
  }
  onContentChange: (content: any) => void
  showArrows?: boolean // <-- add this prop for navigation
}

export default function CarouselCard({
  selectedPalette,
  backgroundElement,
  backgroundEnabled,
  content,
  onContentChange,
  showArrows = false, // <-- default to false
}: CarouselCardProps) {
  const colorPalettes = [
    { colors: ["#22223b", "#fdf6ee", "#b48a5a"] },
    { colors: ["#1a202c", "#f7fafc", "#2d3748"] },
    { colors: ["#fff", "#22223b", "#b48a5a"] },
    { colors: ["#8B5CF6", "#EC4899", "#F59E0B"], bg: "from-purple-500 to-pink-500" },
    { colors: ["#3B82F6", "#10B981", "#F59E0B"], bg: "from-blue-500 to-emerald-500" },
    { colors: ["#EF4444", "#F97316", "#FBBF24"], bg: "from-red-500 to-orange-500" },
    { colors: ["#6366F1", "#8B5CF6", "#EC4899"], bg: "from-indigo-500 to-purple-500" },
    { colors: ["#059669", "#0891B2", "#7C3AED"], bg: "from-emerald-500 to-cyan-500" },
    { colors: ["#DC2626", "#7C2D12", "#92400E"], bg: "from-red-600 to-yellow-600" },
    { colors: ["#1F2937", "#374151", "#6B7280"], bg: "from-gray-800 to-gray-600" },
    { colors: ["#BE185D", "#C2410C", "#A16207"], bg: "from-rose-600 to-orange-600" },
  ]

  // Use the selected palette for color arrangement
  const currentPalette = colorPalettes[selectedPalette] || colorPalettes[0];
  const textColor = currentPalette.colors[0]; // 1st color for text
  const designElementColor = currentPalette.colors[1];   // 2nd color for design elements
  const bgColor = currentPalette.colors[2]; // 3rd color for background

  const renderBackgroundPattern = () => {
    if (!backgroundEnabled) return null;

    const patternClass = "absolute inset-0 pointer-events-none";

    switch (backgroundElement) {
      case "Dots":
        // Aligned dot grid using CSS grid
        return (
          <>
            <div className={`${patternClass} grid grid-cols-8 grid-rows-8 gap-4 opacity-30`}>
              {[...Array(64)].map((_, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: designElementColor,
                  }}
                />
              ))}
            </div>
          </>
        );
      case "Grid":
        // Aligned grid lines using absolutely positioned divs
        return (
          <>
            <div className={patternClass} style={{ opacity: 0.18 }}>
              {/* Vertical lines */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={`v${i}`}
                  className="absolute bg-gray-400"
                  style={{
                    left: `${((i + 1) * 100) / 8}%`,
                    top: 0,
                    width: "1px",
                    height: "100%",
                    background: designElementColor,
                  }}
                />
              ))}
              {/* Horizontal lines */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={`h${i}`}
                  className="absolute bg-gray-400"
                  style={{
                    top: `${((i + 1) * 100) / 8}%`,
                    left: 0,
                    height: "1px",
                    width: "100%",
                    background: designElementColor,
                  }}
                />
              ))}
            </div>
          </>
        );
      case "Triangles":
        return (
          <>
            <div className={patternClass}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-transparent border-b-white animate-bounceTriangle"
                  style={{
                    top: `${Math.random() * 90}%`,
                    left: `${Math.random() * 90}%`,
                    transform: `rotate(${i * 60}deg)`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                ></div>
              ))}
            </div>
            <style jsx>{`
              @keyframes bounceTriangle {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.3) rotate(15deg); }
              }
              .animate-bounceTriangle {
                animation: bounceTriangle 3s ease-in-out infinite;
              }
            `}</style>
          </>
        );

      case "Blobs":
        return (
          <>
            <div className={patternClass}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white opacity-70 animate-blob"
                  style={{
                    width: `${20 + i * 10}px`,
                    height: `${20 + i * 10}px`,
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
            <style jsx>{`
              @keyframes blob {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.5) rotate(30deg); }
              }
              .animate-blob {
                animation: blob 4s ease-in-out infinite;
              }
            `}</style>
          </>
        );

      case "Boxes":
        return (
          <>
            <div className={patternClass}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white opacity-80 animate-boxPulse"
                  style={{
                    width: `${15 + i * 5}px`,
                    height: `${15 + i * 5}px`,
                    top: `${Math.random() * 85}%`,
                    left: `${Math.random() * 85}%`,
                    transform: `rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                ></div>
              ))}
            </div>
            <style jsx>{`
              @keyframes boxPulse {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
                50% { transform: scale(1.4) rotate(45deg); opacity: 1; }
              }
              .animate-boxPulse {
                animation: boxPulse 3.5s ease-in-out infinite;
              }
            `}</style>
          </>
        );

      case "Circles":
        return (
          <>
            <div className={patternClass}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-2 animate-circleRipple"
                  style={{
                    borderColor: designElementColor,
                    width: `${30 + i * 15}px`,
                    height: `${30 + i * 15}px`,
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
            <style jsx>{`
              @keyframes circleRipple {
                0% { transform: scale(0.8); opacity: 0.7; }
                50% { transform: scale(1.5); opacity: 1; }
                100% { transform: scale(0.8); opacity: 0.7; }
              }
              .animate-circleRipple {
                animation: circleRipple 5s ease-in-out infinite;
              }
            `}</style>
          </>
        );

      default:
        return null;
    }
  }

  // Helper for dynamic text color class
  function getTextColorClass(color: string) {
    // Only supports hex colors, fallback to text-black
    return color ? '' : 'text-black';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between animate-fadeInUp">
        {/* Polka-dot pattern - Top Right */}
        <div className="absolute top-6 right-6 z-0 animate-float">
          <PolkaDots />
        </div>
        {/* Polka-dot pattern - Bottom Left */}
        <div className="absolute bottom-6 left-6 z-0 animate-float-reverse">
          <PolkaDots />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            {content.heading}
          </h1>
          <p className="text-lg md:text-xl font-medium text-accent">
            {content.subheading}
          </p>
          {/* Add bodyText if you want to show it */}
          {content.bodyText && (
            <p className="text-base md:text-lg text-text-primary">{content.bodyText}</p>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative z-10 mt-8 flex items-center group transition-all duration-200">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-pattern shadow
              transition-transform duration-200 group-hover:scale-105"
          />
          <div className="ml-4">
            <div className="font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
              {content.profileName}
            </div>
            <div className="text-sm text-pattern transition-colors duration-200 group-hover:text-accent">
              {content.profileHandle}
            </div>
          </div>
        </div>
        {/* Navigation arrows (if showArrows is true) */}
        {showArrows && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button
              className="pointer-events-auto bg-white/70 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow transition"
              // onClick={handlePrev} // Implement slide navigation if you have multiple cards
              disabled
            >
              {/* Left Arrow SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 17l-5-5 5-5"/></svg>
            </button>
            <button
              className="pointer-events-auto bg-white/70 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow transition"
              // onClick={handleNext} // Implement slide navigation if you have multiple cards
              disabled
            >
              {/* Right Arrow SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7l5 5-5 5"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Polka-dot SVG pattern
function PolkaDots() {
  return (
    <svg width="60" height="60" style={{ opacity: 0.7 }}>
      {[...Array(4)].map((_, row) =>
        [...Array(4)].map((_, col) => (
          <circle
            key={row * 4 + col}
            cx={col * 16 + 4}
            cy={row * 16 + 4}
            r="3"
            fill="var(--color-pattern)"
          />
        ))
      )}
    </svg>
  );
}
