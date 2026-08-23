import React, { useState } from 'react';
import { X, Send, User, CreditCard, MessageSquare, AlertCircle, CalendarClock, Phone, Scale } from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  pricing, 
  orderMode,
  onCompleteOrder,
  onOpenPaymentQR 
}) {
  const isWholesale = orderMode === 'wholesale';
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [orderType, setOrderType] = useState(isWholesale ? 'WHOLESALE' : 'EAT_HERE'); // EAT_HERE | TAKEAWAY | WHOLESALE
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAutofillTag = (tag) => {
    setCustomerName(tag);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError(isWholesale
        ? 'Vui lòng nhập tên người đặt hoặc tên cửa hàng.'
        : 'Vui lòng nhập tên hoặc số bàn/thẻ nhận diện (VD: Bàn 03, Chị Thu)');
      return;
    }

    const normalizedPhone = phone.replace(/\s/g, '');
    if (isWholesale && !/^(?:\+84|0)\d{9,10}$/.test(normalizedPhone)) {
      setError('Vui lòng nhập số điện thoại hợp lệ để quán liên hệ báo giá.');
      return;
    }

    const orderTypeLabel = 
      orderType === 'EAT_HERE' ? 'Ăn tại chỗ' : 
      orderType === 'TAKEAWAY' ? 'Đóng gói mang về' : 'Đặt bán buôn / Mâm cỗ';

    onCompleteOrder({
      orderId: 'XP-' + Math.floor(100 + Math.random() * 900),
      customer: {
        name: customerName,
        phone: isWholesale ? normalizedPhone : orderTypeLabel,
        address: orderTypeLabel,
        paymentMethod: 'Tiền mặt hoặc Chuyển khoản QR',
        timeSlot: isWholesale ? (pickupTime || 'Trao đổi khi quán liên hệ') : 'Trực tiếp tại quán'
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
            <h3 className="font-heading font-bold text-lg text-[#1D2A22] mt-0.5">
              {isWholesale ? 'Gửi Yêu Cầu Bán Buôn' : 'Xác Nhận Đơn Xôi'}
            </h3>
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
              <User className="w-3.5 h-3.5 text-[#2E7D52]" />
              {isWholesale ? 'Tên người đặt / Cửa hàng *' : 'Tên / Số Bàn / Số Thẻ Nhận Diện *'}
            </label>
            <input
              type="text"
              placeholder={isWholesale ? 'VD: Cửa hàng An Phúc, Anh Hùng...' : 'VD: Bàn 02, Anh Hùng, Chị Mai...'}
              value={customerName}
              onChange={(e) => { setCustomerName(e.target.value); setError(''); }}
              className="w-full text-xs p-3 bg-white border border-[#C3DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4D3A] font-medium text-[#1D2A22]"
            />
            {error && <p className="text-[11px] text-[#9E4334] mt-1 font-semibold">{error}</p>}

            {!isWholesale && (
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
            )}
          </div>

          {isWholesale && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 flex items-center gap-1 text-xs font-bold text-[#1D2A22]">
                  <Phone className="h-3.5 w-3.5 text-[#2E7D52]" /> Số điện thoại *
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="VD: 0987 654 321"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(''); }}
                  className="w-full rounded-xl border border-[#C3DEC8] bg-white p-3 text-xs font-medium text-[#1D2A22] focus:outline-none focus:ring-2 focus:ring-[#1E4D3A]"
                />
              </label>
              <label className="block">
                <span className="mb-1 flex items-center gap-1 text-xs font-bold text-[#1D2A22]">
                  <CalendarClock className="h-3.5 w-3.5 text-[#2E7D52]" /> Thời gian muốn nhận
                </span>
                <input
                  type="datetime-local"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full rounded-xl border border-[#C3DEC8] bg-white p-3 text-xs font-medium text-[#1D2A22] focus:outline-none focus:ring-2 focus:ring-[#1E4D3A]"
                />
              </label>
            </div>
          )}

          {/* Service Option */}
          {!isWholesale ? (
          <div>
            <label className="text-xs font-bold text-[#1D2A22] mb-1.5 block">Hình thức phục vụ:</label>
            <div className="grid grid-cols-2 gap-2">
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

            </div>
          </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded-xl border border-[#BFE0C8] bg-[#E8F5EE] p-3 text-xs text-[#1E4D3A]">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D52]" />
              <div>
                <strong>Đơn bán buôn theo cân</strong>
                <p className="mt-0.5 text-[11px] text-[#536B5C]">Quán sẽ gọi lại để chốt giá/kg và thời gian nhận.</p>
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <label className="text-xs font-bold text-[#1D2A22] mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#2E7D52]" />
              {isWholesale ? 'Ghi chú cho quán (cách đóng gói, chia túi...)' : 'Ghi chú cho bếp (nhiều vừng, không hành...)'}
            </label>
            <input
              type="text"
              placeholder={isWholesale ? 'VD: Chia túi 2 kg, ruốc đóng riêng...' : 'VD: Không lấy hành phi, cho thêm muối vừng...'}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-[#C3DEC8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1E4D3A]"
            />
          </div>

          {/* Summary Box */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#D4E7D8] text-xs space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-[#536B5C]">
                {isWholesale
                  ? `Tổng khối lượng: ${Number(cart.reduce((s,i)=>s+i.quantity,0).toFixed(2))} kg`
                  : `Tổng tiền (${cart.reduce((s,i)=>s+i.quantity,0)} phần xôi):`}
              </span>
              <span className="text-[#1E4D3A] font-bold text-base font-heading">
                {isWholesale ? 'Chờ báo giá' : `${pricing.finalTotal.toLocaleString()}đ`}
              </span>
            </div>

            {!isWholesale && <div className="pt-2 border-t border-[#EAF3EC] flex items-center justify-between text-[11px] text-[#536B5C]">
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
            </div>}
          </div>

          {/* Notice */}
          <div className="text-[11px] text-[#1E4D3A] bg-[#E8F5EE] p-2.5 rounded-xl border border-[#BFE0C8] flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#2E7D52] shrink-0 mt-0.5" />
            <span>
              {isWholesale
                ? 'Đây là yêu cầu đặt hàng, chưa phải giá chốt. Quán sẽ liên hệ lại theo số điện thoại trên.'
                : 'Quán chưa hỗ trợ giao hàng tận nơi. Quý khách vui lòng nhận xôi tại quán hoặc gửi ship đến lấy.'}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 border border-[#143527]"
          >
            <Send className="w-4 h-4" />
            <span>{isWholesale ? 'GỬI YÊU CẦU BÁO GIÁ' : 'GỬI ĐƠN CHO BẾP NGAY'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
