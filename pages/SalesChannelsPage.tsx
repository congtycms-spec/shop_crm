
import React from 'react';

const channels = [
  { name: 'Shopee Store', desc: 'Đang hoạt động', icon: 'S', color: 'bg-[#ee4d2d]', status: 'active' },
  { name: 'Facebook Shop', desc: 'Đang hoạt động', icon: 'FB', color: 'bg-[#1877F2]', status: 'active', isSymbol: true, symbolName: 'social_leaderboard' },
  { name: 'Lazada Mall', desc: 'Đang hoạt động', icon: 'L', color: 'bg-[#0f146d]', status: 'active', isLazada: true },
  { name: 'Tiki Trading', desc: 'Chưa kết nối', icon: 'Tiki', color: 'bg-[#1A94FF]', status: 'inactive' },
  { name: 'Zalo OA', desc: 'Chưa kết nối', icon: 'Zalo', color: 'bg-[#0068FF]', status: 'inactive' },
  { name: 'Sendo Shop', desc: 'Chưa kết nối', icon: 'Sendo', color: 'bg-[#E62E04]', status: 'inactive' },
];

const SalesChannelsPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Kênh bán hàng</h1>
          <p className="text-text-secondary text-base">Quản lý kết nối Shopee, Lazada, Tiki, Facebook, Zalo</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm kết nối mới
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Đơn mới hôm nay', value: '25', trend: '+12%', color: 'text-green-700', bg: 'bg-green-100' },
          { label: 'Đang giao hàng', value: '10', trend: '+5%', color: 'text-green-700', bg: 'bg-green-100' },
          { label: 'Đã hoàn tất', value: '5', trend: '0%', color: 'text-slate-600', bg: 'bg-slate-100' },
          { label: 'Doanh thu tạm tính', value: '12.5 tr', trend: '+8%', color: 'text-green-700', bg: 'bg-green-100' }
        ].map((s, i) => (
          <div key={i} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">{s.label}</p>
              <span className={`${s.bg} ${s.color} text-[10px] font-black px-2 py-0.5 rounded-full`}>{s.trend}</span>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Các kênh đã kết nối</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((ch, i) => (
            <div key={i} className={`bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center justify-between transition-all ${ch.status === 'inactive' ? 'opacity-70 hover:opacity-100' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-lg ${ch.color} flex items-center justify-center text-white font-black text-[10px] relative overflow-hidden`}>
                  {ch.isSymbol ? (
                    <span className="material-symbols-outlined text-white">{ch.symbolName}</span>
                  ) : ch.isLazada ? (
                    <>
                      <span className="z-10">{ch.icon}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff007f] to-[#0f146d] opacity-50"></div>
                    </>
                  ) : (
                    <span>{ch.icon}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{ch.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={`size-1.5 rounded-full ${ch.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                    <span className="text-[10px] font-bold text-text-secondary uppercase">{ch.desc}</span>
                  </div>
                </div>
              </div>
              {ch.status === 'active' ? (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              ) : (
                <button className="text-primary text-xs font-black hover:underline">KẾT NỐI</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Đơn hàng gần đây</h2>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Xem tất cả <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-text-secondary tracking-widest">
                <tr>
                  <th className="py-4 px-6">Mã đơn</th>
                  <th className="py-4 px-6">Kênh</th>
                  <th className="py-4 px-6">Khách hàng</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {[
                  { id: '#ORD-9382', ch: 'Shopee', cust: 'Nguyễn Thùy Chi', status: 'Đang giao', price: '450.000đ', stColor: 'bg-blue-100 text-blue-700' },
                  { id: '#ORD-9381', ch: 'Facebook', cust: 'Trần Văn Nam', status: 'Chờ xác nhận', price: '180.000đ', stColor: 'bg-yellow-100 text-yellow-700' },
                  { id: '#ORD-9380', ch: 'Lazada', cust: 'Phạm Hương', status: 'Hoàn tất', price: '620.000đ', stColor: 'bg-green-100 text-green-700' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-6 font-bold">{row.id}</td>
                    <td className="py-4 px-6 font-medium">{row.ch}</td>
                    <td className="py-4 px-6">{row.cust}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${row.stColor}`}>{row.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right font-bold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesChannelsPage;
