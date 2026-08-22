import React, { useState } from 'react';
import { TOPPING_OPTIONS, SWEETNESS_OPTIONS } from '../data/menuData';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

export default function CustomizeModal({ item, onClose, onAddToCartWithCustoms }) {
  if (!item) return null;

  const [selectedToppings, setSelectedToppings] = useState([]);
  const [sweetness, setSweetness] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const toggleTopping = (topping) => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const toppingTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = item.price + toppingTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCartWithCustoms({
      ...item,
      selectedToppings,
      sweetness: SWEETNESS_OPTIONS.find(s => s.id === sweetness)?.name || 'Chuẩn vị',
      note,
      unitPrice,
      totalPrice,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-slide-up">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="relative h-44 overflow-hidden bg-amber-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/80 text-slate-800 hover:bg-white rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              {item.subtitle}
            </span>
            <h3 className="text-xl font-bold font-heading mt-1">{item.name}</h3>
            <div className="text-sm font-semibold text-amber-300">
              Giá món gốc: {item.price.toLocaleString()}đ
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">

          {/* Toppings Selection */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Thêm Topping Chay Thượng Hạng</span>
              <span className="text-[10px] text-amber-700 font-normal">Tùy chọn thêm</span>
            </h4>
            <div className="space-y-2">
              {TOPPING_OPTIONS.map((topping) => {
                const isSelected = selectedToppings.some(t => t.id === topping.id);
                return (
                  <button
                    key={topping.id}
                    onClick={() => toggleTopping(topping)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{topping.name}</span>
                    </div>
                    <span className="text-amber-800 font-bold">+{topping.price.toLocaleString()}đ</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sweetness / Softness Selection */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Mức Độ Khẩu Vị / Đường
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {SWEETNESS_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    sweetness === opt.id
                      ? 'bg-orange-50 border-orange-400 text-orange-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="sweetness"
                    checked={sweetness === opt.id}
                    onChange={() => setSweetness(opt.id)}
                    className="accent-amber-600"
                  />
                  <span>{opt.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Ghi Chú Đóng Gói (Nhiều dừa, giao nóng...)
            </h4>
            <input
              type="text"
              placeholder="VD: Cho nhiều vừng, để riêng dừa bào..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-3 bg-amber-50/40 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-slate-800 uppercase">Số Lượng Hộp:</span>
            <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-full border border-slate-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm hover:bg-amber-100 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm w-4 text-center text-slate-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm hover:bg-amber-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-amber-50 border-t border-amber-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-slate-500">Tổng cộng item:</div>
            <div className="text-xl font-black text-amber-900 font-heading">
              {totalPrice.toLocaleString()}đ
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Thêm Vào Giỏ Hàng</span>
          </button>
        </div>

      </div>
    </div>
  );
}
