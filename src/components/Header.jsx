import React from 'react';
import { ShoppingBag, QrCode, CreditCard } from 'lucide-react';

export default function Header({
  cartCount,
  cartTotal,
  onOpenCart,
  activeView,
  setActiveView,
  onOpenQRCode,
  onOpenPaymentQR
}) {
  const viewSwitcher = (
    <div className="flex w-full items-center gap-1 rounded-xl border border-[#C3DEC8] bg-[#EAF3EC] p-1 sm:w-auto">
      <button
        type="button"
        onClick={() => setActiveView('customer')}
        aria-pressed={activeView === 'customer'}
        className={`min-h-8 flex-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:flex-none ${
          activeView === 'customer'
            ? 'bg-[#1E4D3A] text-[#F4F8F5] shadow-sm'
            : 'text-[#536B5C] hover:bg-white/50 hover:text-[#1E4D3A]'
        }`}
      >
        Chọn Món
      </button>

      <button
        type="button"
        onClick={() => setActiveView('vendor')}
        aria-pressed={activeView === 'vendor'}
        className={`min-h-8 flex-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:flex-none ${
          activeView === 'vendor'
            ? 'bg-[#143527] text-[#F4F8F5] shadow-sm'
            : 'text-[#536B5C] hover:bg-white/50 hover:text-[#1E4D3A]'
        }`}
      >
        Bếp Chính
      </button>
    </div>
  );

  return (
    <header className="indochine-header sticky top-0 z-40 border-b border-[#C3DEC8] shadow-[0_4px_18px_rgba(30,77,58,0.07)]">
      <div className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <img
            src="/images/logo_hãng_xôi.jpg"
            alt="XôïS – Sắc màu cuộc sống"
            className="h-10 w-auto max-w-[118px] shrink-0 object-contain mix-blend-multiply sm:h-14 sm:max-w-[160px]"
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onOpenPaymentQR}
              className="flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-xl border border-[#BFE0C8] bg-[#E8F5EE] p-2.5 text-xs font-bold text-[#1E4D3A] shadow-sm transition-all hover:bg-[#DCF0E5] active:scale-95 sm:px-3"
              title="Mã QR chuyển khoản và số tài khoản chủ quán"
              aria-label="Mở mã QR thanh toán"
            >
              <CreditCard className="h-4 w-4 text-[#2E7D52]" />
              <span className="hidden md:inline">Thanh toán</span>
            </button>

            <div className="hidden sm:block">
              {viewSwitcher}
            </div>

            <button
              type="button"
              onClick={onOpenQRCode}
              className="hidden min-h-10 items-center gap-1 rounded-xl border border-[#C3DEC8] px-3 py-2 text-xs font-semibold text-[#536B5C] transition-colors hover:bg-[#EAF3EC] hover:text-[#1E4D3A] md:flex"
              title="In mã QR đặt món dán bàn hoặc quầy"
            >
              <QrCode className="h-4 w-4" />
              <span>In QR Bàn</span>
            </button>

            {activeView === 'customer' && (
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex min-h-10 items-center gap-1.5 rounded-xl border border-[#143527] bg-[#1E4D3A] px-3.5 py-2 text-xs font-bold text-[#F4F8F5] shadow-md transition-all hover:bg-[#143527] active:scale-95"
                aria-label={cartCount > 0 ? `Mở giỏ hàng, có ${cartCount} món` : 'Mở giỏ hàng'}
              >
                <ShoppingBag className="h-4 w-4 text-[#74C69D]" />
                <span>{cartTotal > 0 ? `${cartTotal.toLocaleString()}đ` : 'Giỏ'}</span>
                {cartCount > 0 && (
                  <span className="ml-0.5 rounded-full border border-white/30 bg-[#2E7D52] px-1.5 text-[10px] font-bold text-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <nav className="mt-1.5 sm:hidden" aria-label="Chuyển chế độ xem">
          {viewSwitcher}
        </nav>
      </div>
    </header>
  );
}
