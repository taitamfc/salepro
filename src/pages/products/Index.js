import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import MyTable from '../../components/global/MyTable';
import lang from '../../lang/vi';
import MyPagination from '../../components/global/MyPagination';

import ProductModel from '../../models/ProductModel';
import WarehouseModel from '../../models/WarehouseModel';
import CategoryModel from '../../models/CategoryModel';
import BrandModel from '../../models/BrandModel';
import UnitModel from '../../models/UnitModel';


function Index(props) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('index');
    const [filter,setFilter] = useState({ is_active: 1 });
    const [pageData, setPageData] = useState({});

    const [warehouses, setWarehouses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBranches] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        WarehouseModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setWarehouses(res.data);
        }).catch(err => { alert(err.message); });
        CategoryModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setCategories(res.data);
        }).catch(err => { alert(err.message); });
        BrandModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setBranches(res.data);
        }).catch(err => { alert(err.message); });
        UnitModel.all( { onlyActive: true, limit: -1 }).then( res => {
            setUnits(res.data);
        }).catch( err => { alert(err.message); });

    }, []);
    useEffect(() => {
        ProductModel.all({
            page: page,
            filter: filter
        }).then(res => {
            setLoading(false);
            setItems(res.data);
            setPageData(res.meta);
        })
    }, [page, filter, loading]);

    const handleDelete = (id, title = '') => {
        title = title ? title : id;
        let check = window.confirm('Bạn có chắc chắn xóa #' + id);
        if (check) {
            ProductModel.delete(id).then(res => {
                alert(lang.deleted);
                setLoading(Math.random());
            })
        }
    }
    const handleEnableDisable = (id, active) => {
        let check = window.confirm('Bạn có chắc chắn thay đổi #' + id);
        if (check) {
            ProductModel.changeStatus(id, active).then( res => {
                alert(lang.saved);
                setLoading(Math.random());
            })
        }
    }
    const handleChangeFilter = (event) => {
        setPage(1);
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    const handleChangeTab = (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case 'index':
                setFilter({
                    ...filter,
                    is_active: 1
                });
                break;
            case 'trash':
                setFilter({
                    ...filter,
                    is_active: 2
                });
                break;
            default:
                break;
        }
    }

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Danh sách sản phẩm' parentName='Sản phẩm' parentLink='products' />
                <div id='filterArea' className='content p-0'>
                    <div id='boxFilters' className='mb-0 border-0 card'>
                        <form onChange={handleChangeFilter}>
                            <div className='card-header p-0 '>
                                <ul className='nav nav-tabs nav-tabs-highlight mb-0 navTabTopFilter'>
                                    <li className='nav-item'>
                                        <Link onClick={ () => handleChangeTab('index') } className={activeTab == 'index' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Bộ lọc
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link onClick={ () => handleChangeTab('trash') } className={activeTab == 'trash' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Sản phẩm đã xóa
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='card-body pt-0 background-horizontal pb-1'>
                                <div className='row'>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select className='form-control' name='warehouse_id'>
                                                <option value="0">Tất cả các kho</option>
                                                {
                                                    warehouses.map((warehouse, key) => (
                                                        <option key={key} value={warehouse.id}>{warehouse.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <input type="text" name="name_or_code" placeholder="Tên, mã sản phẩm" className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select className='form-control' name='brand_id'>
                                                <option value="0">Tất cả nhãn hiệu</option>
                                                {
                                                    brands.map((brand, key) => (
                                                        <option key={key} value={brand.id}>{brand.title}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select className='form-control' name='category_id'>
                                                <option value="0">Tất cả thể loại</option>
                                                {
                                                    categories.map((category, key) => (
                                                        <option key={key} value={category.id}>{category.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 col-lg-1 pr-1">
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select name="unit_id" className="form-control">
                                                <option value="">Đơn vị</option>
                                                {
                                                    units.map( (unit,key) => (
                                                        <option key={key} value={unit.id}>{unit.unit_name}</option>
                                                    ) )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 col-lg-1 pr-1">
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select name="remain" className="form-control">
                                                <option value="">- Tồn -</option>
                                                <option value="1">Còn tồn</option>
                                                <option value="2">Hết hàng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 col-lg-2 pr-1">
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select name="is_active" className="form-control">
                                                <option value="">- Trạng thái bán -</option>
                                                <option value="1">Đang bán</option>
                                                <option value="2">Ngừng bán</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <div className="col-1 pt-3">
                                        <div className="btn-group dropdown">
                                            <button type="submit" className="btn submitFilterBtn bg-teal-400">Lọc</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='content p-0'>
                <div className='card border-0'>
                    <div className='card-header bgHeaderFilter-light header-elements-inline dg-header '>
                        <div className='header-elements'>
                            <div className='btn-group mr-2'>
                                <button className='dropdown-toggle btn btn-md  bg-success' data-toggle="dropdown">
                                    Thêm mới
                                </button>
                                <div className='dropdown-menu'>
                                    <Link to={'/products/create'} className='dropdown-item'>
                                        <i className='fal fa-plus mr-2'></i>Thêm mới
                                    </Link>
                                    <Link to={'/products/createFromExcel'} className='dropdown-item'>
                                        <i className='fal fa-file-excel mr-2'></i>Nhập từ Excel
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='header-elements ml-auto'>
                            <div className="d-none d-lg-flex align-items-center">{pageData.from} - {pageData.current_page} / {pageData.last_page}</div>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <MyTable
                            items={items}
                            loading={loading}
                            headers={['Tên', 'Mã', 'Nhãn hiệu', 'Thể loại', 'Số lượng', 'Đơn vị', 'Giá']}
                            cols={['name', 'code', 'brand_name', 'category_name', 'qty', 'unit_name', 'price_format']}
                            actions={['Sửa', 'Xóa']}
                            base_link={'products'}
                            handleDelete={handleDelete}
                            handleEnableDisable={handleEnableDisable}
                        />
                    </div>
                    <MyPagination pageData={pageData} setPage={setPage} />
                </div>
            </div>

        </MasterLayout>
    );
}

export default Index;