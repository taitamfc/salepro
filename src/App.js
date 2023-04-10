import React from 'react';
import { Route, Routes } from 'react-router-dom';


// const Admin = React.lazy(() => import('./pages/admin/Index'))

import Admin from './pages/admin/Index';
import Product from './pages/products/Index';
import ProductCreate from './pages/products/Create';

import Category from './pages/categories/Index';
import CategoryCreate from './pages/categories/Create';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/create/:id?" element={<ProductCreate />} />

        <Route path="/categories" element={<Category />} />
        <Route path="/categories/create/:id?" element={<CategoryCreate />} />

      </Routes>
    </>
  );
}

export default App;
