import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import VendorDashboard from './components/VendorDashboard';
import QRCodeModal from './components/QRCodeModal';
import OwnerPaymentModal from './components/OwnerPaymentModal';
import Footer from './components/Footer';
import { MENU_ITEMS, STALL_INFO, WHOLESALE_ITEMS } from './data/menuData';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('customer'); // 'customer' or 'vendor'
  const [orderMode, setOrderMode] = useState('retail'); // 'retail' or 'wholesale'
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const savedPrices = JSON.parse(localStorage.getItem('xois_menu_prices') || '{}');
      return MENU_ITEMS.map(item => ({
        ...item,
        price: Number.isFinite(savedPrices[item.id]) && savedPrices[item.id] > 0
          ? savedPrices[item.id]
          : item.price
      }));
    } catch {
      return MENU_ITEMS;
    }
  });
  const [bankInfo, setBankInfo] = useState(() => {
    try {
      const savedBankInfo = JSON.parse(localStorage.getItem('xois_bank_info') || '{}');
      const savedAccountNumber = typeof savedBankInfo.accountNumber === 'string'
        ? savedBankInfo.accountNumber.trim()
        : '';

      return {
        ...STALL_INFO.bank,
        ...(/^\d{6,20}$/.test(savedAccountNumber) ? { accountNumber: savedAccountNumber } : {})
      };
    } catch {
      return STALL_INFO.bank;
    }
  });
  const [carts, setCarts] = useState({ retail: [], wholesale: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [isPaymentQROpen, setIsPaymentQROpen] = useState(false);
  const [paymentQRDetails, setPaymentQRDetails] = useState({ suggestedAmount: 0, orderReference: '' });
  const [checkoutPricing, setCheckoutPricing] = useState({ subtotal: 0, discountAmount: 0, shippingFee: 0, finalTotal: 0 });
  const [completedOrder, setCompletedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Live Orders state (persisted in localStorage for demo)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('xois_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'XP-102',
          customer: { name: 'Bàn 02 (Anh Minh)', phone: 'Ăn tại chỗ', address: 'Bàn 2' },
          cart: [{ name: 'Xôi Gấc Phú Thượng', quantity: 2, totalPrice: 24000 }],
          pricing: { finalTotal: 24000 },
          status: 'pending',
          createdAt: '07:15'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('xois_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const prices = Object.fromEntries(menuItems.map(item => [item.id, item.price]));
    localStorage.setItem('xois_menu_prices', JSON.stringify(prices));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('xois_bank_info', JSON.stringify(bankInfo));
  }, [bankInfo]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const cart = carts[orderMode];

  const updateModeCart = (mode, updater) => {
    setCarts(prev => ({
      ...prev,
      [mode]: typeof updater === 'function' ? updater(prev[mode]) : updater
    }));
  };

  const handleAddToCart = (item) => {
    const mode = item.saleMode === 'wholesale' ? 'wholesale' : 'retail';
    const addQuantity = item.minQuantity || item.step || 1;
    setOrderMode(mode);
    updateModeCart(mode, currentCart => {
      const existingIndex = currentCart.findIndex(c => c.id === item.id);
      if (existingIndex > -1) {
        const updatedCart = [...currentCart];
        const nextQuantity = updatedCart[existingIndex].quantity + (item.step || 1);
        updatedCart[existingIndex].quantity = Number(nextQuantity.toFixed(2));
        updatedCart[existingIndex].totalPrice = Number.isFinite(updatedCart[existingIndex].unitPrice)
          ? updatedCart[existingIndex].unitPrice * updatedCart[existingIndex].quantity
          : 0;
        return updatedCart;
      }

      const unitPrice = Number.isFinite(item.price) ? item.price : null;
      return [
        ...currentCart,
        {
          ...item,
          quantity: addQuantity,
          unitPrice,
          totalPrice: Number.isFinite(unitPrice) ? unitPrice * addQuantity : 0,
          requiresQuote: !Number.isFinite(unitPrice)
        }
      ];
    });
    showToast(`Đã thêm "${item.name}" (+${addQuantity}${item.unit ? ` ${item.unit}` : ''})`);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      updateModeCart(orderMode, updatedCart);
    } else {
      const updatedCart = [...cart];
      const normalizedQuantity = Number(newQty.toFixed(2));
      updatedCart[index].quantity = normalizedQuantity;
      updatedCart[index].totalPrice = Number.isFinite(updatedCart[index].unitPrice)
        ? updatedCart[index].unitPrice * normalizedQuantity
        : 0;
      updateModeCart(orderMode, updatedCart);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateModeCart(orderMode, updatedCart);
  };

  const handleUpdateMenuPrices = (updatedPrices) => {
    const normalizedPrices = Object.fromEntries(
      Object.entries(updatedPrices).map(([id, price]) => [id, Math.round(Number(price))])
    );

    setMenuItems(prev => prev.map(item => ({
      ...item,
      price: normalizedPrices[item.id] > 0 ? normalizedPrices[item.id] : item.price
    })));

    updateModeCart('retail', prev => prev.map(item => {
        const nextPrice = normalizedPrices[item.id];
        if (item.isCustom || !(nextPrice > 0)) return item;
        return {
          ...item,
          price: nextPrice,
          unitPrice: nextPrice,
          totalPrice: nextPrice * item.quantity
        };
      }));

    showToast('Đã cập nhật giá thực đơn');
  };

  const handleUpdateBankAccount = (accountNumber) => {
    setBankInfo(prev => ({ ...prev, accountNumber }));
    showToast('Đã cập nhật số tài khoản ngân hàng');
  };

  const handleOpenPaymentQR = (amount = 0, reference = '') => {
    setPaymentQRDetails({
      suggestedAmount: typeof amount === 'number' ? amount : 0,
      orderReference: typeof reference === 'string' ? reference : ''
    });
    setIsPaymentQROpen(true);
  };

  const handleProceedCheckout = (pricing) => {
    setCheckoutPricing(pricing);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = (newOrder) => {
    const orderObj = { ...newOrder, status: 'pending' };
    setOrders(prev => [orderObj, ...prev]);
    setIsCheckoutOpen(false);
    updateModeCart(orderMode, []);
    setCompletedOrder(orderObj);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    if (newStatus === 'completed') {
      showToast(`Đã hoàn thành đơn ${orderId}`);
    }
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders(prev => prev.map(o => o.orderId === updatedOrder.orderId ? updatedOrder : o));
    showToast(`Đã lưu thay đổi đơn ${updatedOrder.orderId}`);
  };

  const handleCreateOrderFromVendor = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Đã lên bếp đơn mới ${newOrder.orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
    showToast(`Đã hủy đơn ${orderId}`);
  };

  const cartCount = Number(cart.reduce((sum, item) => sum + item.quantity, 0).toFixed(2));
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCountLabel = orderMode === 'wholesale' ? `${cartCount} kg` : `${cartCount}`;

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#231F1C] bg-transparent">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1E4D3A] text-[#F4F8F5] text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-[#ADCDB3] animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-[#2E7D52] text-white flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Customer vs Vendor mode switcher */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
        onOpenPaymentQR={() => handleOpenPaymentQR(cartTotal)}
        orderMode={orderMode}
        cartCountLabel={cartCountLabel}
      />

      {activeView === 'customer' ? (
        /* Customer Mobile Order View */
        <main className="flex-1">
          <HeroBanner onOpenPaymentQR={() => handleOpenPaymentQR()} />

          <MenuSection
            menuItems={menuItems}
            wholesaleItems={WHOLESALE_ITEMS}
            orderMode={orderMode}
            onChangeOrderMode={setOrderMode}
            onAddToCart={handleAddToCart}
          />
          
          <Footer 
            onOpenPaymentQR={() => handleOpenPaymentQR()} 
            bankInfo={bankInfo}
          />
        </main>
      ) : (
        /* Realtime Vendor/Kitchen Live Order Board */
        <main className="flex-1">
          <VendorDashboard
            orders={orders}
            menuItems={menuItems}
            bankInfo={bankInfo}
            onUpdateMenuPrices={handleUpdateMenuPrices}
            onUpdateBankAccount={handleUpdateBankAccount}
            onUpdateStatus={handleUpdateOrderStatus}
            onUpdateOrder={handleUpdateOrder}
            onCreateOrder={handleCreateOrderFromVendor}
            onDeleteOrder={handleDeleteOrder}
            onOpenQRCode={() => setIsQRCodeOpen(true)}
            onOpenPaymentQR={handleOpenPaymentQR}
          />
        </main>
      )}

      {/* Floating Bottom Quick Cart Bar (Mobile) */}
      {activeView === 'customer' && cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between font-bold text-xs border border-[#143527] animate-pulse-subtle"
          >
            <div className="flex items-center gap-2">
              <div className="bg-[#E8F5EE] text-[#1E4D3A] font-bold text-xs px-2.5 py-1 rounded-lg">
                {orderMode === 'wholesale' ? cartCountLabel : `${cartCount} món`}
              </div>
              <span>{orderMode === 'wholesale' ? 'Xem Đơn Bán Buôn' : 'Xem Giỏ Hàng'}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold font-heading">
              <span>{orderMode === 'wholesale' ? 'Chờ báo giá' : `${cartTotal.toLocaleString()}đ`}</span>
              <ShoppingBag className="w-4 h-4 ml-1 text-[#74C69D]" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
        orderMode={orderMode}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          pricing={checkoutPricing}
          orderMode={orderMode}
          onCompleteOrder={handleCompleteOrder}
          onOpenPaymentQR={() => handleOpenPaymentQR(checkoutPricing.finalTotal)}
        />
      )}

      {/* Order Success Modal */}
      {completedOrder && (
        <OrderSuccessModal
          orderDetails={completedOrder}
          onClose={() => setCompletedOrder(null)}
          onOpenPaymentQR={(amt, ref) => handleOpenPaymentQR(amt, ref)}
        />
      )}

      {/* Table/Wall QR Printable Modal */}
      {isQRCodeOpen && (
        <QRCodeModal
          isOpen={isQRCodeOpen}
          onClose={() => setIsQRCodeOpen(false)}
        />
      )}

      {/* Owner Payment QR & Bank Account Modal */}
      {isPaymentQROpen && (
        <OwnerPaymentModal
          isOpen={isPaymentQROpen}
          onClose={() => setIsPaymentQROpen(false)}
          suggestedAmount={paymentQRDetails.suggestedAmount}
          orderReference={paymentQRDetails.orderReference}
          bankInfo={bankInfo}
        />
      )}

    </div>
  );
}
