import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import VendorDashboard from './components/VendorDashboard';
import QRCodeModal from './components/QRCodeModal';
import Footer from './components/Footer';
import { MENU_ITEMS, STALL_INFO } from './data/menuData';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('customer'); // 'customer' or 'vendor'
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [checkoutPricing, setCheckoutPricing] = useState({ subtotal: 0, discountAmount: 0, shippingFee: 0, finalTotal: 0 });
  const [completedOrder, setCompletedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Live Orders state (persisted in localStorage for demo)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('xois_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'XÔÏS-102',
          customer: { name: 'Khách 02 (Anh Minh)', phone: 'Ăn tại chỗ', address: 'Bàn 2' },
          cart: [{ name: 'Xôi Gấc Chay', quantity: 2, totalPrice: 50000 }],
          pricing: { finalTotal: 50000 },
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddToCart = (item) => {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      updatedCart[existingIndex].totalPrice = updatedCart[existingIndex].unitPrice * updatedCart[existingIndex].quantity;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          unitPrice: item.price,
          totalPrice: item.price
        }
      ]);
    }
    showToast(`Đã thêm "${item.name}" (+1)`);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQty;
      updatedCart[index].totalPrice = updatedCart[index].unitPrice * newQty;
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleOpenQuickOrder = () => {
    const popularItem = MENU_ITEMS.find(i => i.id === 'combo-ngu-sac') || MENU_ITEMS[0];
    handleAddToCart(popularItem);
    setIsCartOpen(true);
  };

  const handleProceedCheckout = (pricing) => {
    setCheckoutPricing(pricing);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = (newOrder) => {
    const orderObj = { ...newOrder, status: 'pending' };
    setOrders(prev => [orderObj, ...prev]);
    setIsCheckoutOpen(false);
    setCart([]);
    setCompletedOrder(orderObj);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-transparent">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
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
      />

      {activeView === 'customer' ? (
        /* Customer Mobile Order View */
        <main className="flex-1">
          <HeroBanner onQuickOrder={handleOpenQuickOrder} />

          <MenuSection onAddToCart={handleAddToCart} />
          
          <Footer onQuickOrder={handleOpenQuickOrder} />
        </main>
      ) : (
        /* Realtime Vendor/Kitchen Live Order Board */
        <main className="flex-1">
          <VendorDashboard
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
            onOpenQRCode={() => setIsQRCodeOpen(true)}
          />
        </main>
      )}

      {/* Floating Bottom Quick Cart Bar (Mobile) */}
      {activeView === 'customer' && cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between font-bold text-xs border border-emerald-300 animate-pulse-subtle"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white text-emerald-950 font-black text-xs px-2.5 py-1 rounded-lg">
                {cartCount} món
              </div>
              <span>Xem Giỏ Hàng</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-sm font-black">
              <span>{cartTotal.toLocaleString()}đ</span>
              <ShoppingBag className="w-4 h-4 ml-1" />
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
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          pricing={checkoutPricing}
          onCompleteOrder={handleCompleteOrder}
        />
      )}

      {/* Order Success Modal */}
      {completedOrder && (
        <OrderSuccessModal
          orderDetails={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

      {/* Printable QR Code Modal */}
      {isQRCodeOpen && (
        <QRCodeModal
          isOpen={isQRCodeOpen}
          onClose={() => setIsQRCodeOpen(false)}
        />
      )}

    </div>
  );
}
