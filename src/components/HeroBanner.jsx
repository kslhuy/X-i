import React from 'react';
import { Sparkles, MapPin, Store, AlertCircle, CreditCard, ChevronRight } from 'lucide-react';

export default function HeroBanner({ onQuickOrder, onOpenPaymentQR }) {
  return (
    <section className="py-5 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-7 border border-[#D4E7D8] shadow-xs relative overflow-hidden">
        
        {/* Subtle decorative background watermark in tea green */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#E8F5EE] border border-[#C3DEC8] -z-0 opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          {/* Banner Left Information */}
          <div className="space-y-2.5 flex-1">
            
            {/* Main Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#1D2A22] tracking-tight leading-snug">
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
              className="bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 border border-[#143527]"
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
