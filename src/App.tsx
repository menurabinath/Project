import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductPage } from './pages/ProductPage';
import { AdminPage } from './pages/AdminPage';

type AppState = 
  | { page: 'home' }
  | { page: 'search'; query: string }
  | { page: 'product'; productId: string }
  | { page: 'admin' };

function App() {
  const [appState, setAppState] = useState<AppState>({ page: 'home' });

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      
      if (path === '/admin') {
        setAppState({ page: 'admin' });
      } else if (path === '/search') {
        const query = params.get('q') || '';
        setAppState({ page: 'search', query });
      } else if (path.startsWith('/product/')) {
        const productId = path.split('/product/')[1];
        setAppState({ page: 'product', productId });
      } else {
        setAppState({ page: 'home' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Handle initial load

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToSearch = (query: string) => {
    const url = `/search?q=${encodeURIComponent(query)}`;
    window.history.pushState(null, '', url);
    setAppState({ page: 'search', query });
  };

  const navigateToProduct = (productId: string) => {
    const url = `/product/${productId}`;
    window.history.pushState(null, '', url);
    setAppState({ page: 'product', productId });
  };

  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setAppState({ page: 'home' });
  };

  const navigateToAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setAppState({ page: 'admin' });
  };

  const renderContent = () => {
    switch (appState.page) {
      case 'home':
        return (
          <HomePage
            onSearch={navigateToSearch}
            onProductClick={navigateToProduct}
          />
        );
      
      case 'search':
        return (
          <SearchPage
            query={appState.query}
            onSearch={navigateToSearch}
            onProductClick={navigateToProduct}
          />
        );
      
      case 'product':
        return (
          <ProductPage
            productId={appState.productId}
            onBack={() => window.history.back()}
          />
        );
      
      case 'admin':
        return <AdminPage />;
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}

export default App;