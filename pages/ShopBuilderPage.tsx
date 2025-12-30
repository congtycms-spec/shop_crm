
import React from 'react';

const themes = [
  { name: 'Minimalist Chic', desc: 'Clean lines for modern brands', active: true, img: 'https://picsum.photos/600/400?random=31' },
  { name: 'Urban Streetwear', desc: 'Bold typography & dark modes', active: false, img: 'https://picsum.photos/600/400?random=32' },
  { name: 'Elegant Boutique', desc: 'Sophisticated layout for luxury', active: false, img: 'https://picsum.photos/600/400?random=33' },
];

const ShopBuilderPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark shrink-0">
        <div className="flex bg-background-light dark:bg-slate-800 rounded-lg p-1 gap-1">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-white dark:bg-slate-700 shadow-sm text-xs font-bold transition-all">
            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
            <span>Desktop</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-text-secondary text-xs font-bold transition-all">
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
            <span>Mobile</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-slate-900 dark:text-white text-xs font-bold flex items-center gap-1.5 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            View Live Site
          </button>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold">Save Draft</button>
            <button className="h-9 px-4 rounded-lg bg-primary text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              Publish
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12 max-w-[1200px] mx-auto w-full">
        <div>
          <h1 className="text-3xl font-black mb-2">Design Your Storefront</h1>
          <p className="text-text-secondary text-base">Select a theme and customize the look to match your fashion brand identity.</p>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">view_quilt</span>
              Available Themes
            </h2>
            <button className="text-primary text-sm font-bold hover:underline">View all themes</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((th, i) => (
              <div key={i} className={`group relative rounded-xl overflow-hidden bg-surface-light dark:bg-surface-dark shadow-sm border-2 transition-all hover:shadow-lg ${th.active ? 'border-primary' : 'border-transparent dark:border-slate-800'}`}>
                {th.active && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider">Active</span>
                  </div>
                )}
                <div className="aspect-[4/3] bg-cover bg-top bg-slate-100" style={{ backgroundImage: `url("${th.img}")` }}></div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{th.name}</h3>
                    <p className="text-xs text-text-secondary">{th.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    {th.active ? (
                      <button className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-black rounded-lg transition-colors">Customize</button>
                    ) : (
                      <>
                        <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-xs font-black rounded-lg transition-colors">Preview</button>
                        <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary text-text-secondary hover:text-primary text-xs font-black rounded-lg transition-colors">Select</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase mb-1 tracking-wider">Shop Name</label>
                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-sm focus:ring-primary" defaultValue="Luxe Apparel" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase mb-1 tracking-wider">Tagline / Slogan</label>
                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-sm focus:ring-primary" defaultValue="Redefining Modern Elegance" />
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-dashed border-slate-400">
                  <span className="material-symbols-outlined text-slate-400">image</span>
                </div>
                <button className="text-primary text-xs font-bold hover:underline">Upload Brand Logo</button>
              </div>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings</span>
              Store Operations
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-3">Payment Methods</p>
                <div className="grid grid-cols-2 gap-3">
                  {['COD (Cash)', 'Bank Transfer', 'MoMo Wallet', 'Credit Card'].map((m, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 border border-slate-100 dark:border-slate-800 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" defaultChecked={i < 2} className="rounded text-primary focus:ring-primary" />
                      <span className="text-xs font-bold">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-3">Shipping Partners</p>
                <div className="space-y-2">
                  {[
                    { name: 'Giao Hang Nhanh', tag: 'GHN', color: 'bg-orange-100 text-orange-600', active: true },
                    { name: 'Giao Hang Tiet Kiem', tag: 'GHTK', color: 'bg-green-100 text-green-600', active: false }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded font-black text-[9px] flex items-center justify-center ${p.color}`}>{p.tag}</div>
                        <span className="text-xs font-bold">{p.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={p.active} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopBuilderPage;
