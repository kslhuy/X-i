import React from 'react';
import { PhoneCall, MapPin, Clock, Heart, Sparkles, Send } from 'lucide-react';

export default function Footer({ onQuickOrder }) {
  return (
    <footer id="delivery-info" className="bg-slate-950 text-white pt-14 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_hãng_xôi.jpg"
                alt="XôïS Logo"
                className="w-12 h-12 rounded-2xl border-2 border-amber-400 object-cover"
              />
              <div>
                <span className="font-heading font-black text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  XôïS
                </span>
                <span className="block text-[11px] text-amber-300 font-semibold">
                  (Đọc là "Xôi iiii Sờ") • Xôi Chay Đa Sắc
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              "Vivez chaque jour en couleur !" — Thương hiệu xôi chay rực rỡ sắc màu, mang nguồn năng lượng thực vật tươi sáng cho cuộc sống của bạn mỗi ngày.
            </p>

            <div className="pt-2">
              <button
                onClick={onQuickOrder}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Đặt Nhanh Bữa Sáng Chay</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Khám Phá XôïS</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Thực Đơn Đa Sắc</a></li>
              <li><a href="#brand-story" className="hover:text-amber-300 transition-colors">Câu Chuyện Màu Sắc</a></li>
              <li><a href="#delivery-info" className="hover:text-amber-300 transition-colors">Giao Hàng Tận Nơi</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Bảng Calo Dinh Dưỡng</a></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Giờ Mở Cửa & Đặt Hàng</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mở cửa: <strong>6h00 – 14h00</strong> (Tất cả các ngày)</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline Đặt Hàng: <strong>0987.654.321</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Cơ sở 1: 18 Phố Chay Rực Rỡ, Q. Hoàn Kiếm, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Đăng Ký Nhận Ưu Đãi Chay</h4>
            <p className="text-xs text-slate-400">Nhận mã giảm 15% cho đơn hàng xôi chay đầu tiên của bạn.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400 text-white"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-xl transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>XôïS</strong> — All rights reserved. Sống mỗi ngày tràn ngập màu sắc!
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Vegetarian Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
