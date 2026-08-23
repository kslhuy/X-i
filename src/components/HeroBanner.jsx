import React from 'react';
import { Store, AlertCircle, CreditCard, ChevronRight } from 'lucide-react';

export default function HeroBanner({ onQuickOrder, onOpenPaymentQR }) {
  return (
    <section className="px-4 py-4 sm:py-5">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#D4E7D8] bg-white p-5 shadow-xs sm:rounded-3xl sm:p-7">
        
        {/* Subtle decorative background watermark in tea green */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#E8F5EE] border border-[#C3DEC8] -z-0 opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          {/* Banner Left Information */}
          <div className="space-y-2.5 flex-1">
            
            {/* Main Title */}
            <div>
              <h1 className="font-heading text-[22px] font-bold leading-[1.22] tracking-tight text-[#1D2A22] sm:text-3xl sm:leading-snug">
                XôïS — <strong>LÀNG NGHỀ PHÚ THƯỢNG</strong>
              </h1>
              <p className="text-xs sm:text-sm text-[#536B5C] mt-1 font-body leading-relaxed">
                Đặc sản xôi nếp cái hoa vàng chuẩn vị làng nghề Phú Thượng — đồ bằng chõ gỗ cổ truyền, hạt dẻo ráo ngậy, mộc mạc thơm hương.
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-[#1D2A22] bg-[#F4F9F6] px-3 py-2 rounded-xl border border-[#D4E7D8]">
                <Store className="w-4 h-4 text-[#2E7D52] shrink-0" />
                <span><strong>Bán buôn & Bán lẻ</strong> hàng ngày</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#1E4D3A] bg-[#E8F5EE] px-3 py-2 rounded-xl border border-[#BFE0C8]">
                <AlertCircle className="w-4 h-4 text-[#2E7D52] shrink-0" />
                <span>Chưa hỗ trợ giao hàng — Phục vụ tại quán & mang về</span>
              </div>
            </div>

          </div>

          {/* Quick Actions Column */}
          <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5">
            <button
              onClick={onQuickOrder}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#143527] bg-[#1E4D3A] px-6 py-3.5 text-xs font-bold text-[#F4F8F5] shadow-md transition-all hover:bg-[#143527] active:scale-98 sm:text-sm"
            >
              <span>Mẹt Xôi Ngũ Sắc Đặc Biệt</span>
              <ChevronRight className="w-4 h-4 text-[#74C69D]" />
            </button>

            <button
              onClick={onOpenPaymentQR}
              className="bg-[#E8F5EE] hover:bg-[#DCF0E5] text-[#1E4D3A] font-bold text-xs px-4 py-2.5 rounded-xl border border-[#BFE0C8] transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#2E7D52]" />
              <span>Xem Số TK & Mã QR Chủ Quán</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
