import React from 'react';
import { CATEGORIES } from '../constants';

interface HeroProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[400px]">
        {/* Categories Sidebar (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:block w-64 bg-white rounded-md shadow-sm overflow-y-auto flex-shrink-0">
          <ul className="py-2">
            {CATEGORIES.map((cat) => (
              <li 
                key={cat.id}
                className={`px-4 py-2.5 flex items-center gap-3 hover:text-primary cursor-pointer transition-colors ${activeCategory === cat.id ? 'text-primary font-bold bg-orange-50' : 'text-gray-600'}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <i className={`fa-solid ${cat.icon} w-5 text-center`}></i>
                <span className="text-sm">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Banner Slider */}
        <div className="flex-1 bg-gray-200 rounded-md overflow-hidden relative group">
          <img 
            src="https://picsum.photos/id/20/1000/400" 
            alt="Promo Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">Big Summer Sale</h2>
            <p className="text-lg md:text-xl mb-6 max-w-md">Up to 70% off on Electronics, Fashion, and more. Limited time offer!</p>
            <button className="bg-primary hover:bg-accent text-white font-bold py-3 px-8 rounded-full w-fit transition-transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </div>
          
          {/* Slider Arrows (Decorative) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <i className="fa-solid fa-chevron-left text-2xl"></i>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <i className="fa-solid fa-chevron-right text-2xl"></i>
          </button>
        </div>

        {/* Right Promo Box (Hidden on smaller tablets) */}
        <div className="hidden lg:flex flex-col gap-4 w-60 flex-shrink-0">
          <div className="flex-1 bg-white rounded-md p-4 shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer">
             <i className="fa-solid fa-phone-volume text-3xl text-primary mb-2 group-hover:scale-110 transition-transform"></i>
             <h4 className="font-bold text-gray-800">Call to Order</h4>
             <p className="text-xs text-gray-500 mt-1">0800-LUMINA</p>
          </div>
          <div className="flex-1 bg-white rounded-md overflow-hidden shadow-sm relative group cursor-pointer">
             <img src="https://picsum.photos/id/119/300/200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Promo" />
             <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2 text-white text-center text-sm font-bold">
               Flash Deals
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;