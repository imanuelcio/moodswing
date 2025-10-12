import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const SentimentWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw multiple wave layers with different colors
      const waves = [
        {
          color: "rgba(220, 38, 38, 0.3)",
          speed: 0.01,
          amplitude: 30,
          offset: 0,
        },
        {
          color: "rgba(79, 70, 229, 0.2)",
          speed: 0.015,
          amplitude: 25,
          offset: 20,
        },
        {
          color: "rgba(16, 185, 129, 0.15)",
          speed: 0.008,
          amplitude: 35,
          offset: 40,
        },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * 0.01 + time * wave.speed) * wave.amplitude +
            Math.sin(x * 0.02 + time * wave.speed * 1.5) *
              (wave.amplitude * 0.5) +
            wave.offset;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[300px] rounded-xl overflow-hidden glass-card"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
    </motion.div>
  );
};
