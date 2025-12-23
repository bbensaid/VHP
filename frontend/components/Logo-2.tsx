import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <svg width="80" height="96" viewBox="0 0 100 120">
          <g transform="translate(0, 15)">
            <polygon points="35,35 85,35 50,0 0,0" fill="#1d4ed8" />
            <polygon points="85,35 85,85 50,50 50,0" fill="#047857" />
            <polygon points="35,35 85,35 85,85 35,85" fill="#4338ca" />
            <text
              x="60"
              y="60"
              fontSize="20"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              HTR
            </text>
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center">
          <div
            className="text-2xl font-bold leading-[0.8] text-black"
            style={{
              fontSize: '2rem',
              letterSpacing: '0.05em',
            }}
          >
            HEALTH
          </div>
          <div
            className="text-2xl font-bold leading-[0.8] text-black"
            style={{
              fontSize: '2rem',
              letterSpacing: '0.05em',
            }}
          >
            TRANSFORMATION
          </div>
        </div>
        <div className="relative mt-2 flex items-center justify-center">
          <div
            className="absolute left-0 top-1/2 w-full border-t border-black"
            style={{
              transform: 'translateY(-50%)',
            }}
          ></div>
          <div className="z-10 bg-white px-2">
            <div className="rounded-md bg-black px-3 py-1">
              <span className="text-sm font-bold text-white">
                DECODING THE VALUE TRANSITION
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
