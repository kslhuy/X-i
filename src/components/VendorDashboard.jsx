import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, UtensilsCrossed, QrCode, CreditCard, 
  Edit3, Plus, Tag, Save, X
} from 'lucide-react';
import OrderEditModal from './OrderEditModal';

export default function VendorDashboard({ 
  orders, 
  menuItems,
  bankInfo,
  onUpdateMenuPrices,
  onUpdateBankAccount,
  onUpdateStatus, 
  onUpdateOrder, 
  onCreateOrder, 
  onDeleteOrder, 
  onOpenQRCode, 
  onOpenPaymentQR 
}) {
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPriceEditorOpen, setIsPriceEditorOpen] = useState(false);
  const [draftPrices, setDraftPrices] = useState({});
  const [priceError, setPriceError] = useState('');
  const [isBankEditorOpen, setIsBankEditorOpen] = useState(false);
  const [draftAccountNumber, setDraftAccountNumber] = useState('');
  const [bankAccountError, setBankAccountError] = useState('');

  const pendingOrders = orders.filter(o => o.status !== 'completed');
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.pricing?.finalTotal || 0), 0);

  const handleOpenEdit = (order) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingOrder(null);
    setIsEditModalOpen(true);
  };

  const handleSaveOrder = (savedOrder) => {
    if (editingOrder) {
      if (onUpdateOrder) onUpdateOrder(savedOrder);
    } else {
      if (onCreateOrder) onCreateOrder(savedOrder);
    }
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const handleOpenPriceEditor = () => {
    setDraftPrices(Object.fromEntries(menuItems.map(item => [item.id, item.price])));
    setPriceError('');
    setIsBankEditorOpen(false);
    setIsPriceEditorOpen(true);
  };

  const handleSavePrices = () => {
    const hasInvalidPrice = menuItems.some(item => {
      const price = Number(draftPrices[item.id]);
      return !Number.isFinite(price) || price <= 0;
    });

    if (hasInvalidPrice) {
      setPriceError('Vui lòng nhập giá lớn hơn 0 cho tất cả món.');
      return;
    }

    onUpdateMenuPrices(draftPrices);
    setPriceError('');
    setIsPriceEditorOpen(false);
  };

  const handleOpenBankEditor = () => {
    setDraftAccountNumber(bankInfo?.accountNumber || '');
    setBankAccountError('');
    setIsPriceEditorOpen(false);
    setIsBankEditorOpen(true);
  };

  const handleSaveBankAccount = () => {
    const normalizedAccountNumber = draftAccountNumber.replace(/\s/g, '');

    if (!/^\d{6,20}$/.test(normalizedAccountNumber)) {
      setBankAccountError('Số tài khoản phải gồm từ 6 đến 20 chữ số.');
      return;
    }

    onUpdateBankAccount(normalizedAccountNumber);
    setBankAccountError('');
    setIsBankEditorOpen(false);
  };

  return (
    <div className="bg-[#122B1E] text-[#E8F5EE] min-h-screen p-4 sm:p-6 font-sans">
      
      {/* Dashboard Top Header */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#254E3A]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#2E7D52] text-white font-bold font-heading text-lg flex items-center justify-center shadow-md border border-[#52B788]/40">
            XP
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
              <span>Màn Hình Bếp Chính</span>
              <span className="bg-[#183626] text-[#74C69D] text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-[#2E6B4B]">
                Trực Tiếp
              </span>
            </h1>
            <p className="text-xs text-[#A3C7B2]">Quản lý chế biến & tính tiền bàn ăn / mang về</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleOpenPriceEditor}
            className="bg-[#E8F5EE] hover:bg-white text-[#1E4D3A] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 border border-[#BFE0C8]"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh Giá Thực Đơn</span>
          </button>

          <button
            onClick={handleOpenBankEditor}
            className="bg-[#E8F5EE] hover:bg-white text-[#1E4D3A] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 border border-[#BFE0C8]"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Chỉnh Số Tài Khoản</span>
          </button>

          {/* Quick Create Walk-in Order */}
          <button
            onClick={handleOpenCreate}
            className="bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 border border-[#52B788]/50"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tạo Đơn Tại Quán</span>
          </button>

          {onOpenPaymentQR && (
            <button
              onClick={() => onOpenPaymentQR()}
              className="bg-[#183626] hover:bg-[#254E3A] text-[#E8F5EE] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-[#2E6B4B]"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#74C69D]" />
              <span>QR Chuyển Khoản</span>
            </button>
          )}

          <button
            onClick={onOpenQRCode}
            className="bg-[#183626] hover:bg-[#254E3A] text-[#E8F5EE] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-[#2E6B4B]"
          >
            <QrCode className="w-3.5 h-3.5 text-[#74C69D]" />
            <span>Mã QR Đặt Món</span>
          </button>

          <div className="bg-[#0D2016] px-4 py-2 rounded-xl border border-[#254E3A] text-right min-w-[120px]">
            <div className="text-[10px] text-[#A3C7B2] uppercase font-semibold">Doanh Thu Trong Ngày</div>
            <div className="text-base font-bold text-[#74C69D] font-heading">
              {totalRevenue.toLocaleString()}đ
            </div>
          </div>
        </div>
      </div>

      {isPriceEditorOpen && (
        <section className="max-w-6xl mx-auto mt-5 bg-[#183626] rounded-2xl border border-[#2E6B4B] shadow-xl overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-[#0D2016] border-b border-[#254E3A] flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#74C69D]" />
                <span>Quản Lý Giá Thực Đơn</span>
              </h2>
              <p className="text-[11px] text-[#A3C7B2] mt-0.5">Giá sau khi lưu sẽ hiển thị ngay trên thực đơn khách hàng.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPriceEditorOpen(false)}
              className="p-2 rounded-xl text-[#A3C7B2] hover:text-white hover:bg-[#254E3A] transition-colors"
              aria-label="Đóng phần chỉnh giá"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuItems.map(item => (
                <label
                  key={item.id}
                  className="bg-[#122B1E] border border-[#254E3A] rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <span className="text-xs font-semibold text-[#E8F5EE] leading-snug">{item.name}</span>
                  <span className="relative shrink-0">
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      value={draftPrices[item.id] ?? ''}
                      onChange={(event) => {
                        setDraftPrices(prev => ({ ...prev, [item.id]: event.target.value }));
                        setPriceError('');
                      }}
                      className="w-28 bg-[#0D2016] text-white border border-[#2E6B4B] rounded-lg py-2 pl-3 pr-7 text-right text-sm font-bold focus:outline-none focus:border-[#74C69D]"
                      aria-label={`Giá ${item.name}`}
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#74C69D] font-bold pointer-events-none">đ</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className={`text-[11px] ${priceError ? 'text-red-300' : 'text-[#A3C7B2]'}`}>
                {priceError || 'Giá được lưu trên thiết bị này và giữ nguyên sau khi tải lại trang.'}
              </p>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsPriceEditorOpen(false)}
                  className="bg-[#122B1E] hover:bg-[#254E3A] text-[#A3C7B2] hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-[#254E3A] transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSavePrices}
                  className="bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-[#52B788]/50 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Giá & Cập Nhật Thực Đơn</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {isBankEditorOpen && (
        <section className="max-w-6xl mx-auto mt-5 bg-[#183626] rounded-2xl border border-[#2E6B4B] shadow-xl overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-[#0D2016] border-b border-[#254E3A] flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#74C69D]" />
                <span>Quản Lý Tài Khoản Nhận Tiền</span>
              </h2>
              <p className="text-[11px] text-[#A3C7B2] mt-0.5">Số tài khoản mới sẽ được dùng ngay trên mã QR và trang khách hàng.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsBankEditorOpen(false)}
              className="p-2 rounded-xl text-[#A3C7B2] hover:text-white hover:bg-[#254E3A] transition-colors"
              aria-label="Đóng phần chỉnh số tài khoản"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 sm:p-5">
            <label className="block max-w-xl">
              <span className="text-xs font-semibold text-[#E8F5EE]">Số tài khoản ngân hàng</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={20}
                value={draftAccountNumber}
                onChange={(event) => {
                  setDraftAccountNumber(event.target.value.replace(/\D/g, ''));
                  setBankAccountError('');
                }}
                className="mt-2 w-full bg-[#0D2016] text-white border border-[#2E6B4B] rounded-xl py-3 px-4 text-base font-mono font-bold tracking-wider focus:outline-none focus:border-[#74C69D]"
                placeholder="Nhập số tài khoản nhận tiền"
                aria-describedby="bank-account-help"
              />
            </label>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p
                id="bank-account-help"
                className={`text-[11px] ${bankAccountError ? 'text-red-300' : 'text-[#A3C7B2]'}`}
              >
                {bankAccountError || `Ngân hàng: ${bankInfo?.bankName || 'Chưa xác định'} • Chủ tài khoản: ${bankInfo?.accountHolder || 'Chưa xác định'}`}
              </p>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsBankEditorOpen(false)}
                  className="bg-[#122B1E] hover:bg-[#254E3A] text-[#A3C7B2] hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-[#254E3A] transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveBankAccount}
                  className="bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-[#52B788]/50 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Số Tài Khoản</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Orders Board */}
      <div className="max-w-6xl mx-auto pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Incoming Orders */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#E8F5EE] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#74C69D]" />
              <span>Đơn Hàng Đang Chờ ({pendingOrders.length})</span>
            </h2>
            {pendingOrders.length > 0 && (
              <span className="bg-[#2E7D52] text-white font-bold text-xs px-2.5 py-0.5 rounded-full animate-pulse border border-[#52B788]/40">
                Có đơn cần làm
              </span>
            )}
          </div>

          {pendingOrders.length === 0 ? (
            <div className="bg-[#0D2016] rounded-2xl p-12 text-center border border-[#254E3A]">
              <UtensilsCrossed className="w-10 h-10 text-[#2E6B4B] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#A3C7B2]">Hiện chưa có đơn hàng đang chờ</h3>
              <p className="text-xs text-[#6B8577] mt-1">
                Bấm nút <strong className="text-[#74C69D]">+ Tạo Đơn Tại Quán</strong> ở trên hoặc đợi khách quét mã gọi món.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingOrders.map((order) => {
                const discount = order.pricing?.discountAmount || 0;
                const isFree = order.pricing?.isFree || false;

                return (
                  <div
                    key={order.orderId}
                    className="bg-[#183626] rounded-2xl p-4 border border-[#2E6B4B] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden transition-all hover:border-[#52B788]"
                  >
                    {/* Card Top: Customer info & time */}
                    <div className="flex items-start justify-between border-b border-[#254E3A] pb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold text-[#74C69D] bg-[#0D2016] px-1.5 py-0.5 rounded border border-[#2E6B4B]">
                            {order.orderId}
                          </span>
                          {order.orderType && (
                            <span className="text-[10px] font-semibold bg-[#2E7D52]/30 text-[#A7F3D0] px-1.5 py-0.5 rounded border border-[#52B788]/30">
                              {order.orderType === 'EAT_HERE' ? 'Tại quán' : order.orderType === 'TAKEAWAY' ? 'Mang về' : 'Bán buôn'}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white mt-1 flex items-center gap-1">
                          {order.customer.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="bg-[#2E7D52]/30 text-[#74C69D] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#52B788]/30 inline-block">
                          {order.createdAt}
                        </span>
                        <div className="text-[11px] text-[#A3C7B2] mt-1">{order.customer.phone || 'Ăn tại chỗ'}</div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1.5 py-1 min-h-[60px]">
                      {order.cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-xs">
                          <div className="flex items-start gap-1.5 flex-1 min-w-0 pr-2">
                            <span className="font-bold text-[#74C69D] bg-[#2E7D52]/30 px-1.5 py-0.2 rounded text-[11px] shrink-0 border border-[#52B788]/30">
                              {item.quantity}x
                            </span>
                            <div className="min-w-0">
                              <span className="font-semibold text-white">{item.name}</span>
                              {item.isCustom && (
                                <span className="text-[9px] text-[#74C69D] ml-1 bg-[#2E7D52]/40 px-1 py-0.2 rounded">
                                  +thêm
                                </span>
                              )}
                              {item.unitPrice === 0 && (
                                <span className="text-[9px] text-[#A7F3D0] ml-1 bg-[#2E7D52]/40 px-1 py-0.2 rounded font-bold">
                                  Tặng (0đ)
                                </span>
                              )}
                              {order.note && idx === 0 && (
                                <div className="text-[10px] text-[#74C69D] italic truncate">
                                  "{order.note}"
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="font-bold text-[#A3C7B2] shrink-0">
                            {item.unitPrice === 0 ? '0đ' : `${(item.totalPrice || item.unitPrice * item.quantity).toLocaleString()}đ`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Breakdown & Badges if Discounted */}
                    {(discount > 0 || isFree) && (
                      <div className="bg-[#0D2016] px-2.5 py-1.5 rounded-xl border border-[#52B788]/30 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-[#74C69D] font-semibold">
                          <Tag className="w-3 h-3" />
                          <span>{isFree ? 'Miễn phí toàn bộ' : `Giảm giá (${order.pricing?.discountReason || 'Ưu đãi'})`}</span>
                        </div>
                        <span className="text-[#A7F3D0] font-bold">
                          {isFree ? 'Tặng 100%' : `-${discount.toLocaleString()}đ`}
                        </span>
                      </div>
                    )}

                    {/* Total & Action Buttons */}
                    <div className="pt-3 border-t border-[#254E3A] space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] text-[#A3C7B2] uppercase font-semibold">Cần thu sau cùng:</div>
                          <div className="text-lg sm:text-xl font-bold text-[#74C69D] font-heading flex items-center gap-1.5">
                            <span>{order.pricing.finalTotal.toLocaleString()}đ</span>
                            {isFree && (
                              <span className="bg-[#2E7D52] text-white text-[10px] px-1.5 py-0.2 rounded font-bold">
                                FREE
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quick Bank QR button with exact amount for this order */}
                        {onOpenPaymentQR && order.pricing.finalTotal > 0 && (
                          <button
                            onClick={() => onOpenPaymentQR(order.pricing.finalTotal, order.orderId)}
                            className="text-[11px] bg-[#0D2016] hover:bg-[#254E3A] text-[#74C69D] font-semibold px-2 py-1 rounded-lg border border-[#2E6B4B] flex items-center gap-1 transition-colors"
                            title="Hiện mã QR chuyển khoản đúng số tiền đơn này"
                          >
                            <CreditCard className="w-3 h-3 text-[#A7F3D0]" />
                            <span>Mở QR Thu Tiền</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Edit / Add item / Discount button */}
                        <button
                          onClick={() => handleOpenEdit(order)}
                          className="bg-[#183626] hover:bg-[#254E3A] text-[#E8F5EE] font-bold text-xs py-2 px-2.5 rounded-xl transition-all border border-[#2E6B4B] flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#74C69D]" />
                          <span>Sửa / Giảm Giá</span>
                        </button>

                        {/* Complete & Collect Money button */}
                        <button
                          onClick={() => onUpdateStatus(order.orderId, 'completed')}
                          className="bg-[#2E7D52] hover:bg-[#256D46] text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 active:scale-95 border border-[#52B788]/50"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Xong & Thu Tiền</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold text-[#A3C7B2] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#74C69D]" />
            <span>Đơn Đã Xong ({completedOrders.length})</span>
          </h2>

          <div className="bg-[#0D2016] rounded-2xl p-4 border border-[#254E3A] space-y-2.5 max-h-[550px] overflow-y-auto custom-scrollbar">
            {completedOrders.length === 0 ? (
              <p className="text-xs text-[#6B8577] text-center py-8 italic">Chưa có đơn hoàn thành trong ngày</p>
            ) : (
              completedOrders.map((order) => (
                <div 
                  key={order.orderId} 
                  className="bg-[#183626]/80 p-3 rounded-xl border border-[#254E3A] flex justify-between items-start text-xs gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white truncate">{order.customer.name}</span>
                      <span className="text-[10px] text-[#A3C7B2] font-mono">({order.orderId})</span>
                    </div>
                    <div className="text-[11px] text-[#A3C7B2] mt-0.5 line-clamp-1">
                      {order.cart.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                    {order.pricing?.isFree && (
                      <span className="text-[9px] bg-[#2E7D52]/40 text-[#A7F3D0] px-1.5 py-0.2 rounded font-bold">
                        Đã tặng Miễn Phí
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-[#74C69D] font-heading">
                      {order.pricing.finalTotal.toLocaleString()}đ
                    </div>
                    <span className="text-[10px] text-[#6B8577]">{order.createdAt}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Order Edit / Add Items / Discount Modal */}
      {isEditModalOpen && (
        <OrderEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingOrder(null);
          }}
          order={editingOrder}
          menuItems={menuItems}
          onSaveOrder={handleSaveOrder}
          onDeleteOrder={onDeleteOrder}
        />
      )}

    </div>
  );
}
