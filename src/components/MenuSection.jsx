import React from 'react';
import ItemCard from './ItemCard';
import { Scale, ShoppingBasket, Sparkles, UtensilsCrossed } from 'lucide-react';

export default function MenuSection({
  menuItems,
  wholesaleItems,
  orderMode,
  onChangeOrderMode,
  onAddToCart
}) {
  const isWholesale = orderMode === 'wholesale';
  const displayedItems = isWholesale ? wholesaleItems : menuItems;
  const mainWholesaleItems = displayedItems.filter(item => item.wholesaleGroup === 'main');
  const wholesaleAddons = displayedItems.filter(item => item.wholesaleGroup === 'addon');

  const renderGrid = (items) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );

  return (
    <section id="menu-section" className="mx-auto max-w-4xl px-4 pb-6 pt-8">

      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-[#C3DEC8] bg-white p-1.5 shadow-xs">
        <button
          type="button"
          onClick={() => onChangeOrderMode('retail')}
          aria-pressed={!isWholesale}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition-all sm:text-sm ${
            !isWholesale
              ? 'bg-[#1E4D3A] text-white shadow-md'
              : 'text-[#536B5C] hover:bg-[#EAF3EC] hover:text-[#1E4D3A]'
          }`}
        >
          <ShoppingBasket className="h-4 w-4" />
          <span>Bán lẻ · theo phần</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeOrderMode('wholesale')}
          aria-pressed={isWholesale}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition-all sm:text-sm ${
            isWholesale
              ? 'bg-[#1E4D3A] text-white shadow-md'
              : 'text-[#536B5C] hover:bg-[#EAF3EC] hover:text-[#1E4D3A]'
          }`}
        >
          <Scale className="h-4 w-4" />
          <span>Bán buôn · theo kg</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-5 border-b border-[#D4E7D8] pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1D2A22] tracking-tight flex items-center gap-2 font-heading">
            {isWholesale ? (
              <Scale className="w-4 h-4 text-[#2E7D52]" />
            ) : (
              <UtensilsCrossed className="w-4 h-4 text-[#2E7D52]" />
            )}
            <span>{isWholesale ? 'Đặt Xôi Bán Buôn Theo Cân' : 'Thực Đơn Xôi Truyền Thống'}</span>
          </h2>
          {isWholesale && (
            <p className="text-xs text-[#536B5C] mt-0.5">
              Chọn số kg cần đặt • Giá được quán xác nhận sau khi nhận yêu cầu
            </p>
          )}
        </div>
        <span className="text-xs text-[#1E4D3A] font-semibold bg-[#E8F5EE] px-3 py-1 rounded-full border border-[#BFE0C8] hidden sm:inline-block">
          {isWholesale ? 'Đơn vị: kg' : 'Đơn vị: phần'}
        </span>
      </div>

      {isWholesale ? (
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E4D3A]">
              <Sparkles className="h-3.5 w-3.5 text-[#2E7D52]" />
              Các loại xôi bán buôn
            </h3>
            {renderGrid(mainWholesaleItems)}
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#536B5C]">Món phụ đặt thêm</h3>
            {renderGrid(wholesaleAddons)}
          </div>
        </div>
      ) : renderGrid(displayedItems)}

    </section>
  );
}
