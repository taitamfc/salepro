import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import SaleModel from '../../models/SaleModel';
import Breadcrumb from '../../includes/page/Breadcrumb';
import { Link } from 'react-router-dom';
import MyTable from '../../components/global/MyTable';
import MyPagination from '../../components/global/MyPagination';
import WarehouseModel from '../../models/WarehouseModel';
import lang from '../../lang/vi';

function Index(props) {
    const [loading,setLoading] = useState(true);
    const [items,setItems] = useState([]);
    const [page,setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('index');
    const [filter,setFilter] = useState({ is_active: 1 });
    const [pageData,setPageData] = useState({});
    useEffect( () => {
        SaleModel.all({
            page: page,
            filter: filter
        }).then( res => {
            setLoading(false)
            setItems(res.data);
            setPageData(res.meta);
        }).catch( err => {
            
        })
    }, [page,filter,loading]);

    const [warehouses, setWarehouses] = useState([]);
    useEffect(() => {
        WarehouseModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setWarehouses(res.data);
        }).catch(err => {  });
    }, []);

    const handleDelete = (id,title = '') => {
        title = title ? title : id;
        let check = window.confirm('Bạn có chắc chắn xóa #'+id);
        if(check){
            SaleModel.delete(id).then( res => {
                alert(lang.deleted);
                setLoading(Math.random());
            })
        }
    }
    const handleEnableDisable = (id, active) => {
        let check = window.confirm('Bạn có chắc chắn thay đổi #' + id);
        if (check) {
            SaleModel.changeStatus(id, active).then( res => {
                alert(lang.saved);
                setLoading(true);
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
                <Breadcrumb pageName='Bán hàng' parentName='Bán hàng' parentLink='sales' />
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
                                    {/* <li className='nav-item'>
                                        <Link onClick={ () => handleChangeTab('trash') } className={activeTab == 'trash' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Đã xóa
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                            <div className='card-body pt-0 background-horizontal pb-1'>
                                <div className='row'>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <input type="text" name="reference_no" placeholder="Mã" className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <select className='form-control' name='warehouse_id'>
                                                <option value="">Kho Hàng</option>
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
                                            <input type="text" name="customer_name_or_customer_phone" placeholder="Tên, SDT khách hàng" className="form-control" />
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
                        <div className='header-elements'>
                            <div className='btn-group mr-2'>
                                <button className='dropdown-toggle btn btn-md  bg-success' data-toggle="dropdown">
                                    Thêm mới
                                </button>
                                <div className='dropdown-menu'>
                                    <Link to={'/sales/create'} className='dropdown-item'>
                                        <i className='fal fa-plus mr-2'></i>Thêm mới
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
                            headers={['ID','Ngày','Kho hàng','Khách hàng','SP','SL','Tổng tiền','Đã trả','Nợ']} 
                            cols={['reference_no','created_at_format','warehouse_name','customer_info','item','total_qty','grand_total_format','paid_amount_format','due_format']}
                            actions={['Sửa','Xóa']}
                            base_link={'sales'}
                            col_active={false}
                            handleDelete={handleDelete}
                            handleEnableDisable={handleEnableDisable}
                            dropdownActions={[
                                {
                                    to: '/sales/gen_invoice/__ID__',
                                    icon: 'fal fa-print',
                                    label: 'In hóa đơn',
                                },
                                {
                                    to: '/sales/add_payment/__ID__',
                                    icon: 'fa fa-plus',
                                    label: 'Thêm thanh toán',
                                }
                            ]}
                        />
                    </div>
                    <MyPagination pageData={pageData} setPage={setPage}/>

                </div>
            </div>

        </MasterLayout>
    );
}

export default Index;