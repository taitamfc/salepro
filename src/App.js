import React from 'react';
import { Route, Routes } from 'react-router-dom';


// const Admin = React.lazy(() => import('./pages/admin/Index'))

import Admin from './pages/admin/Index';
import Product from './pages/products/Index';
import ProductCreate from './pages/products/Create';

import Category from './pages/categories/Index';
import CategoryCreate from './pages/categories/Create';

import Purchase from './pages/purchases/Index';
import PurchaseCreate from './pages/purchases/Create';

import Unit from './pages/unit/Index';
import UnitCreate from './pages/unit/Create';

import Warehouse from './pages/warehouse/Index';
import WarehouseCreate from './pages/warehouse/Create';

import Transfers from './pages/transfers/Index';
import TransferCreate from './pages/transfers/Create';

import Brand from './pages/brand/Index';
import BrandCreate from './pages/brand/Create';

import Supplier from './pages/supplier/Index';
import SupplierCreate from './pages/supplier/Create';

import Account from './pages/accounts/Index';
import AccountCreate from './pages/accounts/Create';

import Adjustment from './pages/adjustment/Index';
import AdjustmentCreate from './pages/adjustment/Create';

import Sale from './pages/sales/Index';
import SaleCreate from './pages/sales/Create';

import ReturnSale from './pages/return-sale/Index';
import ReturnSaleCreate from './pages/return-sale/Create';

import ReturnPurchase from './pages/return-purchase/Index';
import ReturnPurchaseCreate from './pages/return-purchase/Create';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/create/:id?" element={<ProductCreate />} />

        <Route path="/categories" element={<Category />} />
        <Route path="/categories/create/:id?" element={<CategoryCreate />} />

        <Route path="/purchases" element={<Purchase />} />
        <Route path="/purchases/create/:id?" element={<PurchaseCreate />} />

        <Route path="/transfers" element={<Transfers />} />
        <Route path="/transfers/create/:id?" element={<TransferCreate />} />
        
        <Route path="/unit" element={<Unit />} />
        <Route path="/unit/create/:id?" element={<UnitCreate />} />

        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/warehouse/create/:id?" element={<WarehouseCreate />} />

        <Route path="/brand" element={<Brand />} />
        <Route path="/brand/create/:id?" element={<BrandCreate />} />

        <Route path="/supplier" element={<Supplier />} />
        <Route path="/supplier/create/:id?" element={<SupplierCreate />} />

        <Route path="/accounts" element={<Account />} />
        <Route path="/accounts/create/:id?" element={<AccountCreate />} />

        <Route path="/adjustment" element={<Adjustment />} />
        <Route path="/adjustment/create/:id?" element={<AdjustmentCreate />} />

        <Route path="/sales" element={<Sale />} />
        <Route path="/sales/create/:id?" element={<SaleCreate />} />

        <Route path="/return-sale" element={<ReturnSale />} />
        <Route path="/return-sale/create/:id?" element={<ReturnSaleCreate />} />

        <Route path="/return-purchase" element={<ReturnPurchase />} />
        <Route path="/return-purchase/create/:id?" element={<ReturnPurchaseCreate />} />

      </Routes>
    </>
  );
}

export default App;
