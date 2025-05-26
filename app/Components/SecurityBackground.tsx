import React from 'react';

export default function SecurityBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Shield pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,rgba(14,165,233,0)_50%)]" />
      
      {/* Security shield icons */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-16">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-8">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold transform transition-transform hover:scale-110 cursor-pointer"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`
              }}
            >
              🔒
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
