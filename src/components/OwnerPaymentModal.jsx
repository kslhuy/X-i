import React, { useState } from 'react';
import { X, Copy, Check, QrCode, CreditCard, Building2, User, ShieldCheck } from 'lucide-react';
import { STALL_INFO } from '../data/menuData';

export default function OwnerPaymentModal({ isOpen, onClose, suggestedAmount, orderReference }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const bank = STALL_INFO.bank;

  // Build high-res VietQR format URL
  const transferContent = orderReference ? `XOI ${orderReference}` : 'XOI PHU THUONG';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://vietqr.me/mb/${bank.accountNumber}/${encodeURIComponent(bank.accountHolder)}/${suggestedAmount || 0}/${encodeURIComponent(transferContent)}&color=1E4D3A&bgcolor=ffffff`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bank.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143527]/60 backdrop-blur-sm animate-slide-up">
      <div className="bg-[#F4F8F5] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#C3DEC8] p-6 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#D4E7D8] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1E4D3A] text-[#F4F8F5] flex items-center justify-center">
              <QrCode className="w-4 h-4 text-[#74C69D]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#1D2A22]">Chuyển Khoản & Quét Mã QR</h3>
              <p className="text-[11px] text-[#536B5C]">Tài khoản chính thức của chủ quán</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-[#536B5C] hover:text-[#1D2A22] hover:bg-[#E8F5EE] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="bg-white rounded-2xl p-4 border border-[#D4E7D8] shadow-xs text-center space-y-3">
          <div className="inline-flex items-center gap-1 bg-[#E8F5EE] text-[#1E4D3A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#BFE0C8]">
            <ShieldCheck className="w-3 h-3 text-[#2E7D52]" /> Quét nhanh bằng mọi App Ngân Hàng / MoMo
          </div>

          <div className="relative inline-block bg-white p-2.5 rounded-2xl border-2 border-[#1E4D3A]/20 shadow-inner">
            <img
              src={qrUrl}
              alt="Mã QR Chuyển Khoản Chủ Quán"
              className="w-48 h-48 sm:w-52 sm:h-52 mx-auto object-contain"
            />
            {suggestedAmount > 0 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#1E4D3A] text-white text-[11px] font-mono font-bold px-3 py-0.5 rounded-full shadow-xs">
                {suggestedAmount.toLocaleString()}đ
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#536B5C]">
            Mở ứng dụng ngân hàng bất kỳ (MB, Vietcombank, Techcombank, BIDV, MoMo...) và quét mã
          </p>
        </div>

        {/* Bank Account Details Card */}
        <div className="bg-[#E8F5EE] rounded-2xl p-3.5 border border-[#BFE0C8] space-y-2 text-xs">
          
          <div className="flex items-center justify-between py-1 border-b border-[#D4E7D8]">
            <span className="text-[#536B5C] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#2E7D52]" /> Ngân hàng:
            </span>
            <span className="font-bold text-[#1D2A22]">{bank.bankName}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#D4E7D8]">
            <span className="text-[#536B5C] flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#2E7D52]" /> Số tài khoản:
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#1E4D3A] tracking-wider">
                {bank.accountNumber}
              </span>
              <button
                onClick={handleCopyAccount}
                className="bg-[#1E4D3A] hover:bg-[#143527] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all active:scale-95 shadow-xs border border-[#143527]"
              >
                {copied ? <Check className="w-3 h-3 text-[#74C69D]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Đã chép!' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-[#536B5C] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#2E7D52]" /> Chủ tài khoản:
            </span>
            <span className="font-bold text-[#1D2A22] uppercase">{bank.accountHolder}</span>
          </div>

        </div>

        {/* Note / Memo */}
        <div className="text-[11px] text-[#536B5C] text-center italic">
          Nội dung chuyển khoản gợi ý: <span className="font-semibold text-[#1E4D3A] font-mono not-italic">{transferContent}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#1E4D3A] hover:bg-[#143527] text-[#F4F8F5] font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-98 border border-[#143527]"
        >
          Đã Hiểu / Đóng Cửa Sổ
        </button>

      </div>
    </div>
  );
}

