import React from 'react';
import { Phone, MapPin, Clock, CreditCard, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';
import { STALL_INFO, WHOLESALE_SERVICES } from '../data/menuData';

export default function Footer({ onQuickOrder, onOpenPaymentQR }) {
  return (
    <footer id="store-info" className="bg-[#122B1E] text-[#E8F5EE] pt-12 pb-8 border-t border-[#254E3A] mt-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Wholesale & Service Introduction Cards */}
        <div className="mb-10 p-5 sm:p-6 bg-[#183626] rounded-3xl border border-[#254E3A] space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#254E3A] pb-3">
            <div>
              <span className="text-[10px] font-bold text-[#74C69D] uppercase tracking-wider bg-[#122B1E] px-2.5 py-0.5 rounded-full border border-[#2E6B4B]">
                Dịch Vụ Bán Buôn (Sỉ) & Bán Lẻ
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-1">
                Nhận Đặt Xôi Cỗ, Sự Kiện & Hội Nghị Số Lượng Lớn
              </h3>
            </div>
            <a
              href={`tel:${STALL_INFO.hotline}`}
              className="bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5 self-start sm:self-auto shadow-md border border-[#52B788]/40"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {STALL_INFO.hotline}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {WHOLESALE_SERVICES.map((srv, idx) => (
              <div key={idx} className="bg-[#122B1E]/80 p-3.5 rounded-2xl border border-[#254E3A] space-y-1">
                <h4 className="font-heading font-bold text-xs text-[#74C69D]">{srv.title}</h4>
                <p className="text-[11px] text-[#A3C7B2] leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Columns Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#254E3A]">
          
          {/* Column 1: Brand & Heritage Origin */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#52B788]/50 shrink-0 bg-white">
                <img src="/images/logo_hãng_xôi.jpg" alt="XôïS Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-white leading-none">XôïS</h4>
                <p className="text-[11px] text-[#74C69D] font-medium mt-0.5">Xôi Truyền Thống Phú Thượng</p>
              </div>
            </div>
            <p className="text-xs text-[#A3C7B2] leading-relaxed">
              Kế thừa tinh hoa nghề nấu xôi cổ truyền làng Phú Thượng (Tây Hồ, Hà Nội). Cam kết 100% màu sắc thảo mộc thiên nhiên, hạt nếp dẻo thơm nguyên bản.
            </p>
            <div className="text-[11px] text-[#74C69D] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
              <span>Xuất xứ: {STALL_INFO.origin}</span>
            </div>
          </div>

          {/* Column 2: Hours & Delivery Notice */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#74C69D] uppercase tracking-wider">
              Thời Gian & Phục Vụ
            </h4>
            <div className="space-y-2 text-xs text-[#E8F5EE]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#74C69D] shrink-0" />
                <span>Giờ bán: <strong>{STALL_INFO.openHours}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <span>Địa chỉ: <strong>{STALL_INFO.address}</strong></span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#183626] border border-[#2E6B4B] text-[11px] text-[#74C69D] space-y-0.5">
                <div className="font-bold">Lưu ý phục vụ:</div>
                <p className="text-[#A3C7B2]">{STALL_INFO.deliveryPolicy}</p>
              </div>
            </div>
          </div>

          {/* Column 3: Direct Payment & QR */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#74C69D] uppercase tracking-wider flex items-center justify-between">
              <span>Chuyển Khoản & Quét QR</span>
              <CreditCard className="w-4 h-4 text-[#74C69D]" />
            </h4>
            
            <div className="bg-[#183626] p-3 rounded-2xl border border-[#254E3A] space-y-1.5 text-xs">
              <div className="text-[11px] text-[#A3C7B2]">
                Ngân hàng: <strong className="text-white">{STALL_INFO.bank.bankName}</strong>
              </div>
              <div className="text-[11px] text-[#A3C7B2] flex items-center justify-between">
                <span>STK: <strong className="text-[#74C69D] font-mono text-sm">{STALL_INFO.bank.accountNumber}</strong></span>
                <span className="text-[10px] text-[#A3C7B2] uppercase">{STALL_INFO.bank.accountHolder}</span>
              </div>
              
              <button
                onClick={onOpenPaymentQR}
                className="w-full mt-2 bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs py-2 rounded-xl border border-[#52B788]/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#A7F3D0]" />
                <span>Mở Mã QR Của Chủ Quán</span>
              </button>
            </div>

            <p className="text-[10px] text-[#869E90] italic">
              Khách có thể thanh toán tiền mặt trực tiếp hoặc quét QR qua mọi ứng dụng ngân hàng.
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-[#7A9585]">
          © {new Date().getFullYear()} <strong>{STALL_INFO.name}</strong> • Tinh Hoa Xôi Truyền Thống Phú Thượng
        </div>

      </div>
    </footer>
  );
}


