import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const sections = [
  // 替换图片：修改 image 的 URL。替换文字：修改 title 的文字
  { id: 'portfolio', title: '作品集', path: '/portfolio', image: 'https://picsum.photos/seed/portfolio/1920/1080?blur=2' },
  { id: 'workflow', title: '工作流', path: '/workflow', image: 'https://picsum.photos/seed/workflow/1920/1080?blur=2' },
  { id: 'tools', title: '工具开发', path: '/tools', image: 'https://picsum.photos/seed/tools/1920/1080?blur=2' },
];

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const isNavigating = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (isNavigating.current) return;
    if (e.deltaY > 30) {
      isNavigating.current = true;
      navigate('/portfolio');
    }
  };

  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isNavigating.current) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (deltaY > 50) {
      isNavigating.current = true;
      navigate('/portfolio');
    }
  };

  return (
    <motion.div 
      className="h-screen w-full bg-[#0a0a0a] flex overflow-hidden p-4 gap-4 font-sans"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className="relative h-full rounded-2xl overflow-hidden cursor-pointer group"
          initial={{ flex: 1 }}
          animate={{ flex: hovered === section.id ? 2.5 : hovered ? 0.75 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          onMouseEnter={() => setHovered(section.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate(section.path)}
        >
          <img 
            src={section.image} 
            alt={section.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
          <div 
            className="absolute inset-0 bg-black/40 transition-opacity duration-700" 
            style={{ opacity: hovered === section.id ? 0.1 : 0.6 }} 
          />
          <div className="absolute bottom-12 left-12">
            <motion.h2 
              className="text-white text-4xl md:text-6xl font-light tracking-widest uppercase"
              animate={{ y: hovered === section.id ? 0 : 10, opacity: hovered === section.id ? 1 : 0.7 }}
              transition={{ duration: 0.4 }}
            >
              {section.title}
              {/* 替换文字：修改 section.title */}
            </motion.h2>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
