
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'T1', value: 40 },
  { name: 'T2', value: 55 },
  { name: 'T3', value: 35 },
  { name: 'T4', value: 70 },
  { name: 'T5', value: 60 },
  { name: 'T6', value: 80 },
  { name: 'T7', value: 95 },
];

const stats = [
  { label: 'Doanh thu tháng', value: '520.000.000 ₫', trend: '+12%', sub: 'so với tháng trước', color: 'text-primary', bg: 'bg-primary/10', icon: 'payments' },
  { label: 'Lợi nhuận ròng', value: '125.000.000 ₫', trend: '+5%', sub: 'biên lợi nhuận ổn định', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: 'account_balance_wallet' },
  { label: 'Tổng tồn kho', value: '4,230', trend: '-2%', sub: 'nhập hàng mới ngay', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: 'inventory', unit: 'sản phẩm' },
  { label: 'Cảnh báo hết hàng', value: '15', trend: '+3 mới', sub: 'cần xử lý gấp', color: 'text-red-500', bg: 'bg-red-500/10', icon: 'warning', unit: 'SKU' },
];

const categories = [
  { name: 'Áo sơ mi', count: '1,240 sp', progress: 75, color: 'bg-primary' },
  { name: 'Quần Jeans', count: '850 sp', progress: 55, color: 'bg-purple-500' },
  { name: 'Đầm & Váy', count: '620 sp', progress: 40, color: 'bg-pink-500' },
  { name: 'Phụ kiện', count: '320 sp', progress: 25, color: 'bg-orange-500' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Tổng quan Tồn kho & Tài chính</h2>
          <p className="mt-1 text-base text-text-secondary dark:text-slate-400">Theo dõi hiệu quả kinh doanh và trạng thái hàng hóa</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-all">
            <span className="material-symbols-outlined text-[20px]">assignment_add</span>
            Kiểm kê kho
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-secondary dark:text-gray-400">{stat.label}</p>
              <span className={`material-symbols-outlined ${stat.color} ${stat.bg} p-1.5 rounded-lg text-[20px]`}>{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
              {stat.unit && <span className="text-sm text-text-secondary">{stat.unit}</span>}
            </div>
            <p className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-orange-500'} flex items-center gap-1`}>
              <span className="material-symbols-outlined text-[16px]">{stat.trend.startsWith('+') ? 'trending_up' : 'trending_down'}</span>
              {stat.trend} <span className="text-text-secondary font-normal">{stat.sub}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Biểu đồ Doanh thu & Lợi nhuận</h3>
            <div className="flex bg-background-light dark:bg-slate-800 rounded-lg p-1 gap-1">
              <button className="px-3 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-700 shadow-sm">Tháng</button>
              <button className="px-3 py-1 text-xs font-semibold rounded text-text-secondary">Quý</button>
              <button className="px-3 py-1 text-xs font-semibold rounded text-text-secondary">Năm</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(19, 182, 236, 0.05)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={index === data.length - 1 ? '#13b6ec' : '#13b6ec60'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Tồn kho theo danh mục</h3>
          <div className="flex-1 space-y-6">
            {categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                  <span className="text-text-secondary">{cat.count}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div className={`${cat.color} h-2 rounded-full transition-all`} style={{ width: `${cat.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <button className="text-sm font-bold text-primary hover:underline flex items-center justify-center gap-1 w-full">
              Xem chi tiết danh mục
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
