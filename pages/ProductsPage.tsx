
import React, { useState, useMemo, useRef } from 'react';
import { Product } from '../types';

const INITIAL_DATA: Product[] = [
  {
    id: '1',
    name: 'Áo Thun Basic Premium',
    sku: 'AT-001-W',
    category: 'Áo nam',
    attributes: { color: 'Trắng', colorHex: '#ffffff', sizes: ['M', 'L', 'XL'] },
    material: 'Cotton 100%',
    inventory: 124,
    price: 250000,
    image: 'https://picsum.photos/400/400?random=11',
    tags: ['new arrival', 'summer collection']
  },
  {
    id: '2',
    name: 'Quần Jeans Slim Fit',
    sku: 'QJ-SL-02',
    category: 'Quần nam',
    attributes: { color: 'Xanh Đậm', colorHex: '#2563eb', sizes: ['29', '30', '31', '32'] },
    material: 'Denim',
    inventory: 8,
    price: 550000,
    image: 'https://picsum.photos/400/400?random=12',
    tags: ['best seller']
  },
  {
    id: '3',
    name: 'Váy Hoa Nhí Mùa Hè',
    sku: 'VD-HN-05',
    category: 'Váy đầm',
    attributes: { color: 'Đỏ', colorHex: '#ef4444', sizes: ['S', 'M'] },
    material: 'Lụa Tơ Tằm',
    inventory: 3,
    price: 400000,
    image: 'https://picsum.photos/400/400?random=13',
    tags: ['summer collection']
  },
  {
    id: '4',
    name: 'Áo Khoác Bomber',
    sku: 'AK-BB-99',
    category: 'Áo khoác',
    attributes: { color: 'Đen', colorHex: '#000000', sizes: ['L', 'XL'] },
    material: 'Polyester',
    inventory: 45,
    price: 850000,
    image: 'https://picsum.photos/400/400?random=14',
    tags: ['trending']
  },
  {
    id: '5',
    name: 'Chân Váy Chữ A',
    sku: 'CV-A-10',
    category: 'Váy đầm',
    attributes: { color: 'Đen', colorHex: '#000000', sizes: ['M', 'L'] },
    material: 'Kaki',
    inventory: 0,
    price: 320000,
    image: 'https://picsum.photos/400/400?random=15',
    tags: ['clearance']
  }
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedColor, setSelectedColor] = useState('Tất cả');
  const [selectedTag, setSelectedTag] = useState('Tất cả');
  const [stockStatus, setStockStatus] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('default');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals States
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Bulk Edit Fields
  const [bulkCategory, setBulkCategory] = useState({ enabled: false, value: '' });
  const [bulkPrice, setBulkPrice] = useState({ enabled: false, value: 0 });
  const [bulkInventory, setBulkInventory] = useState({ enabled: false, value: 0 });
  const [bulkTags, setBulkTags] = useState({ enabled: false, value: '', mode: 'add' as 'add' | 'replace' });

  // Options for filters
  const categoryOptions = useMemo(() => 
    ['Tất cả', ...Array.from(new Set(products.map(p => p.category)))], [products]
  );
  
  const colorOptions = useMemo(() => 
    ['Tất cả', ...Array.from(new Set(products.map(p => p.attributes.color)))], [products]
  );

  const tagOptions = useMemo(() => {
    const allTags = products.flatMap(p => p.tags || []);
    return ['Tất cả', ...Array.from(new Set(allTags))];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
      const matchesColor = selectedColor === 'Tất cả' || product.attributes.color === selectedColor;
      const matchesTag = selectedTag === 'Tất cả' || (product.tags || []).includes(selectedTag);
      
      let matchesStock = true;
      if (stockStatus === 'Còn hàng') matchesStock = product.inventory >= lowStockThreshold;
      else if (stockStatus === 'Sắp hết') matchesStock = product.inventory > 0 && product.inventory < lowStockThreshold;
      else if (stockStatus === 'Hết hàng') matchesStock = product.inventory === 0;

      return matchesSearch && matchesCategory && matchesColor && matchesStock && matchesTag;
    });

    if (sortBy === 'inventory-asc') result.sort((a, b) => a.inventory - b.inventory);
    else if (sortBy === 'inventory-desc') result.sort((a, b) => b.inventory - a.inventory);
    else if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, searchTerm, selectedCategory, selectedColor, stockStatus, sortBy, lowStockThreshold, selectedTag]);

  const isAllSelected = filteredAndSortedProducts.length > 0 && selectedIds.length === filteredAndSortedProducts.length;

  const toggleSelectAll = () => {
    if (isAllSelected) setSelectedIds([]);
    else setSelectedIds(filteredAndSortedProducts.map(p => p.id));
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedColor('Tất cả');
    setSelectedTag('Tất cả');
    setStockStatus('Tất cả');
    setSortBy('default');
    setSelectedIds([]);
  };

  const isFilterActive = searchTerm !== '' || selectedCategory !== 'Tất cả' || selectedColor !== 'Tất cả' || selectedTag !== 'Tất cả' || stockStatus !== 'Tất cả' || sortBy !== 'default';

  const applyBulkEdit = () => {
    setProducts(prev => prev.map(p => {
      if (!selectedIds.includes(p.id)) return p;
      const updatedProduct = { ...p };
      if (bulkCategory.enabled) updatedProduct.category = bulkCategory.value;
      if (bulkPrice.enabled) updatedProduct.price = bulkPrice.value;
      if (bulkInventory.enabled) updatedProduct.inventory = bulkInventory.value;
      if (bulkTags.enabled) {
        const newTags = bulkTags.value.split(',').map(t => t.trim().toLowerCase()).filter(t => t !== '');
        if (bulkTags.mode === 'replace') updatedProduct.tags = newTags;
        else updatedProduct.tags = Array.from(new Set([...(updatedProduct.tags || []), ...newTags]));
      }
      return updatedProduct;
    }));
    setIsBulkEditOpen(false);
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Tên sản phẩm', 'SKU', 'Danh mục', 'Tồn kho', 'Giá bán', 'Chất liệu', 'Tags'];
    const rows = filteredAndSortedProducts.map(p => [p.id, p.name, p.sku, p.category, p.inventory, p.price, p.material, (p.tags || []).join(";")]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `products_export_${new Date().getTime()}.csv`;
    link.click();
  };

  return (
    <div className="min-h-full flex flex-col relative pb-20 lg:pb-8">
      {/* Header Section */}
      <div className="p-4 lg:p-8 lg:pb-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Quản lý Sản phẩm</h2>
            <p className="text-text-secondary text-xs lg:text-sm mt-1">Danh sách, kho hàng và thuộc tính sản phẩm</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <input type="file" ref={fileInputRef} onChange={() => {}} accept=".csv" className="hidden" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">file_upload</span>
              Nhập CSV
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              Xuất CSV
            </button>
            <button className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Mobile Search & Filter Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-2xl text-sm placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className={`p-2.5 rounded-2xl border transition-all ${isFilterActive ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600'}`}
          >
            <span className="material-symbols-outlined text-[24px]">filter_alt</span>
          </button>
        </div>

        {/* Desktop Filter Panel */}
        <div className="hidden lg:block bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border-none bg-background-light dark:bg-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                placeholder="Tìm theo tên, mã SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-xs font-bold border border-slate-100 dark:border-slate-700">
                <span className="text-text-secondary">Ngưỡng báo động:</span>
                <input type="number" className="w-10 h-6 p-0 text-center border-none bg-transparent focus:ring-0 text-xs font-black" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(Number(e.target.value))} />
              </div>
              {isFilterActive && (
                <button onClick={resetFilters} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-xs font-bold px-2 py-2">
                  <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
                  Xóa lọc
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {/* Desktop Filters Dropdowns */}
            {[
              { label: 'Danh mục', val: selectedCategory, set: setSelectedCategory, opt: categoryOptions },
              { label: 'Màu sắc', val: selectedColor, set: setSelectedColor, opt: colorOptions },
              { label: 'Nhãn', val: selectedTag, set: setSelectedTag, opt: tagOptions },
              { label: 'Kho hàng', val: stockStatus, set: setStockStatus, opt: ['Tất cả', 'Còn hàng', 'Sắp hết', 'Hết hàng'] },
              { label: 'Sắp xếp', val: sortBy, set: setSortBy, opt: ['default', 'inventory-asc', 'inventory-desc', 'price-asc', 'price-desc'] }
            ].map((f, i) => (
              <div key={i} className="space-y-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">{f.label}</label>
                <select 
                  value={f.val} 
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium py-2 px-3 focus:ring-2 focus:ring-primary"
                >
                  {f.opt.map(o => <option key={o} value={o}>{o === 'default' ? 'Mặc định' : o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main List Area */}
      <div className="flex-1 px-4 lg:px-8 space-y-4">
        {/* Bulk Tooltip Mobile */}
        {selectedIds.length > 0 && (
          <div className="sticky top-2 z-30 bg-primary h-14 rounded-2xl flex items-center px-4 justify-between shadow-xl animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3 text-white">
              <button onClick={() => setSelectedIds([])} className="hover:bg-white/10 p-1 rounded-full"><span className="material-symbols-outlined">close</span></button>
              <p className="text-sm font-bold">Đã chọn {selectedIds.length}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsBulkEditOpen(true)} className="p-2 bg-white/20 rounded-xl text-white"><span className="material-symbols-outlined">edit</span></button>
              <button onClick={() => {}} className="p-2 bg-red-500 rounded-xl text-white shadow-inner"><span className="material-symbols-outlined">delete</span></button>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded text-primary focus:ring-primary" /></th>
                <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Sản phẩm</th>
                <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Danh mục</th>
                <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Phân loại</th>
                <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Tồn kho</th>
                <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Giá bán</th>
                <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredAndSortedProducts.map(product => (
                <tr key={product.id} className={`group transition-colors ${selectedIds.includes(product.id) ? 'bg-primary/5' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}>
                  <td className="p-4"><input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => toggleSelectRow(product.id)} className="rounded text-primary focus:ring-primary" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 bg-cover bg-center border border-slate-100 shrink-0" style={{ backgroundImage: `url("${product.image}")` }}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white cursor-pointer hover:text-primary transition-colors" onClick={() => setQuickViewProduct(product)}>{product.name}</p>
                        <p className="text-[10px] text-text-secondary font-medium">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-bold uppercase">{product.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-medium">
                        <span className="size-2 rounded-full" style={{ backgroundColor: product.attributes.colorHex }}></span>
                        <span>{product.attributes.color}</span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-500">{product.attributes.sizes.join(', ')}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.tags?.map(t => <span key={t} className="px-1 text-[9px] font-bold uppercase text-primary/70">#{t}</span>)}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`size-1.5 rounded-full ${product.inventory === 0 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : product.inventory < lowStockThreshold ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <span className={`text-sm font-black ${product.inventory === 0 ? 'text-red-500' : product.inventory < lowStockThreshold ? 'text-orange-600' : 'text-slate-900 dark:text-white'}`}>{product.inventory}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-black text-sm">{product.price.toLocaleString('vi-VN')}đ</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setQuickViewProduct(product)} className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                      <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {filteredAndSortedProducts.map(product => (
            <div 
              key={product.id} 
              className={`bg-surface-light dark:bg-surface-dark p-4 rounded-3xl shadow-sm border transition-all active:scale-[0.98] ${selectedIds.includes(product.id) ? 'border-primary ring-1 ring-primary/20' : 'border-slate-100 dark:border-slate-800'}`}
              onClick={() => toggleSelectRow(product.id)}
            >
              <div className="flex gap-4">
                <div 
                  className="size-20 rounded-2xl bg-slate-100 bg-cover bg-center shrink-0 border border-slate-50 dark:border-slate-700" 
                  style={{ backgroundImage: `url("${product.image}")` }}
                  onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
                ></div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</p>
                      {selectedIds.includes(product.id) && <span className="material-symbols-outlined text-primary text-[20px] fill">check_circle</span>}
                    </div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{product.name}</h3>
                    <p className="text-[10px] text-text-secondary">SKU: {product.sku}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-base font-black text-primary">{product.price.toLocaleString('vi-VN')}đ</p>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                      <div className={`size-1.5 rounded-full ${product.inventory === 0 ? 'bg-red-500' : product.inventory < lowStockThreshold ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                      <span className="text-xs font-black">{product.inventory}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredAndSortedProducts.length === 0 && (
            <div className="py-20 text-center space-y-3 opacity-40">
              <span className="material-symbols-outlined text-6xl">inventory_2</span>
              <p className="text-sm font-bold">Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <button className="lg:hidden fixed bottom-6 right-6 size-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center z-40 active:scale-90 transition-all">
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden flex flex-col">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowFilters(false)}></div>
          <div className="relative mt-auto bg-surface-light dark:bg-surface-dark rounded-t-[32px] p-6 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Bộ lọc tìm kiếm</h3>
              <button onClick={() => setShowFilters(false)} className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            
            <div className="space-y-5">
              {[
                { label: 'Danh mục', val: selectedCategory, set: setSelectedCategory, opt: categoryOptions },
                { label: 'Màu sắc', val: selectedColor, set: setSelectedColor, opt: colorOptions },
                { label: 'Nhãn sản phẩm', val: selectedTag, set: setSelectedTag, opt: tagOptions },
                { label: 'Tình trạng tồn kho', val: stockStatus, set: setStockStatus, opt: ['Tất cả', 'Còn hàng', 'Sắp hết', 'Hết hàng'] },
                { label: 'Sắp xếp theo', val: sortBy, set: setSortBy, opt: ['default', 'inventory-asc', 'inventory-desc', 'price-asc', 'price-desc'] }
              ].map((f, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">{f.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.opt.map(o => (
                      <button 
                        key={o} 
                        onClick={() => f.set(o)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${f.val === o ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600'}`}
                      >
                        {o === 'default' ? 'Mặc định' : o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex gap-3">
              <button onClick={resetFilters} className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-600">Đặt lại</button>
              <button onClick={() => setShowFilters(false)} className="flex-[2] py-4 rounded-2xl bg-primary text-white text-sm font-black shadow-lg shadow-primary/20">Áp dụng</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal - Responsive */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 lg:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setQuickViewProduct(null)}></div>
          <div className="relative bg-surface-light dark:bg-surface-dark w-full h-full lg:h-auto lg:max-w-4xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 lg:slide-in-from-bottom-4 duration-300">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 z-[80] size-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-600 shadow-xl lg:hidden flex items-center justify-center"><span className="material-symbols-outlined">close</span></button>
            <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto bg-slate-100 dark:bg-slate-800 shrink-0">
              <img src={quickViewProduct.image} className="w-full h-full object-cover" alt={quickViewProduct.name} />
            </div>
            <div className="flex-1 p-6 lg:p-10 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{quickViewProduct.category}</span>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">{quickViewProduct.name}</h2>
                <p className="text-xs text-text-secondary font-medium">Mã SKU: {quickViewProduct.sku}</p>
              </div>

              <div className="flex items-center gap-4 py-6 border-y border-slate-100 dark:border-slate-800">
                <span className="text-3xl font-black text-primary">{quickViewProduct.price.toLocaleString('vi-VN')}đ</span>
                <span className="text-sm text-text-secondary line-through">{(quickViewProduct.price * 1.2).toLocaleString('vi-VN')}đ</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Tồn kho</p>
                  <p className={`text-lg font-black ${quickViewProduct.inventory < lowStockThreshold ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>{quickViewProduct.inventory} sp</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Phân loại màu</p>
                  <div className="flex items-center gap-2">
                    <span className="size-4 rounded-full border border-slate-200" style={{ backgroundColor: quickViewProduct.attributes.colorHex }}></span>
                    <span className="text-sm font-bold">{quickViewProduct.attributes.color}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Hành động nhanh</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-12 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">Chỉnh sửa</button>
                  <button className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm">Sao chép</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
