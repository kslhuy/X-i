import React from 'react';
import { Sparkles, QrCode, ShieldCheck, Zap } from 'lucide-react';
import { STALL_INFO } from '../data/menuData';

export default function HeroBanner({ onQuickOrder }) {
  return (
    <section className="bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-transparent py-5 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Banner Left Info */}
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1 bg-emerald-100 border border-emerald-300 px-3 py-0.5 rounded-full text-[11px] font-bold text-emerald-900">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>ĐẶT HÀNG TẠI CHỖ • KHÔNG CẦN XẾP HÀNG</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black font-heading text-emerald-950">
            {STALL_INFO.name}
          </h1>

          <p className="text-xs text-slate-600 leading-normal">
            Chọn món xôi chay dẻo thơm ngạt ngào ⏩ Nhập tên/số thẻ ⏩ Bếp nhận đơn và giao tận nơi tại chỗ. Khách có thể trả tiền mặt hoặc chuyển khoản sau!
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[11px] font-bold text-emerald-800">
            <span className="flex items-center gap-1">🌱 100% Chay Lành</span>
            <span className="flex items-center gap-1">⚡ Làm Nóng Tức Thì</span>
            <span className="flex items-center gap-1">💳 Trả Tiền Sau</span>
          </div>
        </div>

        {/* Quick Order Action */}
        <div className="shrink-0 w-full sm:w-auto">
          <button
            onClick={onQuickOrder}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>CHỌN COMBO BÁN CHẠY NHẤT</span>
          </button>
        </div>

      </div>
    </section>
  );
}
