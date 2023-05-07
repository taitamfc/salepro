import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import PurchaseModel from '../../models/PurchaseModel';
import Breadcrumb from '../../includes/page/Breadcrumb';
import { Link } from 'react-router-dom';
import MyTable from '../../components/global/MyTable';
import MyPagination from '../../components/global/MyPagination';
import lang from '../../lang/vi';
import WarehouseModel from '../../models/WarehouseModel';
import SupplierModel from '../../models/SupplierModel';


function ReportDuePurchase(props) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('index');
    const [filter, setFilter] = useState({ is_active: 1 });
    const [pageData, setPageData] = useState({});

    const [warehouses, setWarehouses] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        WarehouseModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setWarehouses(res.data);
        }).catch(err => {  });
        SupplierModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setSuppliers(res.data);
        }).catch(err => {  });

    }, []);
    useEffect(() => {
        PurchaseModel.getDue({
            page: page,
            filter: filter
        }).then(res => {
            console.log(res);
            setLoading(false);
            setItems(res.data);
            setPageData(res.meta);
        }).catch(err => {
            
        })
    }, [page, filter,loading]);

    const handleDelete = (id, title = '') => {
        title = title ? title : id;
        let check = window.confirm('Bạn có chắc chắn xóa #' + id);
        if (check) {
            PurchaseModel.delete(id).then(res => {
                alert(lang.deleted);
                setLoading(Math.random());
            })
        }
    }
    const handleEnableDisable = (id, active) => {
        let check = window.confirm('Bạn có chắc chắn thay đổi #' + id);
        if (check) {
            PurchaseModel.changeStatus(id, active).then(res => {
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
                <Breadcrumb pageName='Công nợ nhập hàng' parentName='Công nợ nhập hàng' parentLink='report/due-purchase' />
                <div id='filterArea' className='content p-0'>
                    <div id='boxFilters' className='mb-0 border-0 card'>
                        <form onChange={handleChangeFilter}>
                            <div className='card-header p-0 '>
                                <ul className='nav nav-tabs nav-tabs-highlight mb-0 navTabTopFilter'>
                                    <li className='nav-item'>
                                        <Link onClick={() => handleChangeTab('index')} className={activeTab === 'index' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Bộ lọc
                                        </Link>
                                    </li>
                                    {/* <li className='nav-item'>
                                        <Link onClick={() => handleChangeTab('trash')} className={activeTab === 'trash' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Đã xóa
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                            <div className='card-body pt-0 background-horizontal pb-1'>
                                <div className='row'>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select className='form-control' name='warehouse_id'>
                                                <option value="">Tất cả các kho</option>
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
                                            <select className='form-control' name='supplier_id'>
                                                <option value="">Tất cả nhà cung cấp</option>
                                                {
                                                    suppliers.map((supplier, key) => (
                                                        <option key={key} value={supplier.id}>{supplier.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 col-lg-3 pr-1">
                                        <div className="form-group input-group mb-0 pt-3">
                                            <div className="p-0">
                                                <div className="row m-0 input-group">
                                                    <input
                                                        type="date"
                                                        name="fromDate"
                                                        className="form-control tbDatePicker col-6"
                                                        maxLength={255}
                                                        autoComplete="off"
                                                        placeholder="Từ"
                                                        id="fromDate"
                                                        defaultValue="23/04/2023"
                                                    />
                                                    <input
                                                        type="date"
                                                        name="toDate"
                                                        className=" form-control tbDatePicker col-6"
                                                        maxLength={255}
                                                        autoComplete="off"
                                                        placeholder="Đến"
                                                        id="toDate"
                                                        defaultValue="03/05/2023"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='content p-0'>
                <div className='card border-0'>
                    <div className='card-header bgHeaderFilter-light header-elements-inline dg-header '>
                        <div className='header-elements ml-auto'>
                            <div className="d-none d-lg-flex align-items-center">{pageData.from} - {pageData.current_page} / {pageData.last_page}</div>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <MyTable
                            items={items}
                            loading={loading}
                            headers={['ID', 'Ngày', 'Kho hàng', 'Nhà CC', 'SP', 'SL', 'Tổng tiền', 'Đã trả', 'Nợ']}
                            cols={['reference_no', 'created_at_format', 'warehouse_name', 'supplier_name', 'total_product', 'total_qty', 'grand_total', 'paid_amount', 'due']}
                            actions={['Sửa', 'Xóa']}
                            base_link={'purchases'}
                            col_active={false}
                            handleDelete={handleDelete}
                            handleEnableDisable={handleEnableDisable}
                            dropdownActions={[
                                {
                                    to: '/purchases/add_payment/__ID__',
                                    icon: 'fa fa-plus',
                                    label: 'Thêm thanh toán',
                                }
                            ]}
                        />
                    </div>
                    <MyPagination pageData={pageData} setPage={setPage} />

                </div>
            </div>

        </MasterLayout>
    );
}

export default ReportDuePurchase;