import React from 'react';
import ItemCard from './ItemCard';
import { UtensilsCrossed } from 'lucide-react';

export default function MenuSection({ menuItems, onAddToCart }) {
  return (
    <section id="menu-section" className="py-6 px-4 max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between mb-5 border-b border-[#D4E7D8] pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1D2A22] tracking-tight flex items-center gap-2 font-heading">
            <UtensilsCrossed className="w-4 h-4 text-[#2E7D52]" />
            <span>Thực Đơn Xôi Truyền Thống</span>
          </h2>
          <p className="text-xs text-[#536B5C] mt-0.5">Xôi nóng thơm phức đồ mới mỗi sáng • Bấm (+) để thêm món</p>
        </div>
        <span className="text-xs text-[#1E4D3A] font-semibold bg-[#E8F5EE] px-3 py-1 rounded-full border border-[#BFE0C8] hidden sm:inline-block">
          Bán buôn & Bán lẻ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

    </section>
  );
}

