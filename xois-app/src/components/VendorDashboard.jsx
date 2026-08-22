import React from 'react';
import { CheckCircle2, Clock, Volume2, ShoppingBag, Utensils, RefreshCw, Smartphone, QrCode } from 'lucide-react';

export default function VendorDashboard({ orders, onUpdateStatus, onOpenQRCode }) {
  const pendingOrders = orders.filter(o => o.status !== 'completed');
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.pricing.finalTotal, 0);

  return (
    <div className="bg-slate-900 text-white min-h-screen p-4 sm:p-6 font-sans">
      
      {/* Dashboard Top Header */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-black text-xl flex items-center justify-center">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <span>Màn Hình Bếp / Quán Lề Đường — XôïS</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                LIVE Realtime
              </span>
            </h1>
            <p className="text-xs text-slate-400">Khách quét QR tại chỗ sẽ nhảy đơn thẳng về đây tức thì</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQRCode}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg"
          >
            <QrCode className="w-4 h-4" />
            <span>Mã QR Cho Khách Quét</span>
          </button>

          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Doanh Thu Trong Ngày</div>
            <div className="text-base font-black text-emerald-400 font-mono">
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
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Đơn Hàng Đang Chờ Chế Biến ({pendingOrders.length})</span>
            </h2>
            {pendingOrders.length > 0 && (
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full animate-bounce">
                Có đơn mới!
              </span>
            )}
          </div>

          {pendingOrders.length === 0 ? (
            <div className="bg-slate-800/60 rounded-2xl p-12 text-center border border-slate-800">
              <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-400">Chưa có đơn hàng mới</h3>
              <p className="text-xs text-slate-500 mt-1">Khi khách xếp hàng quét mã QR, đơn hàng sẽ tự động hiện lên đây!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-slate-800 rounded-2xl p-4 border-2 border-emerald-500/60 shadow-xl flex flex-col justify-between space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-400">{order.orderId}</span>
                      <h3 className="text-base font-bold text-white mt-0.5">{order.customer.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                        {order.createdAt}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">{order.customer.phone || 'Giao tại chỗ'}</div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-1.5 py-1">
                    {order.cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs">
                        <div className="flex items-start gap-1.5">
                          <span className="font-black text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded text-[11px]">
                            {item.quantity}x
                          </span>
                          <div>
                            <span className="font-bold text-slate-100">{item.name}</span>
                            {item.selectedToppings && item.selectedToppings.length > 0 && (
                              <div className="text-[10px] text-emerald-400 font-medium">
                                + {item.selectedToppings.map(t => t.name).join(', ')}
                              </div>
                            )}
                            {item.note && (
                              <div className="text-[10px] text-amber-300 italic">"{item.note}"</div>
                            )}
                          </div>
                        </div>
                        <span className="font-bold text-slate-300">{item.totalPrice.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>

                  {/* Total & Action Buttons */}
                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">Cần thu:</div>
                      <div className="text-lg font-black text-emerald-400 font-mono">
                        {order.pricing.finalTotal.toLocaleString()}đ
                      </div>
                    </div>

                    <button
                      onClick={() => onUpdateStatus(order.orderId, 'completed')}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>XONG & THU TIỀN</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Đơn Đã Xong ({completedOrders.length})</span>
          </h2>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-800 space-y-2 max-h-[500px] overflow-y-auto">
            {completedOrders.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">Chưa có đơn hoàn thành</p>
            ) : (
              completedOrders.map((order) => (
                <div key={order.orderId} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{order.customer.name} ({order.orderId})</div>
                    <div className="text-[10px] text-slate-400">
                      {order.cart.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                  </div>
                  <div className="text-right font-bold text-emerald-400">
                    {order.pricing.finalTotal.toLocaleString()}đ
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
