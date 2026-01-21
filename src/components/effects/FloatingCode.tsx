"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeSnippets = [
  { code: "const app = express();", lang: "js" },
  { code: "function deploy() {}", lang: "ts" },
  { code: "<Component />", lang: "jsx" },
  { code: "npm run build", lang: "bash" },
  { code: "git push origin", lang: "git" },
  { code: "SELECT * FROM", lang: "sql" },
  { code: "docker compose up", lang: "docker" },
  { code: "await fetch(api)", lang: "js" },
  { code: "export default", lang: "ts" },
  { code: "interface Props {}", lang: "ts" },
  { code: "useEffect(() => {})", lang: "react" },
  { code: "async/await", lang: "js" },
  { code: "@tailwind base", lang: "css" },
  { code: "python manage.py", lang: "py" },
  { code: "mongoDB.connect()", lang: "js" },
];

interface FloatingElement {
  id: number;
  snippet: { code: string; lang: string };
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function FloatingCode() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = [];
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      });
    }
    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{ left: `${el.x}%`, top: `${el.y}%` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            y: [20, -20, -40, -60],
            x: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="px-3 py-1.5 rounded-lg bg-dark-900/60 backdrop-blur-sm border border-dark-700/30 font-mono text-xs">
            <span className="text-violet-400">{el.snippet.lang}</span>
            <span className="text-dark-500 mx-1">|</span>
            <span className="text-emerald-400/70">{el.snippet.code}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
