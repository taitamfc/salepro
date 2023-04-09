import React from 'react';

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
                    <a href="/admin" className="d-inline-block">
                        <img
                        src="https://nstatic.nvncdn.com/img/logo/nhanh_white.png"
                        alt="Logo Nhanh.vn"
                        />
                    </a>
                    </div>
                    {/* /header with logos */}
                    <div className="d-flex d-md-none align-items-center col-3 justify-content-end pr-0">
                    <div className="dropdown dropdown-user">
                        <a href="#" className="navbar-nav-link pr-md-0" data-toggle="dropdown">
                        <span className="fas fa-user-circle" style={{ fontSize: "1.2rem" }} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                        <a href="/profile/index" className="dropdown-item">
                            <i className="far fa-user" /> Tài
                        </a>
                        <a href="#" className="dropdown-item">
                            <i className="far fa-bell" />
                            Thông báo
                        </a>
                        <div className="dropdown-divider" />
                        <a href="/signout" className="dropdown-item text-danger btnSignout">
                            <i className="far fa-power-off" />
                            Đăng xuất
                        </a>
                        </div>
                    </div>
                    </div>
                    {/* Navbar content */}
                    <div className="collapse navbar-collapse" id="navbar-mobile">
                    <a
                        href="javascript:;"
                        className="text-center w-100 text-md-left w-md-auto text-white"
                        id="expiredWarning"
                        style={{ display: "none" }}
                    >
                        <span id="expired-messages" />
                        <i className="fal fa-external-link ml-1" aria-hidden="true" />
                    </a>
                    <ul
                        className="navbar-nav ml-md-auto ml-xl-auto d-none d-md-flex"
                        style={{ fontSize: "0.85rem" }}
                    >
                        <li className="nav-item d-none d-xl-block">
                        <a
                            href="https://dangky.nhanh.vn/vay-von-VPBank?utm_source=admin&utm_medium=click"
                            target="_blank"
                            className="navbar-nav-link"
                        >
                            <i className="fal fa-lg fa-usd-circle mr-2" />
                            Đăng ký vay vốn VPbank
                        </a>
                        </li>
                        <li className="nav-item dropdown dropdown-user">
                        <a
                            href="/product/item/add"
                            className="navbar-nav-link d-flex align-items-center dropdown-toggle"
                            data-toggle="dropdown"
                        >
                            <span className="name hidden-xs hidden-sm">
                            <i className="fa fa-plus-circle fa-lg mr-1" /> Thêm mới
                            </span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-left pt-0 mt-0"
                            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                        >
                            <a href="/product/item/add" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Sản phẩm</span>
                            </a>
                            <a href="/product/barcode/export" className="dropdown-item ">
                            <i className="fas fa-barcode" />
                            <span className="text">In mã vạch</span>
                            </a>
                            <a href="/order/manage/add" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Đơn hàng</span>
                            </a>
                            <a href="/pos/bill/add" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Bán lẻ</span>
                            </a>
                            <a href="/pos/bill/addwholesale" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Bán sỉ</span>
                            </a>
                            <a href="/inventory/bill/import" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Nhập kho</span>
                            </a>
                            <a href="/inventory/bill/export" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Xuất kho</span>
                            </a>
                            <a href="/inventory/transfer/add" className="dropdown-item ">
                            <i className="fa fa-plus" />
                            <span className="text">Chuyển kho</span>
                            </a>
                            <a href="/store/import/index " className="dropdown-item ">
                            <i className="fal fa-file-excel" />
                            <span className="text">Nhập từ Excel</span>
                            </a>
                        </div>
                        </li>
                        <li className="nav-item mega-menu-right d-flex align-items-center d-md-none d-lg-flex">
                        <a
                            href="#"
                            className="navbar-nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fas fa-life-ring fa-lg" />
                        </a>
                        <div
                            className="dropdown-menu dropdown-content w-50 w-xl-25 mt-0"
                            style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                        >
                            <div className="dropdown-content-body">
                            <div className="row">
                                <div className="col-12 d-block d-sm-none">
                                <div className="font-size-md font-weight-semibold p-2 mt-2 text-center">
                                    <a
                                    className="bg-success py-2 px-3"
                                    target="_blank"
                                    href="https://m.me/nhanh.vn"
                                    style={{ borderRadius: 5 }}
                                    >
                                    <i className="fa fa-comments mr-2" />
                                    Chat hỗ trợ
                                    </a>
                                </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                <div className="font-size-md line-height-sm font-weight-semibold text-uppercase mt-1">
                                    HOTLINE
                                </div>
                                <div className="dropdown-divider mb-2 d-none d-lg-block" />
                                <div className="row">
                                    <a
                                    href="tel:19002812"
                                    className="dropdown-item rounded col-6 col-sm-12"
                                    >
                                    <i className="fal fa-phone-alt mr-2" /> 19002812
                                    </a>
                                    <a
                                    href="mailto:contact@nhanh.vn"
                                    className="dropdown-item rounded"
                                    >
                                    <i className="fal fa-envelope mr-2" /> contact@nhanh.vn
                                    </a>
                                </div>
                                <div className="dropdown-divider d-lg-none" />
                                </div>
                                <div className="col-12 col-sm-6">
                                <div className="font-size-md line-height-sm font-weight-semibold text-uppercase mt-1">
                                    Phần mềm hỗ trợ
                                </div>
                                <div className="dropdown-divider mb-2 d-none d-lg-block" />
                                <div className="row">
                                    <a
                                    href="https://ultraviewer.net"
                                    className="dropdown-item rounded col-6 col-sm-12"
                                    target="_blank"
                                    >
                                    <i className="fal fa-download mr-2" />
                                    Ultraviewer
                                    </a>
                                    <a
                                    href="https://anydesk.com"
                                    className="dropdown-item rounded col-6 col-sm-12"
                                    target="_blank"
                                    >
                                    <i className="fal fa-download mr-2" />
                                    Anydesk
                                    </a>
                                    <a
                                    href="https://www.teamviewer.com"
                                    className="dropdown-item rounded"
                                    >
                                    <i className="fal fa-download mr-2" />
                                    Teamviewer
                                    </a>
                                </div>
                                <div className="dropdown-divider d-lg-none" />
                                </div>
                                <div className="col-12">
                                <div className="font-size-md line-height-sm font-weight-semibold text-uppercase mt-1 d-lg-none">
                                    Liên hệ
                                </div>
                                <div className="dropdown-divider mb-2 d-none d-lg-block" />
                                <div className="row">
                                    <a
                                    href="https://manual.nhanh.vn/ "
                                    target="_blank"
                                    className="dropdown-item rounded"
                                    >
                                    <i className="fal fa-lg fa-file-alt text-primary mr-2" />{" "}
                                    Hướng dẫn sử dụng
                                    </a>
                                    <a
                                    href="https://www.facebook.com/nhanh.vn"
                                    target="_blank"
                                    className="dropdown-item rounded"
                                    >
                                    <i className="fab fa-facebook text-primary mr-2" />
                                    https://facebook.com/nhanh.vn
                                    </a>
                                    <a
                                    href="https://www.facebook.com/groups/support.nhanh.vn"
                                    target="_blank"
                                    className="dropdown-item rounded"
                                    >
                                    <i className="fab fa-facebook-square text-primary mr-2" />
                                    https://facebook.com/groups/support.nhanh.vn
                                    </a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </li>
                        <li className="nav-item dropdown d-flex align-items-center">
                        <a
                            href="#"
                            className="navbar-nav-link"
                            id="js-notify-qty"
                            data-toggle="dropdown"
                        />
                        <div
                            className="dropdown-menu dropdown-menu-right dropdown-content wmin-md-300 mt-0"
                            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                        >
                            <ul id="notifyBox" className="media-list pt-2 pb-2" />
                            <div className="dropdown-content-footer">
                            <a
                                href="/system/announcement/index"
                                className="text-grey mr-auto"
                            >
                                Xem tất cả
                            </a>
                            <a
                                href="/notification/index/setting"
                                className="text-grey"
                                title="Cài đặt thông báo"
                                data-toggle="tooltip"
                            >
                                <i className="fal fa-cog" />
                            </a>
                            </div>
                        </div>
                        </li>
                        <li className="nav-item dropdown dropdown-user">
                        <a
                            href="#"
                            className="navbar-nav-link d-flex align-items-center dropdown-toggle"
                            data-toggle="dropdown"
                        >
                            <span className="text-truncate userFullName"> Tài</span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right notClose mt-0 border-0"
                            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                        >
                            <a href="/profile/index" className="dropdown-item">
                            <i className="far fa-user" /> Tài khoản (Giám đốc)
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="/profile/ui">
                            <i className="fal fa-cog" />
                            Cài đặt giao diện
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="/notification/index/setting">
                            <i className="fal fa-bell" />
                            Cài đặt nhận thông báo
                            </a>
                            <div className="dropdown-divider" />
                            <a href="/signout" className="dropdown-item text-danger btnSignout">
                            <i className="far fa-power-off" /> Đăng xuất
                            </a>
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