import React, { useState } from 'react';
import { X, Send, User, ShoppingBag, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, pricing, onCompleteOrder }) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('EAT_HERE'); // EAT_HERE or TAKEAWAY
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleAutofillTag = (tag) => {
    setCustomerName(tag);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError('Vui lòng nhập tên hoặc số thẻ của bạn (Ví dụ: Khách 05)');
      return;
    }

    onCompleteOrder({
      orderId: 'XÔÏS-' + Math.floor(100 + Math.random() * 900),
      customer: {
        name: customerName,
        phone: orderType === 'EAT_HERE' ? 'Ăn tại chỗ' : 'Mang về',
        address: orderType === 'EAT_HERE' ? 'Tại bàn / Lề đường' : 'Đóng hộp mang về',
        paymentMethod: 'Trả tiền sau khi nhận xôi',
        timeSlot: 'Ngay tại quán'
      },
      cart,
      pricing,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-slide-up">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-emerald-200 p-5 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Đặt Hàng Quét QR Cho Quán
            </span>
            <h3 className="font-heading font-black text-lg text-slate-900 mt-0.5">Xác Nhận Đơn Xôi</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Quick Tag Selector */}
          <div>
            <label className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-emerald-600" /> Tên / Số Thẻ Của Bạn *
            </label>
            <input
              type="text"
              placeholder="VD: Khách 05, Anh Nam, Chị Hà..."
              value={customerName}
              onChange={(e) => { setCustomerName(e.target.value); setError(''); }}
              className="w-full text-xs p-3 bg-emerald-50/50 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {error && <p className="text-[11px] text-rose-600 mt-1 font-semibold">{error}</p>}

            {/* Autofill Tags */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
              <span className="text-[10px] text-slate-400 font-semibold shrink-0">Chọn nhanh:</span>
              {['Khách 01', 'Khách 02', 'Khách 05', 'Khách 10'].map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleAutofillTag(tag)}
                  className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-emerald-200 transition-colors shrink-0"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Eat Here or Takeaway */}
          <div>
            <label className="text-xs font-bold text-slate-800 mb-1.5 block">Hình thức dùng:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('EAT_HERE')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  orderType === 'EAT_HERE'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                }`}
              >
                🥣 Ăn Tại Quán
              </button>

              <button
                type="button"
                onClick={() => setOrderType('TAKEAWAY')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  orderType === 'TAKEAWAY'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                }`}
              >
                🥡 Đóng Hộp Mang Về
              </button>
            </div>
          </div>

          {/* Note Input */}
          <div>
            <label className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Ghi chú (Cho nhiều vừng, ít dừa...)
            </label>
            <input
              type="text"
              placeholder="VD: Không lấy hành phi, lấy thêm thìa..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          {/* Summary */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex justify-between items-center font-bold">
            <span className="text-slate-700">Tổng tiền ({cart.reduce((s,i)=>s+i.quantity,0)} món):</span>
            <span className="text-emerald-950 font-black text-base font-mono">
              {pricing.finalTotal.toLocaleString()}đ
            </span>
          </div>

          <div className="text-[11px] text-emerald-800 text-center font-medium">
            💡 Bạn có thể thanh toán tiền mặt hoặc chuyển khoản QR sau khi nhận xôi.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>GỬI ĐƠN CHO BẾP NGAY</span>
          </button>

        </form>

      </div>
    </div>
  );
}
