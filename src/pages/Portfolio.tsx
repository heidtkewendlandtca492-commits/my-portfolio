import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';

const projects = [
  // 替换文字：修改 title。替换图片：修改 cover, bg, images。替换视频：修改 video。
  {
    id: 1,
    title: '神陨前年',
    cover: '/神陨封面.png',
    bg: '/神陨背景.png',
    video: '/神陨演示.mp4',
    images: [
      '/神陨展示1.png',
      '/神陨展示2.png',
      '/神陨展示3.png',
    ]
  },
  {
    id: 2,
    title: 'Project Beta',
    cover: 'https://picsum.photos/seed/p2/400/400',
    bg: 'https://picsum.photos/seed/bg2/1920/1080?blur=4',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://picsum.photos/seed/i5/800/600',
      'https://picsum.photos/seed/i6/800/600',
      'https://picsum.photos/seed/i7/800/600',
      'https://picsum.photos/seed/i8/800/600',
    ]
  },
  {
    id: 3,
    title: 'Project Gamma',
    cover: 'https://picsum.photos/seed/p3/400/400',
    bg: 'https://picsum.photos/seed/bg3/1920/1080?blur=4',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://picsum.photos/seed/i9/800/600',
      'https://picsum.photos/seed/i10/800/600',
      'https://picsum.photos/seed/i11/800/600',
      'https://picsum.photos/seed/i12/800/600',
    ]
  },
  {
    id: 4,
    title: 'Project Delta',
    cover: 'https://picsum.photos/seed/p4/400/400',
    bg: 'https://picsum.photos/seed/bg4/1920/1080?blur=4',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://picsum.photos/seed/i13/800/600',
      'https://picsum.photos/seed/i14/800/600',
      'https://picsum.photos/seed/i15/800/600',
      'https://picsum.photos/seed/i16/800/600',
    ]
  },
  {
    id: 5,
    title: 'Project Epsilon',
    cover: 'https://picsum.photos/seed/p5/400/400',
    bg: 'https://picsum.photos/seed/bg5/1920/1080?blur=4',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://picsum.photos/seed/i17/800/600',
      'https://picsum.photos/seed/i18/800/600',
      'https://picsum.photos/seed/i19/800/600',
      'https://picsum.photos/seed/i20/800/600',
      'https://picsum.photos/seed/i21/800/600',
      'https://picsum.photos/seed/i22/800/600',
      'https://picsum.photos/seed/i23/800/600',
      'https://picsum.photos/seed/i24/800/600',
      'https://picsum.photos/seed/i25/800/600',
    ]
  },
];

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [arcOffset, setArcOffset] = useState(0);
  const [isArcHovered, setIsArcHovered] = useState(false);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    setArcOffset(activeIndex);
  }, [activeIndex]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling.current) return;
    if (Math.abs(e.deltaY) < 30) return;

    if (e.deltaY > 0) {
      if (activeIndex < projects.length - 1) {
        isScrolling.current = true;
        setActiveIndex(prev => prev + 1);
        setTimeout(() => isScrolling.current = false, 800);
      } else {
        isScrolling.current = true;
        navigate('/workflow');
      }
    } else if (e.deltaY < 0) {
      if (activeIndex > 0) {
        isScrolling.current = true;
        setActiveIndex(prev => prev - 1);
        setTimeout(() => isScrolling.current = false, 800);
      } else {
        isScrolling.current = true;
        navigate('/');
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (deltaY > 50) {
      if (activeIndex < projects.length - 1) {
        isScrolling.current = true;
        setActiveIndex(prev => prev + 1);
        setTimeout(() => isScrolling.current = false, 800);
      } else {
        isScrolling.current = true;
        navigate('/workflow');
      }
    } else if (deltaY < -50) {
      if (activeIndex > 0) {
        isScrolling.current = true;
        setActiveIndex(prev => prev - 1);
        setTimeout(() => isScrolling.current = false, 800);
      } else {
        isScrolling.current = true;
        navigate('/');
      }
    }
  };

  const scrollToProject = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <motion.div 
      className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden relative font-sans"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
                idx === 0 ? 'text-white font-medium scale-110' : 'text-white/40 hover:text-white/80 hover:scale-105'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Left Arc Menu */}
      <div 
        className="fixed left-0 top-0 h-full z-40"
        style={{ width: isArcHovered ? '160px' : '100px' }}
        onMouseEnter={() => setIsArcHovered(true)}
        onMouseLeave={() => {
          setIsArcHovered(false);
          setArcOffset(activeIndex);
        }}
        onWheel={(e) => {
          e.stopPropagation(); // Prevent page scroll when scrolling arc
          setArcOffset(prev => {
            const newOffset = prev + e.deltaY * 0.003;
            return Math.max(0, Math.min(projects.length - 1, newOffset));
          });
        }}
      >
        {/* Decorative Arc Line */}
        <div 
          className="absolute top-1/2 w-[600px] h-[600px] -translate-y-1/2 rounded-full border border-white/5 pointer-events-none transition-all duration-500" 
          style={{ left: isArcHovered ? '-450px' : '-500px' }}
        />
        
        {projects.map((project, idx) => {
          const radius = isArcHovered ? 550 : 450;
          const centerX = isArcHovered ? -450 : -400;
          
          const offset = idx - arcOffset;
          const angleStep = isArcHovered ? (Math.PI / 12) : (Math.PI / 18);
          const angle = offset * angleStep;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          const screenX = centerX + x;
          const screenY = `calc(50vh + ${y}px)`;

          const isActive = idx === activeIndex;
          const isVisible = Math.abs(offset) <= (isArcHovered ? 3.5 : 4.5);

          return (
            <motion.div
              key={project.id}
              className="absolute w-20 h-28 md:w-24 md:h-32 rounded-xl overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 border-white/10"
              style={{
                marginTop: '-3.5rem',
                marginLeft: '-3rem',
                zIndex: isActive ? 50 : 40 - Math.floor(Math.abs(offset)),
              }}
              initial={false}
              animate={{
                top: screenY,
                left: screenX,
                rotate: offset * 15, // 卡牌随弧度旋转
                scale: isActive ? 1.1 : (isArcHovered ? 0.8 : 0.6),
                opacity: isVisible ? (1 - Math.abs(offset) * 0.2) : 0,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              whileHover={{ scale: 1.2, zIndex: 60, opacity: 1 }}
              onClick={() => scrollToProject(idx)}
            >
              <img src={project.cover} alt={project.title} className="w-full h-full object-cover pointer-events-none" referrerPolicy="no-referrer" />
              {/* 替换图片：修改 project.cover 的 URL */}
              {isActive && <div className="absolute inset-0 ring-2 ring-white/50 rounded-xl pointer-events-none" />}
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Scroll Container */}
      <motion.div 
        className="h-full w-full flex flex-col"
        animate={{ y: `-${activeIndex * 100}vh` }}
        transition={{ type: 'spring', stiffness: 70, damping: 20, mass: 0.8 }}
      >
        {projects.map((project, idx) => (
          <ProjectSection key={project.id} project={project} isActive={idx === activeIndex} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ProjectSection({ project, isActive }: { project: any, isActive: boolean }) {
  const [isHoveringImages, setIsHoveringImages] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isActive) {
      videoRef.current?.pause();
    }
  }, [isActive]);

  // Deterministic random values for scattered images
  const scatteredTransforms = useMemo(() => {
    return project.images.map((_: any, idx: number) => {
      // Pseudo-random based on index and project id
      const seed = project.id * 10 + idx;
      const randomRotate = (seed % 30) - 15; // -15 to 15 degrees
      const randomX = ((seed * 13) % 60) - 30; // -30 to 30 px
      const randomY = ((seed * 17) % 60) - 30; // -30 to 30 px
      return { rotate: randomRotate, x: randomX, y: randomY };
    });
  }, [project.id, project.images.length]);

  return (
    <div className="h-screen w-full shrink-0 relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={project.bg} alt="bg" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pt-24 pb-12 px-12 md:px-32">
        
        {/* Main Video */}
        <div className="relative w-full max-w-[70%] md:max-w-[60%] max-h-[70vh] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black flex items-center justify-center z-20 md:mr-auto md:ml-48">
          <video 
            ref={videoRef}
            src={project.video} 
            controls
            playsInline
            loop
            className="w-full h-full max-h-[70vh] object-contain opacity-90"
          />
          {/* 替换视频：修改 project.video 的 URL。使用 object-contain 保证视频比例不被裁剪 */}
        </div>

        {/* Bottom Right: Scattered Images */}
        <div className="absolute bottom-16 right-8 md:bottom-24 md:right-24 w-[280px] h-[200px] md:w-[440px] md:h-[280px] z-30 flex items-center justify-center">
          {/* 缩小触发区域，仅在图片堆叠的中心区域触发 */}
          <div 
            className="relative flex items-center justify-center w-full h-full"
            onMouseEnter={() => setIsHoveringImages(true)}
            onMouseLeave={() => setIsHoveringImages(false)}
          >
            {project.images.map((img: string, idx: number) => {
              const transform = scatteredTransforms[idx];
              
              // Determine grid size based on number of images
              const is3x3 = project.images.length > 4;
              const cols = is3x3 ? 3 : 2;
              
              // Grid positions for hover effect
              const row = Math.floor(idx / cols);
              const col = idx % cols;
              
              // Calculate grid spacing based on container size
              // For 3x3, we need smaller images to fit
              const imgWidth = is3x3 ? 120 : 190;
              const imgHeight = is3x3 ? 85 : 135;
              const gapX = 15;
              const gapY = 15;
              
              // Center offset
              const offsetX = (cols - 1) / 2;
              const offsetY = (Math.ceil(project.images.length / cols) - 1) / 2;
              
              const gridX = (col - offsetX) * (imgWidth + gapX);
              const gridY = (row - offsetY) * (imgHeight + gapY);

              return (
                <motion.div
                  key={idx}
                  className="absolute rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]"
                  style={{
                    width: isHoveringImages ? imgWidth : (is3x3 ? 145 : 215),
                    height: isHoveringImages ? imgHeight : (is3x3 ? 95 : 145),
                  }}
                  initial={false}
                  animate={{
                    x: isHoveringImages ? gridX : transform.x,
                    y: isHoveringImages ? gridY : transform.y,
                    rotate: isHoveringImages ? 0 : transform.rotate,
                    scale: isHoveringImages ? 1.05 : 1,
                    zIndex: isHoveringImages ? 50 + idx : project.images.length - idx,
                  }}
                  transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.5 }}
                >
                  <img src={img} alt="process" className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" referrerPolicy="no-referrer" />
                  {/* 替换图片：修改 project.images 中的 URL。使用 object-contain 保证图片比例不被裁剪 */}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
