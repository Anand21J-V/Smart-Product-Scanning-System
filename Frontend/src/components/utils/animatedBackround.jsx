import { useEffect, useRef } from "react";

const AnimatedBackground = ({ imageSrc, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = container.getBoundingClientRect();

      const xPercentage = ((clientX - left) / width - 0.5) * 5; // -2.5% to 2.5%
      const yPercentage = ((clientY - top) / height - 0.5) * 5;

      container.style.transform = `scale(1.05) translate(${xPercentage}px, ${yPercentage}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-200 ease-out"
      >
        <img
          src={imageSrc}
          alt="Background"
          className={`absolute inset-0 w-full h-full object-cover ${className || ''}`}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
