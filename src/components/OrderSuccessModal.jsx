import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Utensils } from 'lucide-react';

export default function OrderSuccessModal({ orderDetails, onClose }) {
  if (!orderDetails) return null;

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#059669', '#F59E0B', '#34D399']
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-slide-up">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-emerald-200 text-center p-6 space-y-4">
        
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
            Đã Gửi Đơn Thành Công!
          </span>
          <h2 className="text-xl font-black text-slate-900 font-heading mt-1">
            Bếp Đang Đồ Xôi Nóng Hổi...
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Cảm ơn <strong>{orderDetails.customer.name}</strong>! Vui lòng giữ thẻ hoặc đợi tại quán trong giây lát.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-center space-y-1">
          <div className="text-[10px] text-emerald-800 font-bold uppercase">Mã Đơn Của Bạn</div>
          <div className="text-xl font-black text-emerald-950 font-mono tracking-widest">{orderDetails.orderId}</div>
          <div className="text-xs font-bold text-emerald-900 pt-1 border-t border-emerald-200/60">
            Tổng tiền: {orderDetails.pricing.finalTotal.toLocaleString()}đ (Trả sau)
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all"
        >
          Xong / Đặt Thêm Phần Khác
        </button>

      </div>
    </div>
  );
}
