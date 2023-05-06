import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import UnitModel from '../../models/UnitModel';
import Breadcrumb from '../../includes/page/Breadcrumb';
import { Link } from 'react-router-dom';
import MyTable from '../../components/global/MyTable';
import MyPagination from '../../components/global/MyPagination';
import lang from '../../lang/vi';

function Index(props) {
    const [loading,setLoading] = useState(true);
    const [items,setItems] = useState([]);
    const [page,setPage] = useState(1);
    const [activeTab, setActiveTab] = useState('index');
    const [filter,setFilter] = useState({ is_active: 1 });
    const [pageData,setPageData] = useState({});
    useEffect( () => {
        UnitModel.all({
            page: page,
            filter: filter
        }).then( res => {
            setLoading(false);
            setItems(res.data);
            setPageData(res.meta);
        } )
    }, [page, filter, loading]);

    const handleDelete = (id, title = '') => {
        title = title ? title : id;
        let check = window.confirm('Bạn có chắc chắn xóa #' + id);
        if (check) {
            UnitModel.delete(id).then(res => {
                alert(lang.deleted);
                setLoading(true);
            })
        }
    }
    const handleEnableDisable = (id, active) => {
        let check = window.confirm('Bạn có chắc chắn thay đổi #' + id);
        if (check) {
            UnitModel.changeStatus(id, active).then(res => {
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
                <Breadcrumb pageName='Đơn vị' parentName='Đơn vị' parentLink='unit' />
                <div id='filterArea' className='content p-0'>
                    <div id='boxFilters' className='mb-0 border-0 card'>
                        <form onChange={handleChangeFilter}>
                            <div className='card-header p-0 '>
                                <ul className='nav nav-tabs nav-tabs-highlight mb-0 navTabTopFilter'>
                                    <li className='nav-item'>
                                        <Link onClick={() => handleChangeTab('index')} className={activeTab == 'index' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Bộ lọc
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link onClick={() => handleChangeTab('trash')} className={activeTab == 'trash' ? 'nav-link active px-3' : 'nav-link px-3'}>
                                            Đã xóa
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='card-body pt-0 background-horizontal pb-1'>
                                <div className='row'>
                                    <div className='col-6 col-md-3 col-lg-2 pr-1'>
                                        <div className='form-group input-group mb-0 pt-3'>
                                            <input type="text" name="unit_name" placeholder="Tên" className="form-control" />
                                        </div>
                                    </div>
                                </div>
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
                                    <Link to={'/unit/create'} className='dropdown-item'>
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
                            headers={['Tên','Mã']} 
                            cols={['unit_name','unit_code']}
                            actions={['Sửa','Xóa']}
                            base_link={'unit'}
                            handleDelete={handleDelete}
                            handleEnableDisable={handleEnableDisable}
                        />
                    </div>
                    <MyPagination pageData={pageData} setPage={setPage}/>
                </div>
            </div>
        </MasterLayout>
    );
}

export default Index;