import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onProceedCheckout }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-slide-up">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col border-l border-emerald-200">
          
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-heading font-bold text-base">Món Đã Chọn ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <ShoppingBag className="w-12 h-12 text-emerald-200 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">Chưa có món trong giỏ</h3>
                <p className="text-xs text-slate-500">Bấm (+) vào món bạn muốn ăn để thêm nhanh!</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-200/80 flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border border-emerald-200 shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80";
                    }}
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                      <button onClick={() => onRemoveItem(index)} className="text-slate-400 hover:text-rose-600 p-0.5">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-black text-emerald-950 font-mono">
                        {item.totalPrice.toLocaleString()}đ
                      </div>

                      <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-sm">
                        <button onClick={() => onUpdateQuantity(index, item.quantity - 1)} className="text-slate-600 hover:text-emerald-800">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(index, item.quantity + 1)} className="text-slate-600 hover:text-emerald-800">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 bg-emerald-50 border-t border-emerald-200 space-y-3">
              <div className="flex justify-between items-center text-sm font-black">
                <span>Tổng Tiền Tạm Tính:</span>
                <span className="text-emerald-950 text-base font-mono">{subtotal.toLocaleString()}đ</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout({ subtotal, discountAmount: 0, shippingFee: 0, finalTotal: subtotal });
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>XÁC NHẬN GỬI ĐƠN NGAY ({subtotal.toLocaleString()}đ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
