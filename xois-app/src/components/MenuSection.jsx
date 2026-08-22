import React from 'react';
import { MENU_ITEMS } from '../data/menuData';
import ItemCard from './ItemCard';
import { Utensils } from 'lucide-react';

export default function MenuSection({ onAddToCart }) {
  return (
    <section id="menu-section" className="py-6 px-4 max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-heading">
          <Utensils className="w-4 h-4 text-emerald-600" />
          <span>Danh Sách Món Xôi Chay Nóng Hổi</span>
        </h2>
        <span className="text-xs text-emerald-700 font-medium">Bấm (+) để thêm nhanh</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {MENU_ITEMS.map((item) => (
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
