
import React, { useState } from 'react';
import { Page } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import PromotionsPage from './pages/PromotionsPage';
import SalesChannelsPage from './pages/SalesChannelsPage';
import ShopBuilderPage from './pages/ShopBuilderPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <DashboardPage />;
      case Page.PRODUCTS: return <ProductsPage />;
      case Page.CUSTOMERS: return <CustomersPage />;
      case Page.PROMOTIONS: return <PromotionsPage />;
      case Page.SALES_CHANNELS: return <SalesChannelsPage />;
      case Page.BUILDER: return <ShopBuilderPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar - desktop */}
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
