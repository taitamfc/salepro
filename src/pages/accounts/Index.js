import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import AccountModel from '../../models/AccountModel';
import Breadcrumb from '../../includes/page/Breadcrumb';
import { Link } from 'react-router-dom';
import MyTable from '../../components/global/MyTable';
import MyPagination from '../../components/global/MyPagination';

function Index(props) {
    const [loading,setLoading] = useState(true);
    const [items,setItems] = useState([]);
    const [page,setPage] = useState(1);
    const [filter,setFilter] = useState({ is_active: 1 });
    const [pageData,setPageData] = useState({});
    useEffect( () => {
        AccountModel.all({
            page: page,
            filter: filter
        }).then( res => {
            setLoading(false);
            setItems(res.data);
            setPageData(res.meta);
        } )
    }, [page,filter]);

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Tài khoản ngân hàng' parentName='Tài khoản ngân hàng' parentLink='accounts' />
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
                                    <Link to={'/accounts/create'} className='dropdown-item'>
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
                            headers={['Số tài khoản','Tên','Tiền ban đầu','Tiền còn lại']} 
                            cols={['account_no','name','initial_balance','total_balance']}
                            actions={['Sửa','Xóa']}
                            base_link={'accounts'}
                        />
                    </div>
                    <MyPagination pageData={pageData} setPage={setPage}/>
                </div>
            </div>
        </MasterLayout>
    );
}

export default Index;