import React from 'react';
import { ShoppingBag, QrCode, Store, Sparkles, Volume2 } from 'lucide-react';
import { STALL_INFO } from '../data/menuData';

export default function Header({ cartCount, cartTotal, onOpenCart, activeView, setActiveView, onOpenQRCode }) {
  return (
    <header className="sticky top-0 z-40 glass-header shadow-sm border-b border-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
            <img src="/images/logo_hãng_xôi.jpg" alt="XôïS Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-emerald-900 tracking-tight">
                XôïS
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Xôi Chay Lề Đường
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium line-clamp-1">
              "Xôi iiii Sờ" • Đặt Hàng 1-Touch Siêu Tốc
            </p>
          </div>
        </div>

        {/* View Switcher: Customer vs Owner Mode */}
        <div className="flex items-center gap-2">
          
          <div className="bg-emerald-100/80 p-1 rounded-xl flex items-center gap-1 border border-emerald-200">
            <button
              onClick={() => setActiveView('customer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeView === 'customer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-900 hover:bg-emerald-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Khách Đặt</span>
            </button>

            <button
              onClick={() => setActiveView('vendor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeView === 'vendor'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-emerald-900 hover:bg-emerald-200/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Bếp Live</span>
            </button>
          </div>

          {/* QR Code Printable Modal Button */}
          <button
            onClick={onOpenQRCode}
            className="p-2 text-emerald-800 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200 hidden sm:flex items-center gap-1 text-xs font-semibold"
            title="In Mã QR Đặt Hàng Tại Quán"
          >
            <QrCode className="w-4 h-4 text-emerald-700" />
            <span>Mã QR</span>
          </button>

          {/* Quick Cart Button */}
          {activeView === 'customer' && (
            <button
              onClick={onOpenCart}
              className="relative bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{cartTotal > 0 ? `${cartTotal.toLocaleString()}đ` : 'Giỏ'}</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full ml-0.5">
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
