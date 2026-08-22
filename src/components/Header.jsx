import React from 'react';
import { ShoppingBag, QrCode, Store, Sparkles, CreditCard } from 'lucide-react';
import { STALL_INFO } from '../data/menuData';

export default function Header({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  activeView, 
  setActiveView, 
  onOpenQRCode,
  onOpenPaymentQR 
}) {
  return (
    <header className="sticky top-0 z-40 indochine-header shadow-xs border-b border-[#C3DEC8]">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        
        {/* The logo already includes the brand name and slogan. */}
        <img
          src="/images/logo_hãng_xôi.jpg"
          alt="XôïS – Sắc màu cuộc sống"
          className="h-14 sm:h-16 w-auto max-w-[150px] sm:max-w-[180px] object-contain shrink-0"
        />

        {/* Action Buttons */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2">
          
          {/* Bank Payment QR Quick Trigger */}
          <button
            onClick={onOpenPaymentQR}
            className="p-2 sm:px-3 sm:py-1.5 text-[#1E4D3A] bg-[#E8F5EE] hover:bg-[#DCF0E5] rounded-xl transition-all border border-[#BFE0C8] flex items-center gap-1.5 text-xs font-bold shadow-xs"
            title="Mã QR Chuyển Khoản & STK Chủ Quán"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#2E7D52]" />
            <span className="hidden sm:inline">Chuyển Khoản / STK</span>
          </button>

          {/* View Switcher: Customer vs Kitchen */}
          <div className="bg-[#EAF3EC] p-0.5 rounded-xl flex items-center gap-0.5 border border-[#C3DEC8]">
            <button
              onClick={() => setActiveView('customer')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'customer'
                  ? 'bg-[#1E4D3A] text-[#F4F8F5] shadow-xs'
                  : 'text-[#536B5C] hover:text-[#1E4D3A]'
              }`}
            >
              <span>Chọn Món</span>
            </button>

            <button
              onClick={() => setActiveView('vendor')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'vendor'
                  ? 'bg-[#143527] text-[#F4F8F5] shadow-xs'
                  : 'text-[#536B5C] hover:text-[#1E4D3A]'
              }`}
            >
              <span>Bếp Chính</span>
            </button>
          </div>

          {/* Table/Wall QR Printable Code */}
          <button
            onClick={onOpenQRCode}
            className="p-2 text-[#536B5C] hover:text-[#1E4D3A] hover:bg-[#EAF3EC] rounded-xl transition-colors border border-[#C3DEC8] hidden md:flex items-center gap-1 text-xs font-semibold"
            title="In Mã QR Đặt Món Dán Bàn / Quầy"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>In QR Bàn</span>
          </button>

          {/* Quick Cart Button */}
          {activeView === 'customer' && (
            <button
              onClick={onOpenCart}
              className="relative bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95 border border-[#143527]"
            >
              <ShoppingBag className="w-4 h-4 text-[#74C69D]" />
              <span>{cartTotal > 0 ? `${cartTotal.toLocaleString()}đ` : 'Giỏ'}</span>
              {cartCount > 0 && (
                <span className="bg-[#2E7D52] text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full ml-0.5 shadow-xs border border-white/30">
                  {cartCount}
                </span>
              )}
            </button>
          )}

        </div>

      </div>
    </header>
  );
}

