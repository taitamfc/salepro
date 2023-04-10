import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import ProductModel from '../../models/ProductModel';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductTableItem from '../../components/product/ProductTableItem';
import LoadingTable from '../../components/global/LoadingTable';

function Index(props) {
    const [loading,setLoading] = useState(true);
    const [items,setItems] = useState([]);
    const [page,setPage] = useState(1);
    const [filter,setFilter] = useState({});
    const [pageData,setPageData] = useState({});
    useEffect( () => {
        ProductModel.all({
            page: page,
            filter: filter
        }).then( res => {
            setLoading(false);
            setItems(res.data);
            setPageData(res.meta);
        } )
    }, [page,filter,loading]);

    return (
        <MasterLayout>
            <div className='page-header'>
            <Breadcrumb pageName='Danh sách sản phẩm' parentName='Sản phẩm' parentLink='products' />
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
                        <table className='table table-tiny table-hover table-bordered dataTable stickyHeader'>
                            <thead className="dgTh">
                                <tr className="text-center">
                                    <th className="select-checkbox dgCheckboxCheckAll"></th>
                                    <th>Hình ảnh</th>
                                    <th>Tên</th>
                                    <th>Mã</th>
                                    <th>Nhãn hiệu</th>
                                    <th>Thể loại</th>
                                    <th>Số lượng</th>
                                    <th>Đơn vị</th>
                                    <th>Giá</th>
                                    <th><i className="fal fa-cog"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? (
                                        <LoadingTable colSpan={10}/>
                                    ) : 
                                    items.map( (item,key) => (
                                        <ProductTableItem key={key} the_key={key} item={item}/>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </MasterLayout>
    );
}

export default Index;