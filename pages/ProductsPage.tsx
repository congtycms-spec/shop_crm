
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals States
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Bulk Edit Fields
  const [bulkCategory, setBulkCategory] = useState({ enabled: false, value: '' });
  const [bulkPrice, setBulkPrice] = useState({ enabled: false, value: 0 });
  const [bulkInventory, setBulkInventory] = useState({ enabled: false, value: 0 });
  const [bulkTags, setBulkTags] = useState({ enabled: false, value: '', mode: 'add' as 'add' | 'replace' });

  // Calculate items below threshold
  const lowStockItems = useMemo(() => 
    products.filter(p => p.inventory < lowStockThreshold && p.inventory > 0), 
    [products, lowStockThreshold]
  );

  const outOfStockItems = useMemo(() => 
    products.filter(p => p.inventory === 0), 
    [products]
  );

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
        if (bulkTags.mode === 'replace') {
          updatedProduct.tags = newTags;
        } else {
          updatedProduct.tags = Array.from(new Set([...(updatedProduct.tags || []), ...newTags]));
        }
      }
      return updatedProduct;
    }));
    setIsBulkEditOpen(false);
    setSelectedIds([]);
    setBulkCategory({ enabled: false, value: '' });
    setBulkPrice({ enabled: false, value: 0 });
    setBulkInventory({ enabled: false, value: 0 });
    setBulkTags({ enabled: false, value: '', mode: 'add' });
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Tên sản phẩm', 'SKU', 'Danh mục', 'Tồn kho', 'Giá bán', 'Chất liệu', 'Tags'];
    const rows = filteredAndSortedProducts.map(p => [
      p.id,
      p.name,
      p.sku,
      p.category,
      p.inventory,
      p.price,
      p.material,
      (p.tags || []).join(";")
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `danh_sach_san_pham_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/);
      if (lines.length < 2) return;

      const newItems: Product[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const columns = line.split(',');
        if (columns.length < 6) continue;

        newItems.push({
          id: `IMPORTED-${Date.now()}-${i}`,
          name: columns[1] || 'Sản phẩm mới',
          sku: columns[2] || `SKU-${Date.now()}-${i}`,
          category: columns[3] || 'Chưa phân loại',
          inventory: parseInt(columns[4]) || 0,
          price: parseInt(columns[5]) || 0,
          material: columns[6] || 'N/A',
          tags: columns[7] ? columns[7].split(';').map(t => t.trim()) : [],
          attributes: { color: 'N/A', colorHex: '#cccccc', sizes: ['Free'] },
          image: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 100)}`
        });
      }

      if (newItems.length > 0) {
        setProducts(prev => [...prev, ...newItems]);
        alert(`Đã nhập thành công ${newItems.length} sản phẩm mới!`);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto relative min-h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Quản lý Sản phẩm</h2>
          <p className="text-text-secondary text-sm mt-1">Quản lý danh sách, kho hàng và thuộc tính sản phẩm</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportCSV} 
            accept=".csv" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">file_upload</span>
            Nhập CSV
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Xuất CSV
          </button>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Inventory Alert Banners */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          {outOfStockItems.length > 0 && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                  <span className="material-symbols-outlined fill">error</span>
                </div>
                <div>
                  <p className="text-sm font-black text-red-700 dark:text-red-400">Cảnh báo: {outOfStockItems.length} sản phẩm hết hàng</p>
                  <p className="text-xs text-red-600 dark:text-red-500/80">Cần nhập thêm hàng ngay để không gián đoạn kinh doanh.</p>
                </div>
              </div>
              <button 
                onClick={() => setStockStatus('Hết hàng')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
              >
                Xem chi tiết
              </button>
            </div>
          )}
          {lowStockItems.length > 0 && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <span className="material-symbols-outlined fill">priority_high</span>
                </div>
                <div>
                  <p className="text-sm font-black text-orange-700 dark:text-orange-400">Thông báo: {lowStockItems.length} sản phẩm sắp hết hàng</p>
                  <p className="text-xs text-orange-600 dark:text-orange-500/80">Số lượng tồn kho hiện tại thấp hơn ngưỡng báo động ({lowStockThreshold}).</p>
                </div>
              </div>
              <button 
                onClick={() => setStockStatus('Sắp hết')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors shadow-sm"
              >
                Kiểm tra ngay
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border-none bg-background-light dark:bg-slate-800 rounded-lg text-sm text-text-main dark:text-white placeholder-text-secondary focus:ring-2 focus:ring-primary"
              placeholder="Tìm theo tên, mã SKU..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none flex items-center gap-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-lg text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-orange-500 text-[18px]">settings_input_component</span>
              <span className="text-text-secondary hidden sm:inline">Ngưỡng báo động:</span>
              <input 
                type="number" 
                className="w-12 h-6 p-0 text-center border-none bg-slate-100 dark:bg-slate-800 rounded focus:ring-1 focus:ring-primary text-xs font-bold"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(Number(e.target.value))}
              />
            </div>
            {isFilterActive && (
              <button 
                onClick={resetFilters}
                className="flex items-center gap-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider px-1">Danh mục</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 px-3 focus:ring-2 focus:ring-primary"
            >
              {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider px-1">Màu sắc</label>
            <select 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 px-3 focus:ring-2 focus:ring-primary"
            >
              {colorOptions.map(color => <option key={color} value={color}>{color}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider px-1">Nhãn (Tags)</label>
            <select 
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 px-3 focus:ring-2 focus:ring-primary"
            >
              {tagOptions.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider px-1">Tình trạng kho</label>
            <select 
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 px-3 focus:ring-2 focus:ring-primary"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Còn hàng">Còn hàng (≥ {lowStockThreshold})</option>
              <option value="Sắp hết">Sắp hết (&lt; {lowStockThreshold})</option>
              <option value="Hết hàng">Hết hàng (0)</option>
            </select>
          </div>
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider px-1">Sắp xếp theo</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 px-3 focus:ring-2 focus:ring-primary"
            >
              <option value="default">Mặc định</option>
              <option value="inventory-asc">Tồn kho: Thấp nhất trước</option>
              <option value="inventory-desc">Tồn kho: Cao nhất trước</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Bulk Actions Toolbar */}
        {selectedIds.length > 0 && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-primary h-14 flex items-center px-4 md:px-6 justify-between animate-in slide-in-from-top duration-200 shadow-lg">
            <div className="flex items-center gap-4 text-white">
              <button onClick={() => setSelectedIds([])} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <p className="text-sm font-bold">Đã chọn {selectedIds.length} sản phẩm</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsBulkEditOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
                <span className="hidden sm:inline">Chỉnh sửa</span>
              </button>
              <button 
                onClick={() => { if(confirm('Xóa các mục đã chọn?')) setProducts(p => p.filter(x => !selectedIds.includes(x.id))); setSelectedIds([]); }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
                <span className="hidden sm:inline">Xóa</span>
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background-light dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 w-12 text-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" checked={isAllSelected} onChange={toggleSelectAll} />
                </th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Sản phẩm</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Danh mục</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Thuộc tính / Nhãn</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Chất liệu</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Tồn kho</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase text-right">Giá bán</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map(product => {
                  const isSelected = selectedIds.includes(product.id);
                  const isLow = product.inventory > 0 && product.inventory < lowStockThreshold;
                  const isOut = product.inventory === 0;

                  return (
                    <tr key={product.id} className={`group transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}>
                      <td className="p-4 text-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" checked={isSelected} onChange={() => toggleSelectRow(product.id)} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-slate-100 bg-cover bg-center border border-slate-200 shrink-0" style={{ backgroundImage: `url("${product.image}")` }}></div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer" onClick={() => setQuickViewProduct(product)}>{product.name}</p>
                            <p className="text-xs text-text-secondary">SKU: {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: product.attributes.colorHex }}></span>
                            <span>{product.attributes.color}</span>
                            <div className="flex gap-1 ml-2">
                              {product.attributes.sizes.map(size => (
                                <span key={size} className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-text-secondary border border-slate-200 dark:border-slate-700">{size}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {product.tags?.map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 rounded-md bg-primary/5 text-primary text-[9px] font-black uppercase tracking-wider border border-primary/10">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-text-main dark:text-slate-300">{product.material}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isOut ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : isLow ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                          <span className={`text-sm font-bold ${isOut ? 'text-red-500' : isLow ? 'text-orange-600' : ''}`}>{product.inventory}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-sm font-bold">{product.price.toLocaleString('vi-VN')} ₫</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setQuickViewProduct(product)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50/50 transition-colors" title="Xem nhanh">
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Chỉnh sửa">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-4xl opacity-20">search_off</span>
                      <p>Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
                      <button onClick={resetFilters} className="text-primary font-bold hover:underline text-sm">Xóa tất cả bộ lọc</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setQuickViewProduct(null)}></div>
          <div className="relative bg-surface-light dark:bg-surface-dark w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex flex-col md:flex-row max-h-[90vh]">
              <div className="w-full md:w-1/2 aspect-square bg-slate-100 dark:bg-slate-800">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-8 space-y-6 overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{quickViewProduct.category}</span>
                    <span className="text-xs font-bold text-text-secondary uppercase">{quickViewProduct.sku}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{quickViewProduct.name}</h2>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {quickViewProduct.tags?.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-end gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-3xl font-black text-primary">{quickViewProduct.price.toLocaleString('vi-VN')} ₫</span>
                  <span className="text-sm text-text-secondary line-through mb-1">{(quickViewProduct.price * 1.2).toLocaleString('vi-VN')} ₫</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase text-text-secondary tracking-wider">Trạng thái kho</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      quickViewProduct.inventory === 0 ? 'bg-red-50 text-red-600' : 
                      quickViewProduct.inventory < lowStockThreshold ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'
                    }`}>
                      <span className="material-symbols-outlined text-[16px] fill">
                        {quickViewProduct.inventory === 0 ? 'error' : quickViewProduct.inventory < lowStockThreshold ? 'priority_high' : 'check_circle'}
                      </span>
                      {quickViewProduct.inventory === 0 ? 'Hết hàng' : quickViewProduct.inventory < lowStockThreshold ? `Sắp hết (${quickViewProduct.inventory})` : `Sẵn có (${quickViewProduct.inventory})`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-text-secondary mb-1">Màu sắc</p>
                      <div className="flex items-center gap-2">
                        <div className="size-5 rounded-full border border-slate-200" style={{ backgroundColor: quickViewProduct.attributes.colorHex }}></div>
                        <span className="text-sm font-medium">{quickViewProduct.attributes.color}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-text-secondary mb-1">Chất liệu</p>
                      <span className="text-sm font-medium">{quickViewProduct.material}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-text-secondary mb-2 tracking-widest">Kích thước hỗ trợ</p>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.attributes.sizes.map(size => (
                        <span key={size} className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold bg-slate-50 dark:bg-slate-800">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button className="flex-1 bg-primary text-white h-12 rounded-xl font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Chỉnh sửa chi tiết
                  </button>
                  <button className="size-12 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Edit Modal */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsBulkEditOpen(false)}></div>
          <div className="relative bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Chỉnh sửa nhanh</h3>
                <p className="text-xs text-text-secondary">Đang áp dụng cho {selectedIds.length} sản phẩm</p>
              </div>
              <button onClick={() => setIsBulkEditOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" checked={bulkCategory.enabled} onChange={(e) => setBulkCategory(prev => ({ ...prev, enabled: e.target.checked }))} />
                  <span className={`text-sm font-bold ${bulkCategory.enabled ? 'text-primary' : 'text-text-secondary group-hover:text-slate-700'}`}>Cập nhật danh mục</span>
                </label>
                {bulkCategory.enabled && (
                  <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm py-2.5 focus:ring-primary animate-in slide-in-from-top-2" value={bulkCategory.value} onChange={(e) => setBulkCategory(prev => ({ ...prev, value: e.target.value }))}>
                    <option value="">Chọn danh mục...</option>
                    {categoryOptions.filter(c => c !== 'Tất cả').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" checked={bulkPrice.enabled} onChange={(e) => setBulkPrice(prev => ({ ...prev, enabled: e.target.checked }))} />
                  <span className={`text-sm font-bold ${bulkPrice.enabled ? 'text-primary' : 'text-text-secondary group-hover:text-slate-700'}`}>Cập nhật giá bán</span>
                </label>
                {bulkPrice.enabled && (
                  <div className="relative animate-in slide-in-from-top-2">
                    <input type="number" className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm py-2.5 pr-8 focus:ring-primary" placeholder="0" value={bulkPrice.value} onChange={(e) => setBulkPrice(prev => ({ ...prev, value: Number(e.target.value) }))} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-secondary">₫</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" checked={bulkInventory.enabled} onChange={(e) => setBulkInventory(prev => ({ ...prev, enabled: e.target.checked }))} />
                  <span className={`text-sm font-bold ${bulkInventory.enabled ? 'text-primary' : 'text-text-secondary group-hover:text-slate-700'}`}>Cập nhật tồn kho</span>
                </label>
                {bulkInventory.enabled && (
                  <input type="number" className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm py-2.5 focus:ring-primary animate-in slide-in-from-top-2" placeholder="0" value={bulkInventory.value} onChange={(e) => setBulkInventory(prev => ({ ...prev, value: Number(e.target.value) }))} />
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" checked={bulkTags.enabled} onChange={(e) => setBulkTags(prev => ({ ...prev, enabled: e.target.checked }))} />
                  <span className={`text-sm font-bold ${bulkTags.enabled ? 'text-primary' : 'text-text-secondary group-hover:text-slate-700'}`}>Quản lý Nhãn (Tags)</span>
                </label>
                {bulkTags.enabled && (
                  <div className="space-y-3 animate-in slide-in-from-top-2">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-1">
                      <button 
                        onClick={() => setBulkTags(prev => ({ ...prev, mode: 'add' }))}
                        className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${bulkTags.mode === 'add' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-text-secondary'}`}
                      >
                        Thêm mới
                      </button>
                      <button 
                        onClick={() => setBulkTags(prev => ({ ...prev, mode: 'replace' }))}
                        className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${bulkTags.mode === 'replace' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-text-secondary'}`}
                      >
                        Thay thế tất cả
                      </button>
                    </div>
                    <input 
                      type="text" 
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm py-2.5 focus:ring-primary" 
                      placeholder="nhập tags, cách nhau bởi dấu phẩy" 
                      value={bulkTags.value} 
                      onChange={(e) => setBulkTags(prev => ({ ...prev, value: e.target.value }))} 
                    />
                    <p className="text-[10px] text-text-secondary px-1">Ví dụ: summer, hot sale, new</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex gap-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setIsBulkEditOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors">Hủy bỏ</button>
              <button onClick={applyBulkEdit} disabled={!bulkCategory.enabled && !bulkPrice.enabled && !bulkInventory.enabled && !bulkTags.enabled} className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:shadow-none">Áp dụng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
