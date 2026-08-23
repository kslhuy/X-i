import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedCheckout,
  orderMode
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const isWholesale = orderMode === 'wholesale';
  const totalQuantity = Number(cart.reduce((sum, item) => sum + item.quantity, 0).toFixed(2));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#143527]/60 backdrop-blur-sm animate-slide-up">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#F4F8F5] shadow-2xl flex flex-col border-l border-[#C3DEC8]">
          
          {/* Header */}
          <div className="p-4 bg-[#1E4D3A] text-[#F4F8F5] flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#74C69D]" />
              <h2 className="font-heading font-bold text-base">
                {isWholesale ? `Đơn Bán Buôn (${totalQuantity} kg)` : `Món Đã Chọn (${totalQuantity})`}
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <ShoppingBag className="w-12 h-12 text-[#ADCDB3] mx-auto" />
                <h3 className="text-sm font-bold text-[#1D2A22]">Chưa có món trong giỏ</h3>
                <p className="text-xs text-[#536B5C]">Bấm (+) vào món bạn muốn thưởng thức để thêm vào giỏ.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-3 border border-[#D4E7D8] flex gap-3 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#C3DEC8] shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80";
                    }}
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-[#1D2A22] line-clamp-1">{item.name}</h4>
                      <button onClick={() => onRemoveItem(index)} className="text-[#869E90] hover:text-[#9E4334] p-0.5 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-bold text-[#1E4D3A] font-heading">
                        {item.requiresQuote ? 'Báo giá theo kg' : `${item.totalPrice.toLocaleString()}đ`}
                      </div>

                      <div className="flex items-center gap-1 bg-[#E8F5EE] px-1.5 py-0.5 rounded-full border border-[#BFE0C8] shadow-xs">
                        <button
                          type="button"
                          aria-label={`Giảm ${item.step || 1} ${item.unit || 'phần'} ${item.name}`}
                          onClick={() => onUpdateQuantity(index, item.quantity - (item.step || 1))}
                          className="rounded-full p-1 text-[#536B5C] hover:bg-white hover:text-[#1E4D3A]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        {isWholesale && item.wholesaleGroup === 'main' ? (
                          <label className="flex items-center gap-1 text-xs font-bold text-[#1D2A22]">
                            <span className="sr-only">Số kg {item.name}</span>
                            <input
                              key={`${item.id}-${item.quantity}`}
                              type="number"
                              inputMode="numeric"
                              min="1"
                              step="1"
                              defaultValue={item.quantity}
                              onBlur={(event) => {
                                const enteredQuantity = Number(event.currentTarget.value);
                                if (!Number.isFinite(enteredQuantity) || enteredQuantity <= 0) {
                                  event.currentTarget.value = item.quantity;
                                  return;
                                }
                                onUpdateQuantity(index, Math.max(1, Math.round(enteredQuantity)));
                              }}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') event.currentTarget.blur();
                              }}
                              className="w-11 border-0 bg-transparent p-0 text-center text-xs font-bold text-[#1D2A22] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <span>kg</span>
                          </label>
                        ) : (
                          <span className={`${isWholesale ? 'min-w-10' : 'w-4'} text-center text-xs font-bold text-[#1D2A22]`}>
                            {item.quantity}{item.unit ? ` ${item.unit}` : ''}
                          </span>
                        )}

                        <button
                          type="button"
                          aria-label={`Tăng ${item.step || 1} ${item.unit || 'phần'} ${item.name}`}
                          onClick={() => onUpdateQuantity(index, item.quantity + (item.step || 1))}
                          className="rounded-full p-1 text-[#536B5C] hover:bg-white hover:text-[#1E4D3A]"
                        >
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
            <div className="p-4 bg-white border-t border-[#D4E7D8] space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-[#536B5C]">{isWholesale ? 'Tổng khối lượng:' : 'Tổng tạm tính:'}</span>
                <span className="text-[#1E4D3A] text-base font-heading font-bold">
                  {isWholesale ? `${totalQuantity} kg` : `${subtotal.toLocaleString()}đ`}
                </span>
              </div>

              {isWholesale && (
                <p className="rounded-xl border border-[#BFE0C8] bg-[#E8F5EE] p-2.5 text-[11px] leading-relaxed text-[#536B5C]">
                  Quán sẽ xác nhận giá/kg, tổng tiền và thời gian nhận sau khi tiếp nhận yêu cầu.
                </p>
              )}

              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout({
                    subtotal,
                    discountAmount: 0,
                    shippingFee: 0,
                    finalTotal: subtotal,
                    requiresQuote: isWholesale
                  });
                }}
                className="w-full bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 border border-[#143527]"
              >
                <span>
                  {isWholesale ? 'TIẾP TỤC GỬI YÊU CẦU' : `XÁC NHẬN ĐƠN HÀNG (${subtotal.toLocaleString()}đ)`}
                </span>
                <ArrowRight className="w-4 h-4 text-[#74C69D]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
