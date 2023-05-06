import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function NavBar(props) {
    return (
        <>
            <div className="navbar navbar-expand-md navbar-light border-top-0 pl-0 pr-0">
                <div className="container">
                    <ul
                        id="menuHorizontal"
                        className="navbar-nav navbar-nav-highlight flex-wrap d-none d-xl-flex"
                    >
                        <li className="nav-item dropdown">
                            <Link to={'/'} className='navbar-nav-link'>Tổng quan</Link>
                        </li>
                        <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Sản phẩm</Link>
                            <div className="dropdown-menu">
                                <Link to={'/products'} className='dropdown-item'>
                                    <i className="fal fa-cube" />
                                    Sản phẩm
                                </Link>
                                <Link to={'/categories'} className='dropdown-item'>
                                    <i className="fal fa-th-list" />
                                    Danh mục
                                </Link>
                                {/* <Link to={'/products/print_barcode'} className='dropdown-item'>
                                    <i className="fa fa-barcode" />
                                    In mã vạch
                                </Link> */}
                                <Link to={'/brand'} className='dropdown-item'>
                                    <i className="fal fa-copyright" />
                                    Nhãn hiệu
                                </Link>
                                <Link to={'/supplier'} className='dropdown-item'>
                                    <i className="fal fa-home-alt" />
                                    Nhà cung cấp
                                </Link>
                                
                            </div>
                        </li>
                        <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Kho Hàng</Link>
                            <div className="dropdown-menu">
                                <Link to={'/purchases'} className='dropdown-item'>
                                    <i className="fal fa-exchange" />
                                    Nhập kho
                                </Link>
                                <Link to={'/transfers'} className='dropdown-item'>
                                    <i className="fal fa-retweet" />
                                    Chuyển kho
                                </Link>
                                <Link to={'/adjustment'} className='dropdown-item'>
                                    <i className="fal fa-calendar-check" />
                                    Điều chỉnh
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Bán Hàng</Link>
                            <div className="dropdown-menu">
                                <Link to={'/sales'} className='dropdown-item'>
                                    <i className="fal fa-shopping-bag" />
                                    Bán hàng
                                </Link>
                                <Link to={'/sales/create'} className='dropdown-item'>
                                    <i className="fal fa-shopping-cart" />
                                    Tạo đơn bán hàng
                                </Link>
                                {/* <Link to={'/delivery'} className='dropdown-item'>
                                    <i className="fal fa-truck" />
                                    Danh sách giao hàng
                                </Link> */}
                                <Link to={'/return-sale'} className='dropdown-item'>
                                    <i className="fal fa-arrow-square-left" />
                                    Trả hàng từ khách
                                </Link>
                                <Link to={'/return-purchase'} className='dropdown-item'>
                                    <i className="fal fa-arrow-square-right" />
                                    Trả hàng từ nhập
                                </Link>
                                
                            </div>
                        </li>
                        {/* <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Kế toán</Link>
                            <div className="dropdown-menu">
                                <Link to={'/accounts'} className='dropdown-item'>
                                    <i className="fal fa-credit-card" />
                                    Tài khoản ngân hàng
                                </Link>
                                <Link to={'/money-transfers'} className='dropdown-item'>
                                    <i className="fal fa-list" />
                                    Chuyển tiền
                                </Link>
                                <Link to={'/accounts/account-statement'} className='dropdown-item'>
                                    <i className="fal fa-list" />
                                    Sao kê tài khoản
                                </Link>
                                <Link to={'/accounts/balancesheet'} className='dropdown-item'>
                                    <i className="fal fa-list" />
                                    Bảng cân đối kế toán
                                </Link>
                            </div>
                        </li> */}
                        <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Báo cáo</Link>
                            <div className="dropdown-menu">
                                <Link to={'/report/profit-loss'} className='dropdown-item'>
                                    <i className="fal fa-chart-bar fa-lg" />
                                    Doanh thu
                                </Link>
                                <Link to={'/report/due'} className='dropdown-item'>
                                    <i className="fal fa-money-bill-alt" />
                                    Công nợ bán hàng
                                </Link>
                                <Link to={'/report/due-purchase'} className='dropdown-item'>
                                    <i className="fal fa-money-bill-alt" />
                                    Công nợ nhập hàng
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown ">
                            <Link to={'#'} data-toggle='dropdown' className='navbar-nav-link dropdown-toggle'>Cài đặt</Link>
                            <div className="dropdown-menu">
                                <Link to={'/warehouse'} className='dropdown-item'>
                                    <i className="fal fa-sitemap" />
                                    Kho hàng
                                </Link>
                                <Link to={'/unit'} className='dropdown-item'>
                                    <i className="fal fa-tags" />
                                    Đơn vị
                                </Link>
                                <Link to={'/setting/store'} className='dropdown-item'>
                                    <i className="fal fa-cog" />
                                    Cài đặt chung
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <Sidebar/>
                </div>
            </div>

        </>
    );
}

export default NavBar;