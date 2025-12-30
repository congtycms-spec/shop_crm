
import React, { useState } from 'react';
import { Customer } from '../types';

const mockCustomers: Customer[] = [
  {
    id: 'KH00129',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    tier: 'Gold',
    spending: 15000000,
    lastPurchase: '2 ngày trước',
    avatar: 'https://picsum.photos/200/200?random=21',
    email: 'nva@example.com',
    birthday: '15/08/1990',
    gender: 'Nam',
    address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    note: 'Khách thích màu trung tính, thường mua quà cho vợ vào tháng 10.'
  },
  {
    id: 'KH00130',
    name: 'Trần Thị B',
    phone: '0912345678',
    tier: 'Regular',
    spending: 5200000,
    lastPurchase: '18/10/2023',
    avatar: 'https://picsum.photos/200/200?random=22',
    email: 'ttb@example.com',
    birthday: '20/12/1995',
    gender: 'Nữ',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    note: 'Hay mua đầm hoa.'
  },
  {
    id: 'KH00131',
    name: 'Lê Văn C',
    phone: '0987654321',
    tier: 'New',
    spending: 850000,
    lastPurchase: '21/10/2023',
    avatar: 'https://picsum.photos/200/200?random=23',
    email: 'lvc@example.com',
    birthday: '05/03/1988',
    gender: 'Nam',
    address: '789 Võ Văn Tần, Quận 3, TP.HCM',
    note: ''
  },
  {
    id: 'KH00132',
    name: 'Phạm Thị D',
    phone: '0933445566',
    tier: 'Silver',
    spending: 8000000,
    lastPurchase: '15/09/2023',
    avatar: 'https://picsum.photos/200/200?random=24',
    email: 'ptd@example.com',
    birthday: '12/11/1992',
    gender: 'Nữ',
    address: '101 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM',
    note: ''
  }
];

const CustomersPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(mockCustomers[0].id);
  const selectedCustomer = mockCustomers.find(c => c.id === selectedId) || mockCustomers[0];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Quản lý Khách hàng</h1>
          <p className="text-text-secondary text-sm font-medium">Theo dõi thông tin và chăm sóc khách hàng thân thiết</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Nhập Excel
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Thêm khách hàng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start h-full">
        {/* Left List */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800 text-sm focus:ring-1 focus:ring-primary outline-none" 
                placeholder="Tìm theo tên, SĐT, mã KH..." 
                type="text" 
              />
            </div>
            <select className="bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm rounded-lg p-2 min-w-[140px]">
              <option>Tất cả nhóm</option>
              <option>VIP Gold</option>
              <option>VIP Silver</option>
              <option>Mới</option>
            </select>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded text-primary focus:ring-primary" /></th>
                  <th className="px-6 py-4 font-bold">Khách hàng</th>
                  <th className="px-6 py-4 font-bold">Nhóm khách</th>
                  <th className="px-6 py-4 font-bold text-right">Chi tiêu</th>
                  <th className="px-6 py-4 font-bold hidden md:table-cell">Ngày mua cuối</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockCustomers.map(c => (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedId(c.id)}
                    className={`cursor-pointer transition-colors border-l-4 ${selectedId === c.id ? 'bg-primary/5 border-l-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800/20 border-l-transparent'}`}
                  >
                    <td className="px-6 py-4"><input type="checkbox" checked={selectedId === c.id} readOnly className="rounded text-primary focus:ring-primary" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-cover bg-center shrink-0 border border-slate-200" style={{ backgroundImage: `url("${c.avatar}")` }}></div>
                        <div className="flex flex-col">
                          <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                          <p className="text-text-secondary text-xs">{c.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset ${
                        c.tier === 'Gold' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' : 
                        c.tier === 'Silver' ? 'bg-slate-50 text-slate-700 ring-slate-600/20' :
                        'bg-blue-50 text-blue-700 ring-blue-600/20'
                      }`}>
                        {c.tier === 'Gold' && <span className="material-symbols-outlined text-[12px] fill">stars</span>}
                        VIP {c.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">{c.spending.toLocaleString('vi-VN')}đ</td>
                    <td className="px-6 py-4 text-text-secondary hidden md:table-cell">{c.lastPurchase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="col-span-12 xl:col-span-4 h-full sticky top-4">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="absolute -bottom-8 left-6">
                <div className="size-20 rounded-full border-4 border-white dark:border-slate-800 bg-cover bg-center shadow-md" style={{ backgroundImage: `url("${selectedCustomer.avatar}")` }}></div>
              </div>
            </div>
            <div className="pt-10 px-6 pb-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedCustomer.name}</h3>
                  <p className="text-text-secondary text-sm">Mã KH: #{selectedCustomer.id}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30 px-2.5 py-1 text-xs font-bold text-yellow-800 border border-yellow-200">
                  <span className="material-symbols-outlined text-[14px] fill">stars</span> VIP {selectedCustomer.tier}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['call', 'sms', 'chat_bubble', 'mail'].map(icon => (
                  <button key={icon} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 group transition-colors">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Ngày sinh</p>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-pink-500 fill">cake</span>
                      {selectedCustomer.birthday}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Giới tính</p>
                    <p className="text-sm font-medium">{selectedCustomer.gender}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary">Địa chỉ</p>
                  <p className="text-sm font-medium leading-tight">{selectedCustomer.address}</p>
                </div>
                {selectedCustomer.note && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-xs italic text-yellow-800 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900/30">
                    "{selectedCustomer.note}"
                  </div>
                )}
                <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all h-10 rounded-lg text-sm font-bold mt-4">
                  <span className="material-symbols-outlined text-sm">redeem</span> Gửi Voucher giảm giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
