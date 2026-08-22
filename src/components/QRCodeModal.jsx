import React from 'react';
import { X, QrCode, Printer, Sparkles, Check, ExternalLink } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const currentUrl = window.location.href;
  // Use public QR Code API service to render standard high-res QR code image
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentUrl)}&color=047857&bgcolor=ECFDF5`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-slide-up">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-emerald-200 p-6 text-center space-y-4">
        
        <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-600" />
            <h3 className="font-heading font-bold text-base text-slate-900">Mã QR Quét Đặt Hàng Tại Quán</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Stall Sign Frame */}
        <div className="bg-emerald-50/80 p-6 rounded-2xl border-2 border-dashed border-emerald-400 space-y-3">
          <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Quét QR Đặt Xôi Nhanh 1-Touch
          </div>
          <h2 className="text-xl font-black text-emerald-950 font-heading">
            XôïS — Xôi Chay Lề Đường
          </h2>
          <p className="text-xs text-emerald-800">
            Khách hàng quét mã bằng điện thoại (Zalo / Camera) để chọn món ngay lập tức!
          </p>

          <div className="relative inline-block bg-white p-3 rounded-2xl shadow-md border border-emerald-200 my-2">
            <img
              src={qrApiUrl}
              alt="Mã QR Quét Đặt Xôi"
              className="w-52 h-52 mx-auto object-contain"
            />
            <div className="text-[10px] font-bold text-emerald-800 mt-1">
              "Xôi iiii Sờ" • Chay Năng Lượng
            </div>
          </div>

          <div className="text-[11px] text-slate-600 font-medium">
            ✔ Không cần tải ứng dụng • Không cần đăng ký • Nhận hàng thu tiền sau
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>In Bảng QR Dán Quán</span>
          </button>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
