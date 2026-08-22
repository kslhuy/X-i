import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, UtensilsCrossed, QrCode, CreditCard, 
  Edit3, Plus, Gift, Tag, Trash2, ArrowUpRight 
} from 'lucide-react';
import { STALL_INFO } from '../data/menuData';
import OrderEditModal from './OrderEditModal';

export default function VendorDashboard({ 
  orders, 
  onUpdateStatus, 
  onUpdateOrder, 
  onCreateOrder, 
  onDeleteOrder, 
  onOpenQRCode, 
  onOpenPaymentQR 
}) {
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
                const subtotal = order.pricing?.subtotal || order.cart.reduce((s, i) => s + (i.totalPrice || i.unitPrice * i.quantity), 0);

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
                              {order.orderType === 'EAT_HERE' ? 'Tại quán' : order.orderType === 'TAKEAWAY' ? 'Mang về' : 'Đặt sỉ'}
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
          onSaveOrder={handleSaveOrder}
          onDeleteOrder={onDeleteOrder}
        />
      )}

    </div>
  );
}


