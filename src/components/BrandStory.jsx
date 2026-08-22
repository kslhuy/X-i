import React from 'react';
import { TAGLINES } from '../data/menuData';
import { Sparkles, Heart, Sun, Leaf, Palette, CheckCircle } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="brand-story" className="py-16 bg-gradient-to-b from-white via-amber-50/40 to-amber-100/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-100 to-amber-100 border border-rose-300 px-3.5 py-1 rounded-full text-xs font-extrabold text-rose-900 uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
            <span>Câu Chuyện Thương Hiệu XôïS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900">
            Sắc Màu Thiên Nhiên • Năng Lượng Chay Lành
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong>XôïS</strong> (phát âm là <em>"Xôi iiii Sờ"</em> với chữ <code>ï</code> tréma Pháp) được ra đời từ khát khao mang lại niềm vui rực rỡ sắc màu cho người ăn chay mỗi ngày.
          </p>
        </div>

        {/* 4 Taglines Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TAGLINES.map((t, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-amber-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 font-black text-sm flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  0{index + 1}
                </div>
                <div className="font-serif italic font-bold text-amber-800 text-sm mb-1">
                  "{t.fr}"
                </div>
                <h3 className="font-heading font-black text-base text-slate-900 mb-2">
                  {t.vi}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Năng lượng tích cực</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Values & Visual Gallery */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
              Tại sao chọn xôi chay rực rỡ sắc màu XôïS?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mỗi màu sắc trong hộp xôi XôïS đều được chiết xuất 100% từ nguyên liệu thảo mộc thiên nhiên thuần khiết:
            </p>

            <div className="space-y-3">
              {[
                { title: 'Sắc Đỏ Gấc Tươi', desc: 'Từ quả gấc chín mọng, cung cấp Lycopene & Beta-carotene bổ mắt', color: 'bg-red-500' },
                { title: 'Sắc Vàng Nghệ Củ', desc: 'Nghệ nếp tươi giã nhuyễn hỗ trợ tiêu hóa & kháng viêm', color: 'bg-amber-400' },
                { title: 'Sắc Trắng Cốt Dừa', desc: 'Cốt dừa tươi Bến Tre béo ngậy, bồi bổ năng lượng thuần chay', color: 'bg-emerald-400' },
                { title: 'Sắc Nâu Đậu Phộng', desc: 'Hạt lạc ninh mềm bùi béo, dồi dào đạm thực vật nguyên bản', color: 'bg-amber-800' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/50">
                  <div className={`w-3.5 h-3.5 rounded-full ${item.color} mt-1 shrink-0 shadow-sm`} />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Cam kết 100% không chất bảo quản, không phẩm màu hóa học</span>
            </div>
          </div>

          {/* Right Brand Photo Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="h-44 flex items-center justify-center">
              <img src="/images/logo_hãng_xôi.jpg" alt="XôïS – Sắc màu cuộc sống" className="w-full h-full object-contain" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-amber-200 h-44">
              <img src="/images/xôi_gấc.jpg" alt="Xôi Gấc Chay" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-amber-200 h-44">
              <img src="/images/xôi_xéo.jpg" alt="Xôi Xéo Chay" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-amber-200 h-44">
              <img src="/images/xôi_dừa.jpg" alt="Xôi Dừa Chay" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
