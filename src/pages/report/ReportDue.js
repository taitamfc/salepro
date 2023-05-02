import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import SaleModel from '../../models/SaleModel';
import Breadcrumb from '../../includes/page/Breadcrumb';
import { Link } from 'react-router-dom';
import MyTable from '../../components/global/MyTable';
import MyPagination from '../../components/global/MyPagination';

function ReportDue(props) {
    const [loading,setLoading] = useState(true);
    const [items,setItems] = useState([]);
    const [page,setPage] = useState(1);
    const [filter,setFilter] = useState({});
    const [pageData,setPageData] = useState({});
    useEffect( () => {
        SaleModel.getDue({
            page: page,
            filter: filter
        }).then( res => {
            console.log(res);
            setLoading(false);
            setItems(res.data);
            setPageData(res.meta);
        }).catch( err => {
            alert(err.message);
        })
    }, [page,filter]);

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Công nợ' parentName='Công nợ' parentLink='report/due' />
                <div id='filterArea' className='content p-0'>
                    <div id='boxFilters' className='mb-0 border-0 card'>
                        <form>
                            <div className='card-header p-0 '>
                                <ul className='nav nav-tabs nav-tabs-highlight mb-0 navTabTopFilter'>
                                    <li className='nav-item'>
                                        <a href="#" className="nav-link active px-3">Bộ lọc</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="" className="nav-link px-2 show " title="">Có sửa giá bán</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='card-body pt-0 background-horizontal pb-1'>
                                ahaha
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='content'>
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
                            cols={['reference_no','created_at_format','warehouse_name','customer_info','item','total_qty','grand_total','paid_amount','due']}
                            actions={['Sửa','Xóa']}
                            base_link={'sales'}
                            col_active={false}
                            enableEdit={false}
                            enableDelete={false}
                            dropdownActions={[
                                {
                                    to: '/sales/show/__ID__',
                                    icon: 'fa fa-eye',
                                    label: 'Xem',
                                },
                                {
                                    to: '/sales/add_payment/__ID__',
                                    icon: 'fa fa-plus',
                                    label: 'Thêm thanh toán',
                                },
                                {
                                    to: '/sales/view_payment/__ID__',
                                    icon: 'fal fa-money-bill-alt',
                                    label: 'Xem thanh toán',
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

export default ReportDue;