// components/Logo.tsx
import React from "react";

const Logo: React.FC = () => {
  const cubeSize = 36; // size of the cube in pixels
  const halfSize = cubeSize / 2;

  const cubeContainerStyle: React.CSSProperties = {
    width: `${cubeSize}px`,
    height: `${cubeSize}px`,
    perspective: "1000px",
  };

  const cubeStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transform: "rotateX(-25deg) rotateY(-35deg)",
  };

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: `${cubeSize}px`,
    height: `${cubeSize}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="inline-block">
      <div className="flex items-center space-x-4">
        {/* 3D Cube */}
        <div style={cubeContainerStyle}>
          <div style={cubeStyle}>
            {/* Left Face (visibly) */}
            <div
              style={{
                ...faceStyle,
                background: "linear-gradient(135deg, #adadad 0%, #555555 100%)",
                transform: `rotateY(0deg) translateZ(${halfSize}px)`,
                boxShadow: "inset 0 0 10px #000000",
                border: "1px solid white",
              }}
            >
              <span
                className="text-white text-lg font-bold"
                style={{ textShadow: "0 0 5px rgba(255,255,255,0.5)" }}
              >
                T
              </span>
            </div>
            {/* Top Face - with glossy effect */}
            <div
              style={{
                ...faceStyle,
                background: "linear-gradient(to bottom, #bbbbbb, #888888)",
                transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                border: "1px solid white",
              }}
            >
              <span
                className="text-white text-lg font-bold"
                style={{ textShadow: "0 0 5px rgba(255,255,255,0.5)" }}
              >
                H
              </span>
            </div>
            {/* Right Face - with glossy effect */}
            <div
              style={{
                ...faceStyle,
                background: "linear-gradient(to top, #888888, #555555)",
                transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                border: "1px solid white",
              }}
            >
              <span
                className="text-white text-lg font-bold"
                style={{ textShadow: "0 0 5px rgba(255,255,255,0.5)" }}
              >
                R
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="leading-tight">
          <div className="text-sm font-extrabold text-black">HEALTH</div>
          <div className="text-sm font-extrabold text-black">
            TRANSFORMATION
          </div>
          <div className="text-sm font-extrabold text-black">REVIEW</div>
        </div>
      </div>
      {/* Separator and Tagline */}
      <div className="mt-0.2 w-full">
        <div className="w-full border-t border-gray-400" />
        <div
          className="mt-2 text-white text-[10px] font-bold py-1 px-2 rounded-md inline-block tracking-normal"
          style={{
            background: "#555555",
          }}
        >
          DECODING THE VALUE TRANSITION
        </div>
      </div>
    </div>
  );
};

export default Logo;
