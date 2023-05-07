import React from 'react';
import { Link } from 'react-router-dom';

function TopBar(props) {
    return (
        <>
            <div className="fixTopDefault navbar navbar-expand-md navbar-dark  border-bottom-0" id="header">
                <div className="container">
                    {/* Mobile controls */}
                    <div className="d-flex d-xl-none col-3 col-md-1 pl-0">
                        <button
                            className="navbar-toggler sidebar-mobile-main-toggle ml-0 d-flex"
                            type="button"
                        >
                            <i className="far fa-bars" />
                        </button>
                    </div>
                    {/* /mobile controls */}
                    {/* Header with logos */}
                    <div
                        className="d-flex align-items-center mr-0 col-6 col-md-2 col-lg-2 justify-content-center justify-content-md-start navbar-brand  pl-xl-0"
                        id="logoMain"
                    >
                        <Link to={'/'} className='d-inline-block'>
                            <h3 className='m-0 text-white'>PHẦN MỀM QUẢN LÝ CỬA HÀNG MINI</h3>
                        </Link>
                    </div>
                    {/* /header with logos */}
                    <div className="d-flex d-md-none align-items-center col-3 justify-content-end pr-0">
                        <div className="dropdown dropdown-user">
                            <Link className="navbar-nav-link pr-md-0" data-toggle="dropdown">
                                <span className="fas fa-user-circle" style={{ fontSize: "1.2rem" }} />
                            </Link>
                            {/* <div className="dropdown-menu dropdown-menu-right">
                            <Link href="/profile/index" className="dropdown-item">
                                <i className="far fa-user" /> Quản lý cửa hàng
                            </Link>
                            <Link href="#" className="dropdown-item">
                                <i className="far fa-bell" />
                                Thông báo
                            </Link>
                            <div className="dropdown-divider" />
                            <Link href="/signout" className="dropdown-item text-danger btnSignout">
                                <i className="far fa-power-off" />
                                Đăng xuất
                            </Link>
                        </div> */}
                        </div>
                    </div>
                    {/* Navbar content */}
                    <div className="collapse navbar-collapse" id="navbar-mobile">
                        <Link
                            href=""
                            className="text-center w-100 text-md-left w-md-auto text-white"
                            id="expiredWarning"
                            style={{ display: "none" }}
                        >
                            <span id="expired-messages" />
                            <i className="fal fa-external-link ml-1" aria-hidden="true" />
                        </Link>
                        <ul
                            className="navbar-nav ml-md-auto ml-xl-auto d-none d-md-flex"
                        >
                            
                            <li className="nav-item dropdown dropdown-user">
                                <Link
                                    href="#"
                                    className="navbar-nav-link d-flex align-items-center dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    <span className="name hidden-xs hidden-sm">
                                        <i className="fa fa-plus-circle fa-lg mr-1" /> Thêm mới
                                    </span>
                                </Link>
                                <div
                                    className="dropdown-menu dropdown-menu-left pt-0 mt-0"
                                >
                                    <Link to={'/products/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Sản phẩm</span>
                                    </Link>
                                    <Link to={'/categories/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Danh mục</span>
                                    </Link>
                                    <Link to={'/brand/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Thương hiệu</span>
                                    </Link>
                                    <Link to={'/supplier/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Nhà cung cấp</span>
                                    </Link>
                                    <Link to={'/purchases/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Nhập kho</span>
                                    </Link>
                                    <Link to={'/transfers/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Chuyển kho</span>
                                    </Link>
                                    <Link to={'/adjustment/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Điều chỉnh</span>
                                    </Link>
                                    <Link to={'/sales/create'} className="dropdown-item ">
                                        <i className="fa fa-plus" />
                                        <span className="text">Bán hàng</span>
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item mega-menu-right d-flex align-items-center d-md-none d-lg-flex">
                                <Link
                                    href="#"
                                    className="navbar-nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-life-ring fa-lg" />
                                </Link>
                                <div
                                    className="dropdown-menu dropdown-content w-50 w-xl-25 mt-0"
                                >
                                    <div className="dropdown-content-body">
                                        <div className="row">
                                            
                                            <div className="col-12 col-sm-6">
                                                <div className="font-size-md line-height-sm font-weight-semibold text-uppercase mt-1">
                                                    HOTLINE
                                                </div>
                                                <div className="dropdown-divider mb-2 d-none d-lg-block" />
                                                <div className="row">
                                                    <Link
                                                        href="tel:0943612567"
                                                        className="dropdown-item rounded col-6 col-sm-12"
                                                    >
                                                        <i className="fal fa-phone-alt mr-2" /> 0943612567
                                                    </Link>
                                                </div>
                                                <div className="dropdown-divider d-lg-none" />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="font-size-md line-height-sm font-weight-semibold text-uppercase mt-1">
                                                    Phần mềm hỗ trợ
                                                </div>
                                                <div className="dropdown-divider mb-2 d-none d-lg-block" />
                                                <div className="row">
                                                    <Link
                                                        href="https://ultraviewer.net"
                                                        className="dropdown-item rounded col-6 col-sm-12"
                                                        target="_blank"
                                                    >
                                                        <i className="fal fa-download mr-2" />
                                                        Ultraviewer
                                                    </Link>
                                                    <Link
                                                        href="https://anydesk.com"
                                                        className="dropdown-item rounded col-6 col-sm-12"
                                                        target="_blank"
                                                    >
                                                        <i className="fal fa-download mr-2" />
                                                        Anydesk
                                                    </Link>
                                                    <Link
                                                        href="https://www.teamviewer.com"
                                                        className="dropdown-item rounded"
                                                    >
                                                        <i className="fal fa-download mr-2" />
                                                        Teamviewer
                                                    </Link>
                                                </div>
                                                <div className="dropdown-divider d-lg-none" />
                                            </div>
                                            <div className="col-12">
                                                <div className="font-size-md line-height-sm font-weight-semibold text-uppercase mt-1 d-lg-none">
                                                    Liên hệ
                                                </div>
                                                <div className="dropdown-divider mb-2 d-none d-lg-block" />
                                                <div className="row">
                                                    <Link
                                                        href="https://manual.nhanh.vn/ "
                                                        target="_blank"
                                                        className="dropdown-item rounded"
                                                    >
                                                        <i className="fal fa-lg fa-file-alt text-primary mr-2" />{" "}
                                                        Hướng dẫn sử dụng
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            
                            
                        </ul>
                    </div>
                    {/* /navbar content */}
                </div>
            </div>

        </>
    );
}

export default TopBar;