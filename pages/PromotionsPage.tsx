
import React, { useState } from 'react';
import { Promotion } from '../types';

interface PriceList {
  id: string;
  name: string;
  segment: string;
  branches: string;
  itemsCount: number;
  status: 'Đang áp dụng' | 'Nháp' | 'Hết hạn' | 'Sắp hết hạn';
  lastUpdated: string;
  expiryDate?: string;
}

const promos: Promotion[] = [
  { id: '1', code: 'SUM24', name: 'Sale Hè Rực Rỡ 2024', usage: '142/500', type: 'Mã giảm giá (15%)', period: '01/06 - 30/06', branch: 'Toàn hệ thống', status: 'Đang chạy' },
  { id: '2', code: 'VIP', name: 'Ưu đãi khách hàng VIP', usage: 'Tự động', type: 'Tích điểm (x2)', period: 'Không giới hạn', branch: 'Toàn hệ thống', status: 'Đang chạy' },
  { id: '3', code: 'FLS', name: 'Flash Sale Áo Thun', usage: '0/100', type: 'Giá sốc (99k)', period: '10/07 09:00 - 11:00', branch: 'Hà Nội', status: 'Sắp diễn ra' },
  { id: '4', code: 'MAY', name: 'Chào tháng 5', usage: '89/100', type: 'Mã giảm giá (10%)', period: '01/05 - 31/05', branch: 'Toàn hệ thống', status: 'Đã kết thúc' }
];

const priceLists: PriceList[] = [
  { id: 'PL01', name: 'Bảng giá Khách sỉ Miền Nam', segment: 'Khách sỉ (Wholesale)', branches: 'HCM, Cần Thơ', itemsCount: 1250, status: 'Đang áp dụng', lastUpdated: '2 giờ trước' },
  { id: 'PL02', name: 'Giá ưu đãi VIP Gold', segment: 'VIP Gold', branches: 'Toàn hệ thống', itemsCount: 450, status: 'Sắp hết hạn', lastUpdated: 'Hôm qua', expiryDate: '24/10/2023' },
  { id: 'PL03', name: 'Bảng giá khai trương CN Đà Nẵng', segment: 'Tất cả', branches: 'Đà Nẵng', itemsCount: 800, status: 'Hết hạn', lastUpdated: '15/05/2024', expiryDate: '10/05/2024' },
  { id: 'PL04', name: 'Giá đặc biệt sự kiện Year End', segment: 'Nhân viên', branches: 'Toàn bộ', itemsCount: 120, status: 'Nháp', lastUpdated: 'Vừa xong' },
];

const PromotionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'promos' | 'prices' | 'history'>('promos');

  const renderPromosContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Tạo nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Mã giảm giá', sub: 'Tạo code giảm % hoặc tiền', icon: 'percent', bg: 'bg-blue-100', text: 'text-blue-600' },
            { label: 'Flash Sale', sub: 'Giảm giá theo khung giờ', icon: 'flash_on', bg: 'bg-orange-100', text: 'text-orange-600' },
            { label: 'Mua X tặng Y', sub: 'Quà tặng kèm sản phẩm', icon: 'redeem', bg: 'bg-purple-100', text: 'text-purple-600' },
            { label: 'Tích điểm', sub: 'Cấu hình quy đổi điểm', icon: 'loyalty', bg: 'bg-green-100', text: 'text-green-600' }
          ].map((act, i) => (
            <button key={i} className="flex flex-col items-start gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary/50 transition-all group text-left">
              <div className={`size-10 rounded-full ${act.bg} ${act.text} flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors`}>
                <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
              </div>
              <div>
                <p className="font-bold text-sm">{act.label}</p>
                <p className="text-[10px] text-text-secondary">{act.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Danh sách chương trình</h3>
          <div className="flex gap-2">
            <select className="h-9 rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs px-3 focus:ring-primary focus:border-primary">
              <option>Tất cả trạng thái</option>
              <option>Đang chạy</option>
              <option>Sắp diễn ra</option>
            </select>
            <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-text-secondary font-medium">
              <tr>
                <th className="px-4 py-3">Tên chương trình</th>
                <th className="px-4 py-3">Loại</th>
                <th className="px-4 py-3">Thời gian</th>
                <th className="px-4 py-3">Chi nhánh</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {promos.map(p => (
                <tr key={p.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors ${p.status === 'Đã kết thúc' ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        p.status === 'Đang chạy' ? 'bg-primary/10 text-primary' :
                        p.status === 'Sắp diễn ra' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {p.code}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white leading-tight">{p.name}</p>
                        <p className="text-[10px] text-text-secondary">Đã dùng: {p.usage}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs font-medium">{p.type}</td>
                  <td className="px-4 py-4 text-xs text-text-secondary">{p.period}</td>
                  <td className="px-4 py-4 text-xs">{p.branch}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'Đang chạy' ? 'bg-green-50 text-green-700' :
                      p.status === 'Sắp diễn ra' ? 'bg-yellow-50 text-yellow-700' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary p-1.5 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPricesContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Thiết lập Bảng giá bán</h3>
          <p className="text-xs text-text-secondary">Tùy chỉnh giá theo phân khúc khách hàng hoặc địa lý</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all border border-primary/20">
          <span className="material-symbols-outlined text-lg">add_card</span>
          Tạo bảng giá mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Bảng giá đang chạy', val: '3', icon: 'price_check', color: 'text-green-600' },
          { label: 'Phân khúc áp dụng', val: 'VIP, Sỉ', icon: 'groups_3', color: 'text-blue-600' },
          { label: 'Cảnh báo sắp hết hạn', val: '1', icon: 'warning', color: 'text-orange-500' },
          { label: 'Chi nhánh có giá riêng', val: '2', icon: 'store', color: 'text-purple-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-background-light dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className={`size-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center ${stat.color} shadow-sm border border-slate-50 dark:border-slate-600`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-text-secondary tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-text-secondary font-medium">
            <tr>
              <th className="px-4 py-3">Tên bảng giá</th>
              <th className="px-4 py-3">Đối tượng</th>
              <th className="px-4 py-3">Chi nhánh</th>
              <th className="px-4 py-3">Số SP áp dụng</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {priceLists.map(pl => {
              const isExpired = pl.status === 'Hết hạn';
              const isExpiringSoon = pl.status === 'Sắp hết hạn';
              
              return (
                <tr key={pl.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors ${isExpired ? 'opacity-50 grayscale-[0.5]' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-1.5 rounded-full shrink-0 ${isExpired ? 'bg-red-500' : isExpiringSoon ? 'bg-orange-500 animate-pulse' : pl.status === 'Nháp' ? 'bg-slate-400' : 'bg-green-500'}`}></div>
                      <div>
                        <p className={`font-bold leading-tight ${isExpired ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>{pl.name}</p>
                        <p className="text-[10px] text-text-secondary">Cập nhật: {pl.lastUpdated}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{pl.segment}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs">{pl.branches}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold">{pl.itemsCount.toLocaleString()} sp</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                        pl.status === 'Đang áp dụng' ? 'bg-green-50 text-green-700 border-green-100' :
                        pl.status === 'Sắp hết hạn' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                        pl.status === 'Nháp' ? 'bg-slate-50 text-slate-600 border-slate-100' : 
                        'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {pl.status === 'Đang áp dụng' ? 'check_circle' :
                           pl.status === 'Sắp hết hạn' ? 'running_with_errors' :
                           pl.status === 'Nháp' ? 'edit_note' : 'timer_off'}
                        </span>
                        {pl.status}
                      </span>
                      {isExpiringSoon && (
                        <span className="text-[9px] text-orange-600 font-bold px-1 italic">Hết hạn sau 3 ngày</span>
                      )}
                      {isExpired && pl.expiryDate && (
                        <span className="text-[9px] text-red-600 font-bold px-1">Đã hết hạn: {pl.expiryDate}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="text-slate-400 hover:text-primary p-1.5 rounded-full transition-colors" title="Chỉnh sửa">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="text-slate-400 hover:text-blue-500 p-1.5 rounded-full transition-colors" title="Sao chép">
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <button className="hover:text-primary transition-colors">Dashboard</button>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-bold">Khuyến mãi & Giá</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Khuyến mãi & Giá</h2>
          <p className="text-text-secondary text-base">Quản lý chiến dịch marketing, voucher và thiết lập bảng giá bán</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            {activeTab === 'promos' ? 'Tạo chương trình mới' : 'Tạo bảng giá mới'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Chiến dịch đang chạy', value: '12', trend: '2', icon: 'campaign', color: 'text-primary' },
          { label: 'Voucher dùng hôm nay', value: '85', trend: '15%', icon: 'confirmation_number', color: 'text-orange-500' },
          { label: 'Bảng giá áp dụng', value: '4', trend: 'Trên 6 chi nhánh', icon: 'price_change', color: 'text-purple-500', isSub: true }
        ].map((s, i) => (
          <div key={i} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">{s.label}</p>
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold leading-tight">{s.value}</p>
              {s.isSub ? (
                <p className="text-text-secondary text-sm mb-1 font-medium">{s.trend}</p>
              ) : (
                <div className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  <span>{s.trend}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px]">
        <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('promos')}
            className={`px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'promos' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-secondary hover:text-slate-900'}`}
          >
            Chương trình khuyến mãi
          </button>
          <button 
            onClick={() => setActiveTab('prices')}
            className={`px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'prices' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-secondary hover:text-slate-900'}`}
          >
            Bảng giá & Chính sách
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'history' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-secondary hover:text-slate-900'}`}
          >
            Lịch sử Voucher
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'promos' && renderPromosContent()}
          {activeTab === 'prices' && renderPricesContent()}
          {activeTab === 'history' && (
            <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
              <span className="material-symbols-outlined text-5xl mb-4 opacity-20">history_edu</span>
              <p className="text-sm font-medium">Chưa có dữ liệu lịch sử sử dụng Voucher</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;
