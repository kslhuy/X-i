import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, CreditCard } from 'lucide-react';

export default function OrderSuccessModal({ orderDetails, onClose, onOpenPaymentQR }) {
  useEffect(() => {
    if (!orderDetails) return;
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#1E4D3A', '#2E7D52', '#52B788', '#E8F5EE']
    });
  }, [orderDetails]);

  if (!orderDetails) return null;

  const isWholesale = orderDetails.orderType === 'WHOLESALE' || orderDetails.pricing?.requiresQuote;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143527]/60 backdrop-blur-md animate-slide-up">
      <div className="bg-[#F4F8F5] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#C3DEC8] text-center p-6 space-y-4">
        
        <div className="w-14 h-14 bg-[#E8F5EE] text-[#2E7D52] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#BFE0C8]">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div>
          <span className="bg-[#E8F5EE] text-[#1E4D3A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#BFE0C8]">
            Đã Tiếp Nhận Đơn Hàng
          </span>
          <h2 className="text-xl font-bold text-[#1D2A22] font-heading mt-2">
            {isWholesale ? 'Quán Đã Nhận Yêu Cầu' : 'Bếp Đang Chuẩn Bị Xôi...'}
          </h2>
          <p className="text-xs text-[#536B5C] mt-1 font-body">
            {isWholesale ? (
              <>Cảm ơn <strong>{orderDetails.customer.name}</strong>! Quán sẽ liên hệ để chốt giá/kg, khối lượng và thời gian nhận.</>
            ) : (
              <>Cảm ơn quý khách <strong>{orderDetails.customer.name}</strong>! Vui lòng giữ số nhận diện và đợi nhận xôi nóng tại quán.</>
            )}
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#D4E7D8] text-center space-y-1 shadow-xs">
          <div className="text-[10px] text-[#869E90] font-semibold uppercase">Mã Đơn Của Quý Khách</div>
          <div className="text-xl font-bold text-[#1E4D3A] font-heading tracking-wider">{orderDetails.orderId}</div>
          <div className="text-xs font-bold text-[#1D2A22] pt-1.5 border-t border-[#EAF3EC] flex justify-between px-2">
            <span className="text-[#536B5C]">{isWholesale ? 'Trạng thái giá:' : 'Tổng tiền:'}</span>
            <span className="font-heading font-bold text-[#1E4D3A]">
              {isWholesale ? 'Chờ quán báo giá' : `${orderDetails.pricing.finalTotal.toLocaleString()}đ`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {!isWholesale && <button
            onClick={() => {
              onClose();
              if (onOpenPaymentQR) {
                onOpenPaymentQR(orderDetails.pricing.finalTotal, orderDetails.orderId);
              }
            }}
            className="w-full bg-[#E8F5EE] hover:bg-[#DCF0E5] text-[#1E4D3A] font-bold text-xs py-3 rounded-xl border border-[#BFE0C8] transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#2E7D52]" />
            <span>Mở Mã QR Chuyển Khoản Ngay</span>
          </button>}

          <button
            onClick={onClose}
            className="w-full bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs py-3 rounded-xl shadow-md transition-all border border-[#143527]"
          >
            Đã Hiểu / Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
