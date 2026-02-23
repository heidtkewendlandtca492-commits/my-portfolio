import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';

const tools = [
  // 替换图片：修改 img 的 URL。替换文字：修改 title 和 desc。
  { img: 'file:///D:/Users/Administrator/Desktop/%E5%90%83%E7%A5%9E%E8%80%85/%E6%9D%80%E6%89%8B%E7%8E%B0%E5%9C%BA_1770618756192.png', title: '你哈哈', desc: '这是一个测试图片' },
  { img: 'https://picsum.photos/seed/t2/800/600', title: 'Tool Two', desc: 'An automated script for batch processing.' },
  { img: 'https://picsum.photos/seed/t3/800/600', title: 'Tool Three', desc: 'A plugin for seamless integration.' },
  { img: 'https://picsum.photos/seed/t4/800/600', title: 'Tool Four', desc: 'A utility for color management.' },
];

export default function Tools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans pb-24">
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
                idx === 2 ? 'text-white font-medium scale-110' : 'text-white/40 hover:text-white/80 hover:scale-105'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="pt-32 px-8 md:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tools.map((tool, idx) => (
            <motion.div 
              key={idx}
              className="group rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={tool.img} 
                  alt={tool.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                {/* 替换图片：修改 tools 数组中的 img URL */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-medium mb-2">{tool.title}</h3>
                {/* 替换文字：修改 tool.title */}
                <p className="text-white/60">{tool.desc}</p>
                {/* 替换文字：修改 tool.desc */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
