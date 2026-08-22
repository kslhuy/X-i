import React, { useState } from 'react';
import { X, Send, User, ShoppingBag, CreditCard, MessageSquare, AlertCircle } from 'lucide-react';
import { STALL_INFO } from '../data/menuData';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  pricing, 
  onCompleteOrder,
  onOpenPaymentQR 
}) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('EAT_HERE'); // EAT_HERE | TAKEAWAY | WHOLESALE
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleAutofillTag = (tag) => {
    setCustomerName(tag);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError('Vui lòng nhập tên hoặc số bàn/thẻ nhận diện (VD: Bàn 03, Chị Thu)');
      return;
    }

    const orderTypeLabel = 
      orderType === 'EAT_HERE' ? 'Ăn tại chỗ' : 
      orderType === 'TAKEAWAY' ? 'Đóng gói mang về' : 'Đặt bán buôn / Mâm cỗ';

    onCompleteOrder({
      orderId: 'XP-' + Math.floor(100 + Math.random() * 900),
      customer: {
        name: customerName,
        phone: orderTypeLabel,
        address: orderTypeLabel,
        paymentMethod: 'Tiền mặt hoặc Chuyển khoản QR',
        timeSlot: 'Trực tiếp tại quán'
      },
      cart,
      pricing,
      note,
      orderType,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143527]/60 backdrop-blur-sm animate-slide-up">
      <div className="bg-[#F4F8F5] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#C3DEC8] p-6 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#D4E7D8] pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#1E4D3A] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full border border-[#BFE0C8]">
              Làng Nghề Phú Thượng
            </span>
            <h3 className="font-heading font-bold text-lg text-[#1D2A22] mt-0.5">Xác Nhận Đơn Xôi</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#536B5C] hover:text-[#1D2A22]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Customer Identifier */}
          <div>
            <label className="text-xs font-bold text-[#1D2A22] mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#2E7D52]" /> Tên / Số Bàn / Số Thẻ Nhận Diện *
            </label>
            <input
              type="text"
              placeholder="VD: Bàn 02, Anh Hùng, Chị Mai..."
              value={customerName}
              onChange={(e) => { setCustomerName(e.target.value); setError(''); }}
              className="w-full text-xs p-3 bg-white border border-[#C3DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4D3A] font-medium text-[#1D2A22]"
            />
            {error && <p className="text-[11px] text-[#9E4334] mt-1 font-semibold">{error}</p>}

            {/* Quick Fill Tags */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
              <span className="text-[10px] text-[#869E90] font-semibold shrink-0">Chọn nhanh:</span>
              {['Bàn 01', 'Bàn 02', 'Bàn 03', 'Mang Về 01', 'Mang Về 02'].map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleAutofillTag(tag)}
                  className="bg-[#E8F5EE] text-[#1E4D3A] text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-[#DCF0E5] transition-colors shrink-0 border border-[#BFE0C8]"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Service Option */}
          <div>
            <label className="text-xs font-bold text-[#1D2A22] mb-1.5 block">Hình thức phục vụ:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('EAT_HERE')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  orderType === 'EAT_HERE'
                    ? 'bg-[#1E4D3A] text-[#F4F8F5] border-[#1E4D3A] shadow-xs'
                    : 'bg-white text-[#536B5C] border-[#C3DEC8] hover:border-[#1E4D3A]'
                }`}
              >
                Ăn Tại Quán
              </button>

              <button
                type="button"
                onClick={() => setOrderType('TAKEAWAY')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  orderType === 'TAKEAWAY'
                    ? 'bg-[#1E4D3A] text-[#F4F8F5] border-[#1E4D3A] shadow-xs'
                    : 'bg-white text-[#536B5C] border-[#C3DEC8] hover:border-[#1E4D3A]'
                }`}
              >
                Mang Về
              </button>

              <button
                type="button"
                onClick={() => setOrderType('WHOLESALE')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  orderType === 'WHOLESALE'
                    ? 'bg-[#2E7D52] text-white border-[#2E7D52] shadow-xs'
                    : 'bg-white text-[#536B5C] border-[#C3DEC8] hover:border-[#2E7D52]'
                }`}
              >
                Đặt Bán Buôn / Cỗ
              </button>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs font-bold text-[#1D2A22] mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#2E7D52]" /> Ghi chú cho bếp (nhiều vừng, không hành...)
            </label>
            <input
              type="text"
              placeholder="VD: Không lấy hành phi, cho thêm muối vừng..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-[#C3DEC8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1E4D3A]"
            />
          </div>

          {/* Summary Box */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#D4E7D8] text-xs space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-[#536B5C]">Tổng tiền ({cart.reduce((s,i)=>s+i.quantity,0)} phần xôi):</span>
              <span className="text-[#1E4D3A] font-bold text-base font-heading">
                {pricing.finalTotal.toLocaleString()}đ
              </span>
            </div>

            <div className="pt-2 border-t border-[#EAF3EC] flex items-center justify-between text-[11px] text-[#536B5C]">
              <span>Thanh toán: Tiền mặt hoặc Chuyển khoản</span>
              {onOpenPaymentQR && (
                <button
                  type="button"
                  onClick={onOpenPaymentQR}
                  className="text-[#2E7D52] font-bold underline hover:text-[#1E4D3A] flex items-center gap-1"
                >
                  <CreditCard className="w-3 h-3 text-[#2E7D52]" />
                  <span>Mã QR Chủ Quán</span>
                </button>
              )}
            </div>
          </div>

          {/* Notice */}
          <div className="text-[11px] text-[#1E4D3A] bg-[#E8F5EE] p-2.5 rounded-xl border border-[#BFE0C8] flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#2E7D52] shrink-0 mt-0.5" />
            <span>Quán chưa hỗ trợ giao hàng tận nơi. Quý khách vui lòng nhận xôi tại quán hoặc gửi ship đến lấy.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 border border-[#143527]"
          >
            <Send className="w-4 h-4" />
            <span>GỬI ĐƠN CHO BẾP NGAY</span>
          </button>

        </form>

      </div>
    </div>
  );
}

