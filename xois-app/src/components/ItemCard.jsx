import React from 'react';
import { Plus, Flame, Sparkles } from 'lucide-react';

export default function ItemCard({ item, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-emerald-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-3.5 group">
      
      <div className="flex gap-3">
        {/* Thumbnail Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80";
            }}
          />
          {item.isPopular && (
            <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
              HOT
            </span>
          )}
        </div>

        {/* Dish Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
              {item.name}
            </h3>
            <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
              {item.subtitle}
            </p>
            <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-50">
            <span className="text-base font-black text-emerald-950 font-heading">
              {item.price.toLocaleString()}đ
            </span>

            <button
              onClick={() => onAddToCart(item)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition-all flex items-center gap-1 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Thêm</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
