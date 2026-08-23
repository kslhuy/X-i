import React from 'react';
import { Flame, Plus, Scale } from 'lucide-react';

export default function ItemCard({ item, onAddToCart }) {
  const isWholesale = item.saleMode === 'wholesale';
  const addQuantity = item.minQuantity || item.step || 1;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#D4E7D8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-3.5 group hover:border-[#ADCDB3]">
      
      <div className="flex gap-3.5">
        {/* Thumbnail Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#E8F5EE] shrink-0 border border-[#C3DEC8]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80";
            }}
          />
          {item.badge && (
            <span className="absolute top-1 left-1 bg-[#1E4D3A]/90 backdrop-blur-xs text-[#F4F8F5] text-[9px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              {item.badge === 'Món bán chạy' && <Flame className="h-2.5 w-2.5 text-[#FFD166]" />}
              <span>{item.badge}</span>
            </span>
          )}
        </div>

        {/* Dish Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-[#1D2A22] line-clamp-1 group-hover:text-[#2E7D52] transition-colors">
              {item.name}
            </h3>
            <p className="text-[11px] text-[#2E7D52] font-semibold mt-0.5 line-clamp-1">
              {item.subtitle}
            </p>
            <p className="text-[11px] text-[#536B5C] line-clamp-2 mt-1 leading-snug font-body">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EAF3EC]">
            <span className="text-base font-bold text-[#1E4D3A] font-heading">
              {isWholesale ? (
                <span className="flex items-center gap-1.5 text-sm">
                  <Scale className="h-3.5 w-3.5" />
                  Báo giá theo kg
                </span>
              ) : (
                `${item.price.toLocaleString()}đ`
              )}
            </span>

            <button
              onClick={() => onAddToCart(item)}
              className="bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1 active:scale-95 border border-[#143527]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isWholesale ? `Thêm ${addQuantity} kg` : 'Thêm'}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

