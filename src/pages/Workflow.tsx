import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';

const images = [
  // 替换图片：修改 images 数组中的 URL
  'https://picsum.photos/seed/w1/800/1200',
  'https://picsum.photos/seed/w2/1200/800',
  'https://picsum.photos/seed/w3/800/800',
  'https://picsum.photos/seed/w4/1200/1200',
  'https://picsum.photos/seed/w5/800/1000',
  'https://picsum.photos/seed/w6/1000/800',
];

export default function Workflow() {
  const navigate = useNavigate();
  const isNavigating = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;
      const isAtTop = window.scrollY <= 0;
      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;

      if (e.deltaY < -30 && isAtTop) {
        isNavigating.current = true;
        navigate('/portfolio');
      } else if (e.deltaY > 30 && isAtBottom) {
        isNavigating.current = true;
        navigate('/tools');
      }
    };
    
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  return (
    <motion.div 
      className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans pb-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center gap-16 p-8 mix-blend-difference">
        <button
          onClick={() => navigate('/')}
          className="absolute left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <HomeIcon size={20} />
          <span className="text-sm tracking-widest uppercase">主页</span>
          {/* 替换文字：修改“主页”文字 */}
        </button>
        {['作品集', '工作流', '工具开发'].map((item, idx) => {
          // 替换文字：修改导航栏的文字
          const paths = ['/portfolio', '/workflow', '/tools'];
          return (
            <button
              key={item}
              onClick={() => navigate(paths[idx])}
              className={`text-sm tracking-[0.3em] uppercase transition-all duration-500 ${
                idx === 1 ? 'text-white font-medium scale-110' : 'text-white/40 hover:text-white/80 hover:scale-105'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="pt-32 px-8 md:px-16 max-w-[1600px] mx-auto">
        <div className="columns-1 md:columns-2 gap-12 space-y-12">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={img} alt="workflow" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
              {/* 替换图片：修改 images 数组中的 URL */}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
