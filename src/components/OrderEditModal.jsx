import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Minus, Trash2, Tag, Gift, Percent, DollarSign, 
  Utensils, Check, AlertCircle, ShoppingBag, Coffee, HelpCircle 
} from 'lucide-react';

export default function OrderEditModal({ 
  isOpen, 
  onClose, 
  order, 
  menuItems,
  onSaveOrder, 
  onDeleteOrder 
}) {
  if (!isOpen) return null;

  const isCreatingNew = !order;

  // Form states
  const [customerName, setCustomerName] = useState(order?.customer?.name || 'Bàn 01');
  const [orderType, setOrderType] = useState(order?.orderType || 'EAT_HERE');
  const [note, setNote] = useState(order?.note || '');
  const [cart, setCart] = useState(
    order?.cart ? JSON.parse(JSON.stringify(order.cart)) : [
      { id: menuItems[0].id, name: menuItems[0].name, quantity: 1, unitPrice: menuItems[0].price, totalPrice: menuItems[0].price }
    ]
  );

  // Discount states
  const [discountType, setDiscountType] = useState(
    order?.pricing?.isFree ? 'free' : 
    order?.pricing?.discountPercent ? 'percent' : 
    (order?.pricing?.discountAmount > 0 ? 'amount' : 'none')
  );
  const [discountAmountInput, setDiscountAmountInput] = useState(order?.pricing?.discountAmount || 0);
  const [discountPercentInput, setDiscountPercentInput] = useState(order?.pricing?.discountPercent || 10);
  const [discountReason, setDiscountReason] = useState(order?.pricing?.discountReason || '');

  // Custom item state
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState(10000);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'custom'

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
  let calculatedDiscount = 0;
  let isFree = false;

  if (discountType === 'free') {
    calculatedDiscount = subtotal;
    isFree = true;
  } else if (discountType === 'percent') {
    const pct = Math.max(0, Math.min(100, Number(discountPercentInput) || 0));
    calculatedDiscount = Math.round(subtotal * (pct / 100));
  } else if (discountType === 'amount') {
    calculatedDiscount = Math.min(subtotal, Math.max(0, Number(discountAmountInput) || 0));
  }

  const finalTotal = Math.max(0, subtotal - calculatedDiscount);

  // Item modifications
  const handleUpdateItemQty = (index, delta) => {
    const next = [...cart];
    const newQty = next[index].quantity + delta;
    if (newQty <= 0) {
      next.splice(index, 1);
    } else {
      next[index].quantity = newQty;
      next[index].totalPrice = next[index].unitPrice * newQty;
    }
    setCart(next);
  };

  const handleRemoveItem = (index) => {
    const next = [...cart];
    next.splice(index, 1);
    setCart(next);
  };

  const handleToggleFreeItem = (index) => {
    const next = [...cart];
    if (next[index].unitPrice === 0) {
      // Restore original price if found in menu or keep default
      const original = menuItems.find(m => m.id === next[index].id);
      next[index].unitPrice = original ? original.price : (next[index].originalPrice || 25000);
      next[index].isGift = false;
    } else {
      next[index].originalPrice = next[index].unitPrice;
      next[index].unitPrice = 0;
      next[index].isGift = true;
    }
    next[index].totalPrice = next[index].unitPrice * next[index].quantity;
    setCart(next);
  };

  // Add standard menu item
  const handleAddMenuItem = (menuItem) => {
    const existingIndex = cart.findIndex(c => c.id === menuItem.id && !c.isCustom && !c.isGift);
    if (existingIndex > -1) {
      handleUpdateItemQty(existingIndex, 1);
    } else {
      setCart([
        ...cart,
        {
          id: menuItem.id,
          name: menuItem.name,
          quantity: 1,
          unitPrice: menuItem.price,
          totalPrice: menuItem.price,
          isCustom: false
        }
      ]);
    }
  };

  // Add custom item / topping
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    const price = Math.max(0, Number(customItemPrice) || 0);
    setCart([
      ...cart,
      {
        id: 'custom-' + Date.now(),
        name: customItemName.trim(),
        quantity: 1,
        unitPrice: price,
        totalPrice: price,
        isCustom: true
      }
    ]);
    setCustomItemName('');
  };

  // Save handler
  const handleSave = () => {
    if (cart.length === 0) {
      alert('Vui lòng chọn ít nhất 1 món trong đơn hàng!');
      return;
    }

    const orderTypeLabel = 
      orderType === 'EAT_HERE' ? 'Ăn tại chỗ' : 
      orderType === 'TAKEAWAY' ? 'Đóng gói mang về' : 'Đặt bán buôn / Mâm cỗ';

    const updatedOrder = {
      ...(order || {
        orderId: 'XP-' + Math.floor(100 + Math.random() * 900),
        status: 'pending',
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }),
      customer: {
        ...(order?.customer || {}),
        name: customerName.trim() || 'Khách Tại Bàn',
        phone: order?.customer?.phone || orderTypeLabel,
        address: orderTypeLabel
      },
      orderType,
      note: note.trim(),
      cart,
      pricing: {
        subtotal,
        discountAmount: calculatedDiscount,
        discountPercent: discountType === 'percent' ? Number(discountPercentInput) : 0,
        discountReason: discountReason.trim() || (isFree ? 'Miễn phí (Tặng 100%)' : calculatedDiscount > 0 ? 'Ưu đãi cho khách' : ''),
        isFree,
        finalTotal
      }
    };

    onSaveOrder(updatedOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0D2016]/80 backdrop-blur-md animate-slide-up overflow-y-auto">
      <div className="bg-[#122B1E] text-[#E8F5EE] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#2E6B4B] my-4 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#254E3A] flex justify-between items-center bg-[#0D2016]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D52] text-white flex items-center justify-center font-bold border border-[#52B788]/40">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>{isCreatingNew ? 'Tạo Đơn Hàng Mới Tại Bếp' : `Sửa Đơn Hàng — ${order?.orderId}`}</span>
                {!isCreatingNew && (
                  <span className="bg-[#183626] text-[#74C69D] text-[10px] px-2 py-0.5 rounded-full border border-[#2E6B4B]">
                    Đang Chờ
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-[#A3C7B2]">Chủ quán có thể thêm bớt món, giảm giá hoặc miễn phí (free)</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl bg-[#183626] text-[#A3C7B2] hover:text-white hover:bg-[#254E3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar text-xs">
          
          {/* Row 1: Customer Name & Order Type */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#0D2016] p-3.5 rounded-2xl border border-[#254E3A]">
            <div className="sm:col-span-6">
              <label className="block text-[11px] font-bold text-[#74C69D] mb-1">
                Tên Khách / Số Bàn / Vị Trí:
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="VD: Bàn 02, Mang Về 01, Anh Nam..."
                className="w-full bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#52B788]"
              />
              <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
                {['Bàn 01', 'Bàn 02', 'Bàn 03', 'Mang Về', 'Khách Quen'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setCustomerName(tag)}
                    className="bg-[#2E7D52]/30 text-[#A7F3D0] text-[10px] px-2 py-0.5 rounded-md hover:bg-[#2E7D52] shrink-0 border border-[#52B788]/30"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-[11px] font-bold text-[#74C69D] mb-1">
                Hình Thức Phục Vụ:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'EAT_HERE', label: 'Tại Quán' },
                  { id: 'TAKEAWAY', label: 'Mang Về' },
                  { id: 'WHOLESALE', label: 'Đặt Bán Buôn' }
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setOrderType(type.id)}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                      orderType === type.id
                        ? 'bg-[#2E7D52] text-white border-[#2E7D52] shadow-sm'
                        : 'bg-[#183626] text-[#A3C7B2] border-[#254E3A] hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú: Thêm vừng, ít hành,..."
                className="w-full mt-2 bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:border-[#52B788]"
              />
            </div>
          </div>

          {/* Section: Current Items in Order */}
          <div className="bg-[#0D2016] p-3.5 rounded-2xl border border-[#254E3A] space-y-2.5">
            <div className="flex justify-between items-center border-b border-[#254E3A] pb-2">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#74C69D]" />
                <span>Danh Sách Món Trong Đơn ({cart.reduce((s, i) => s + i.quantity, 0)} phần)</span>
              </span>
              <span className="text-[11px] text-[#A3C7B2]">
                Tạm tính món: <strong className="text-[#74C69D]">{subtotal.toLocaleString()}đ</strong>
              </span>
            </div>

            {cart.length === 0 ? (
              <p className="text-[#A3C7B2] text-center py-4 italic text-xs">
                Chưa có món nào. Vui lòng bấm chọn món ở bên dưới để thêm!
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#183626] p-2.5 rounded-xl border border-[#2E6B4B] flex items-center justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white truncate">{item.name}</span>
                        {item.isCustom && (
                          <span className="bg-[#2E7D52]/40 text-[#74C69D] text-[9px] px-1.5 py-0.2 rounded font-semibold border border-[#52B788]/30">
                            Món thêm
                          </span>
                        )}
                        {item.unitPrice === 0 && (
                          <span className="bg-emerald-600/30 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded font-bold border border-emerald-500/40">
                            FREE / Tặng
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#A3C7B2] mt-0.5">
                        Đơn giá: {item.unitPrice.toLocaleString()}đ 
                        {item.quantity > 1 && ` × ${item.quantity} = ${(item.unitPrice * item.quantity).toLocaleString()}đ`}
                      </div>
                    </div>

                    {/* Quick free toggle & quantity controller */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleFreeItem(idx)}
                        title={item.unitPrice === 0 ? "Bỏ tặng (tính tiền lại)" : "Tặng miễn phí món này"}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                          item.unitPrice === 0
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-[#0D2016] text-[#A3C7B2] border-[#2E6B4B] hover:text-emerald-300'
                        }`}
                      >
                        <Gift className="w-3 h-3" />
                        <span>{item.unitPrice === 0 ? 'Đã Tặng' : 'Tặng (0đ)'}</span>
                      </button>

                      <div className="flex items-center bg-[#0D2016] rounded-lg border border-[#2E6B4B] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQty(idx, -1)}
                          className="p-1.5 hover:bg-[#183626] text-[#A3C7B2] hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-[#74C69D]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQty(idx, 1)}
                          className="p-1.5 hover:bg-[#183626] text-[#A3C7B2] hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Xóa món này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Add Items Tool (Menu or Custom) */}
          <div className="bg-[#0D2016] p-3.5 rounded-2xl border border-[#254E3A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-[#74C69D]" />
                <span>Thêm Món Vào Đơn Nhanh:</span>
              </span>
              
              {/* Tabs */}
              <div className="bg-[#183626] p-0.5 rounded-lg flex items-center gap-1 border border-[#2E6B4B]">
                <button
                  type="button"
                  onClick={() => setActiveTab('menu')}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                    activeTab === 'menu'
                      ? 'bg-[#2E7D52] text-white'
                      : 'text-[#A3C7B2] hover:text-white'
                  }`}
                >
                  Thực Đơn Quán ({menuItems.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('custom')}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                    activeTab === 'custom'
                      ? 'bg-[#2E7D52] text-white'
                      : 'text-[#A3C7B2] hover:text-white'
                  }`}
                >
                  + Món Thêm / Topping Tự Nhập
                </button>
              </div>
            </div>

            {activeTab === 'menu' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAddMenuItem(item)}
                    className="bg-[#183626] hover:bg-[#254E3A] p-2 rounded-xl border border-[#2E6B4B] hover:border-[#52B788] text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="font-bold text-white text-[11px] line-clamp-1 group-hover:text-[#74C69D]">
                      {item.name}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-[#74C69D] font-bold">{item.price.toLocaleString()}đ</span>
                      <span className="bg-[#2E7D52] text-white rounded p-0.5 group-hover:scale-110 transition-transform">
                        <Plus className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleAddCustomItem} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      placeholder="Tên món/topping (VD: Chả quế thêm, Trứng rim, Trà đá...)"
                      className="w-full bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#52B788]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <div className="relative">
                      <input
                        type="number"
                        step="1000"
                        min="0"
                        value={customItemPrice}
                        onChange={(e) => setCustomItemPrice(e.target.value)}
                        placeholder="Giá (đ)"
                        className="w-full bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#52B788]"
                      />
                      <span className="absolute right-2.5 top-2 text-[10px] text-[#A3C7B2]">đ</span>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold py-2 px-3 rounded-xl border border-[#52B788]/40 text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm Vào Đơn</span>
                    </button>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
                  <span className="text-[#A3C7B2] shrink-0">Món nhanh:</span>
                  {[
                    { name: 'Thêm Chả Quế', price: 10000 },
                    { name: 'Thêm Trứng Kho', price: 7000 },
                    { name: 'Thêm Ruốc Nấm', price: 8000 },
                    { name: 'Thêm Thịt Kho', price: 15000 },
                    { name: 'Cốc Trà Đá', price: 5000 },
                    { name: 'Sữa Đậu Nành', price: 10000 }
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        setCart([
                          ...cart,
                          {
                            id: 'custom-' + Date.now() + '-' + pIdx,
                            name: preset.name,
                            quantity: 1,
                            unitPrice: preset.price,
                            totalPrice: preset.price,
                            isCustom: true
                          }
                        ]);
                      }}
                      className="bg-[#183626] hover:bg-[#254E3A] text-[#74C69D] px-2 py-0.5 rounded-lg border border-[#2E6B4B] shrink-0 font-medium"
                    >
                      + {preset.name} ({preset.price.toLocaleString()}đ)
                    </button>
                  ))}
                </div>
              </form>
            )}
          </div>

          {/* Section: Discounts, Free Order & Adjustments */}
          <div className="bg-[#0D2016] p-3.5 rounded-2xl border border-[#254E3A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#74C69D]" />
                <span>Ưu Đãi, Giảm Giá & Miễn Phí (Free):</span>
              </span>
              {calculatedDiscount > 0 && (
                <span className="bg-emerald-500/20 text-[#74C69D] text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {isFree ? 'Miễn phí toàn bộ (100% Free)' : `Đã giảm: -${calculatedDiscount.toLocaleString()}đ`}
                </span>
              )}
            </div>

            {/* Discount Type Selector */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'none', label: 'Không Giảm', icon: null },
                { id: 'amount', label: 'Giảm Tiền (đ)', icon: DollarSign },
                { id: 'percent', label: 'Giảm %', icon: Percent },
                { id: 'free', label: 'Miễn Phí (Free)', icon: Gift }
              ].map(dt => (
                <button
                  key={dt.id}
                  type="button"
                  onClick={() => setDiscountType(dt.id)}
                  className={`py-2 px-1 rounded-xl text-[10px] font-bold border transition-all flex items-center justify-center gap-1 text-center ${
                    discountType === dt.id
                      ? (dt.id === 'free' 
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' 
                          : 'bg-[#2E7D52] text-white border-[#2E7D52] shadow-md')
                      : 'bg-[#183626] text-[#A3C7B2] border-[#254E3A] hover:text-white'
                  }`}
                >
                  {dt.icon && <dt.icon className="w-3 h-3" />}
                  <span>{dt.label}</span>
                </button>
              ))}
            </div>

            {/* Discount Value Inputs */}
            {discountType === 'amount' && (
              <div className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="1000"
                      min="0"
                      max={subtotal}
                      value={discountAmountInput}
                      onChange={(e) => setDiscountAmountInput(e.target.value)}
                      placeholder="Nhập số tiền giảm (VD: 10000)"
                      className="w-full bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#52B788]"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-[#A3C7B2]">đ</span>
                  </div>
                </div>

                {/* Quick discount buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
                  <span className="text-[#A3C7B2] shrink-0">Giảm nhanh:</span>
                  {[5000, 10000, 15000, 20000, 30000, 50000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDiscountAmountInput(amt)}
                      className="bg-[#183626] hover:bg-[#254E3A] text-emerald-200 px-2 py-1 rounded-lg border border-[#2E6B4B] shrink-0 font-bold"
                    >
                      -{amt.toLocaleString()}đ
                    </button>
                  ))}
                </div>
              </div>
            )}

            {discountType === 'percent' && (
              <div className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={discountPercentInput}
                      onChange={(e) => setDiscountPercentInput(e.target.value)}
                      placeholder="Nhập % giảm (VD: 10, 20, 50)"
                      className="w-full bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#52B788]"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-[#A3C7B2]">%</span>
                  </div>
                </div>

                {/* Quick % buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
                  <span className="text-[#A3C7B2] shrink-0">Giảm nhanh:</span>
                  {[5, 10, 15, 20, 30, 50].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercentInput(pct)}
                      className="bg-[#183626] hover:bg-[#254E3A] text-emerald-200 px-2 py-1 rounded-lg border border-[#2E6B4B] shrink-0 font-bold"
                    >
                      -{pct}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            {discountType === 'free' && (
              <div className="bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Đơn hàng này được chủ quán miễn phí 100% (Giá cần thu = 0đ). Thích hợp mời bạn bè, khách quen hoặc quà tặng.</span>
              </div>
            )}

            {discountType !== 'none' && (
              <input
                type="text"
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
                placeholder="Lý do giảm giá (VD: Khách quen, Tặng bạn bè, Khai trương...)"
                className="w-full bg-[#183626] text-white border border-[#2E6B4B] rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:border-[#52B788]"
              />
            )}
          </div>

          {/* Section: Final Price Summary Box */}
          <div className="bg-[#0D2016] p-4 rounded-2xl border-2 border-[#2E7D52]/40 space-y-2">
            <div className="flex justify-between items-center text-[#A3C7B2] text-xs">
              <span>Tổng tiền món gốc:</span>
              <span className="font-bold text-white">{subtotal.toLocaleString()}đ</span>
            </div>

            {calculatedDiscount > 0 && (
              <div className="flex justify-between items-center text-[#74C69D] text-xs">
                <span>Ưu đãi / Giảm giá ({discountReason || (isFree ? 'Miễn phí 100%' : 'Giảm trực tiếp')}):</span>
                <span className="font-bold">-{calculatedDiscount.toLocaleString()}đ</span>
              </div>
            )}

            <div className="pt-2 border-t border-[#254E3A] flex justify-between items-center">
              <div>
                <div className="text-[10px] text-[#A3C7B2] uppercase font-bold tracking-wider">
                  Tổng Tiền Chủ Quán Cần Thu:
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#74C69D] font-heading">
                  {finalTotal.toLocaleString()}đ
                </div>
              </div>

              {isFree ? (
                <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full border border-emerald-400 animate-pulse">
                  ĐƠN MIỄN PHÍ (0đ)
                </span>
              ) : (
                <div className="text-right text-[11px] text-[#A3C7B2]">
                  <span>Ăn xong thu: </span>
                  <strong className="text-[#74C69D]">{finalTotal.toLocaleString()}đ</strong>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[#254E3A] bg-[#0D2016] flex flex-wrap items-center justify-between gap-3">
          <div>
            {!isCreatingNew && onDeleteOrder && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Bạn có chắc chắn muốn hủy / xóa đơn ${order.orderId} không?`)) {
                    onDeleteOrder(order.orderId);
                    onClose();
                  }
                }}
                className="text-red-400 hover:text-red-300 text-xs font-semibold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hủy Đơn Này</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#183626] hover:bg-[#254E3A] text-[#A3C7B2] hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors border border-[#2E6B4B]"
            >
              Đóng
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95 border border-[#52B788]/50"
            >
              <Check className="w-4 h-4" />
              <span>{isCreatingNew ? 'TẠO ĐƠN & LÊN BẾP' : 'LƯU THAY ĐỔI ĐƠN'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
