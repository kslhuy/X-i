import React from 'react';
import { X, QrCode, Printer, ShieldCheck } from 'lucide-react';
import { STALL_INFO } from '../data/menuData';

export default function QRCodeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentUrl)}&color=1E4D3A&bgcolor=F4F8F5`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143527]/60 backdrop-blur-sm animate-slide-up">
      <div className="bg-[#F4F8F5] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#C3DEC8] p-6 text-center space-y-4">
        
        <div className="flex justify-between items-center border-b border-[#D4E7D8] pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#2E7D52]" />
            <h3 className="font-heading font-bold text-base text-[#1D2A22]">Mã QR Đặt Món Dán Bàn / Quán</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#536B5C] hover:text-[#1D2A22]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Stall Sign Frame */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#2E7D52]/40 space-y-3 shadow-xs">
          <div className="inline-flex items-center gap-1 bg-[#1E4D3A] text-[#F4F8F5] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 text-[#74C69D]" /> Quét Mã Xem Thực Đơn & Đặt Xôi
          </div>
          
          <h2 className="text-xl font-bold text-[#1D2A22] font-heading">
            {STALL_INFO.name}
          </h2>
          <p className="text-xs text-[#2E7D52] font-semibold">
            {STALL_INFO.origin} • {STALL_INFO.businessType}
          </p>

          <div className="relative inline-block bg-[#F4F8F5] p-3 rounded-2xl shadow-inner border border-[#D4E7D8] my-1">
            <img
              src={qrApiUrl}
              alt="Mã QR Đặt Xôi Phú Thượng"
              className="w-48 h-48 mx-auto object-contain"
            />
            <div className="text-[10px] font-bold text-[#1E4D3A] mt-1.5 font-heading">
              Gìn giữ hương vị xôi làng nghề truyền thống
            </div>
          </div>

          <div className="text-[11px] text-[#536B5C] font-medium">
            Quý khách dùng Camera điện thoại hoặc Zalo quét mã để chọn món
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5 border border-[#143527]"
          >
            <Printer className="w-4 h-4" />
            <span>In Bảng QR Dán Quán</span>
          </button>
          <button
            onClick={onClose}
            className="bg-[#E8F5EE] hover:bg-[#DCF0E5] text-[#1D2A22] font-bold text-xs py-3 px-4 rounded-xl transition-colors border border-[#BFE0C8]"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}


