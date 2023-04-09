import React from 'react';

function Sidebar(props) {
    return (
        <div className="sidebar sidebar-dark sidebar-main sidebar-expand-xl d-xl-none">
            <div className="sidebar-content">
                <div className="card card-sidebar-mobile">
                    <ul className="nav nav-sidebar" data-nav-type="accordion">
                        <li className="nav-item">
                            <a href="/admin" className="nav-link active">
                                <i className="fal fa-tachometer-alt" />
                                <span>Tổng quan</span>
                            </a>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/product/item/index" className="nav-link ">
                                <i className="fal fa-cube" />
                                <span>Sản phẩm</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Sản phẩm"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Sản phẩm</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/product/item/index" className="nav-link ">
                                        <span>Sản phẩm</span>
                                    </a>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a
                                        href="/setting/store/ecommerceproduct"
                                        className="nav-link "
                                    >
                                        <span>Sàn TMĐT</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Sàn TMĐT"
                                    >
                                        <li className="nav-item">
                                            <a href="/ecommerce/lazada/product" className="nav-link ">
                                                <span>Lazada.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/shopee/product" className="nav-link ">
                                                <span>Shopee.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/tiktok/product" className="nav-link ">
                                                <span>TikTok.com</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/sendo/product" className="nav-link ">
                                                <span>Sendo.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/tiki/product" className="nav-link ">
                                                <span>Tiki.vn</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="/product/batch/index" className="nav-link ">
                                        <span>Lô sản phẩm</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/product/item/inventory" className="nav-link ">
                                        <span>Tồn kho</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/product/item/storagetime" className="nav-link ">
                                        <span>Thời gian lưu kho</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/category/index" className="nav-link ">
                                        <span>Danh mục</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/product/brand/index" className="nav-link ">
                                        <span>Thương hiệu</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/product/variant/index" className="nav-link ">
                                        <span>Thuộc tính</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/supplier/manage/index" className="nav-link ">
                                        <span>Nhà cung cấp</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/inventory/bill/index" className="nav-link ">
                                <i className="fal fa-exchange" />
                                <span>Kho hàng</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Kho hàng"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Kho hàng</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/bill/index" className="nav-link ">
                                        <span>Xuất nhập kho</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/transfer/index" className="nav-link ">
                                        <span>Chuyển kho</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/check/index" className="nav-link ">
                                        <span>Kiểm kho</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/requirement/bill" className="nav-link ">
                                        <span>Phiếu nháp</span>
                                    </a>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/pos/bill/addpackage" className="nav-link ">
                                        <span>Gói sản phẩm</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Gói sản phẩm"
                                    >
                                        <li className="nav-item">
                                            <a href="/pos/bill/addpackage" className="nav-link ">
                                                <span>Thêm gói sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/pos/bill/extractpackage" className="nav-link ">
                                                <span>Bung gói sản phẩm</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/archive/index" className="nav-link ">
                                        <span>Hạn mức tồn kho</span>
                                    </a>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/inventory/position/index" className="nav-link ">
                                        <span>Vị trí sản phẩm</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Vị trí sản phẩm"
                                    >
                                        <li className="nav-item">
                                            <a href="/inventory/position/index" className="nav-link ">
                                                <span>Vị trí sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/inventory/position/category"
                                                className="nav-link "
                                            >
                                                <span>Danh mục vị trí</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/inventory/position/bill" className="nav-link ">
                                                <span>Hóa đơn xuất nhập vị trí</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/inventory/position/imex" className="nav-link ">
                                                <span>Sản phẩm xuất nhập vị trí</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="/inventory/forecasting/movingaverage"
                                        className="nav-link "
                                    >
                                        <span>Dự báo nhập hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="/inventory/product/companyavailable"
                                        className="nav-link "
                                    >
                                        <span>Tổng công ty</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/product/damaged" className="nav-link ">
                                        <span>Hàng lỗi</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/inventory/log/imexbill" className="nav-link ">
                                        <span>Lịch sử sửa, xóa</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/pos/bill/index" className="nav-link ">
                                <i className="fal fa-shopping-bag" />
                                <span>Bán hàng</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Bán hàng"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Bán hàng</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/pos/bill/lookup" className="nav-link ">
                                        <span>Tìm hóa đơn</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/pos/bill/index" className="nav-link ">
                                        <span>Bán lẻ</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/pos/bill/wholesale" className="nav-link ">
                                        <span>Bán sỉ</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/pos/invoice/index" className="nav-link ">
                                        <span>Hóa đơn điện tử</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/pos/return/index" className="nav-link ">
                                        <span>Trả hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/pos/debt/bill" className="nav-link ">
                                        <span>Nợ quà tặng</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/order/manage/index" className="nav-link ">
                                <i className="fal fa-shopping-cart" />
                                <span>Đơn hàng</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Đơn hàng"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Đơn hàng</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/order/manage/index" className="nav-link ">
                                        <span>Đơn hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/order/manage/checkduplicate" className="nav-link ">
                                        <span>Đơn trùng</span>
                                    </a>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/setting/store/ecommerceorder" className="nav-link ">
                                        <span>Sàn TMĐT</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Sàn TMĐT"
                                    >
                                        <li className="nav-item">
                                            <a href="/ecommerce/lazada/order" className="nav-link ">
                                                <span>Lazada.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/shopee/order" className="nav-link ">
                                                <span>Shopee.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/tiktok/order" className="nav-link ">
                                                <span>TikTok.com</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/sendo/order" className="nav-link ">
                                                <span>Sendo.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/tiki/order" className="nav-link ">
                                                <span>Tiki.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/ecommerce/manage/index" className="nav-link ">
                                                <span>Đối soát COD</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/ecommerce/finance/dashboard" className="nav-link ">
                                        <span>Tài chính sàn TMĐT</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Tài chính sàn TMĐT"
                                    >
                                        <li className="nav-item">
                                            <a
                                                href="/ecommerce/finance/shopeedashboard"
                                                className="nav-link "
                                            >
                                                <span>Shopee.vn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/ecommerce/finance/tiktokdashboard"
                                                className="nav-link "
                                            >
                                                <span>TikTok.com</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/ecommerce/finance/lazadadashboard"
                                                className="nav-link "
                                            >
                                                <span>Lazada.vn</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="/order/manage/packing" className="nav-link ">
                                        <span>Đóng gói</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/shipping/handover/index" className="nav-link ">
                                        <span>Biên bản bàn giao</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/order/manage/sendingcarrier" className="nav-link ">
                                        <span>Chờ gửi vận chuyển</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/order/manage/complain" className="nav-link ">
                                        <span>Khiếu nại</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/order/manage/deleted" className="nav-link ">
                                        <span>Đơn đã xóa</span>
                                    </a>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/order/payment/index" className="nav-link ">
                                        <span>Đối soát</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Đối soát"
                                    >
                                        <li className="nav-item">
                                            <a href="/order/payment/index" className="nav-link ">
                                                <span>Thanh toán COD</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/order/manage/payment" className="nav-link ">
                                                <span>Đối soát tự vận chuyển</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/traffic/source" className="nav-link ">
                                        <span>Nguồn đơn hàng</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/customer/code/customerlist" className="nav-link ">
                                <i className="fal fa-user" />
                                <span>Khách hàng</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Khách hàng"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Khách hàng</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/code/customerlist" className="nav-link ">
                                        <span>Khách hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/code/index" className="nav-link ">
                                        <span>Thẻ khách hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/care/index" className="nav-link ">
                                        <span>Chăm sóc khách hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/store/level" className="nav-link ">
                                        <span>Cấp độ</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/group/index" className="nav-link ">
                                        <span>Nhóm khách hàng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/type/index" className="nav-link ">
                                        <span>Hình thức chăm sóc</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/customer/reason/index" className="nav-link ">
                                        <span>Lý do chăm sóc</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/report/dashboard/default" className="nav-link ">
                                <i className="fal fa-chart-bar" />
                                <span>Báo cáo</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Báo cáo"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Báo cáo</span>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/revenue/switch" className="nav-link ">
                                        <span>Doanh thu</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Doanh thu"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/revenue/dashboard" className="nav-link ">
                                                <span>Tổng quan</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/growth" className="nav-link ">
                                                <span>Tăng trưởng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/index" className="nav-link ">
                                                <span>Theo thời gian</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/depot" className="nav-link ">
                                                <span>Theo cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/category" className="nav-link ">
                                                <span>Theo danh mục sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/revenue/internalcategory"
                                                className="nav-link "
                                            >
                                                <span>Theo danh mục nội bộ</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/brand" className="nav-link ">
                                                <span>Theo thương hiệu</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/staff" className="nav-link ">
                                                <span>Theo nhân viên</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/product" className="nav-link ">
                                                <span>Theo sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/supplier" className="nav-link ">
                                                <span>Theo nhà cung cấp</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/revenue/customer" className="nav-link ">
                                                <span>Theo khách hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/revenue/inventoryrate"
                                                className="nav-link "
                                            >
                                                <span>Tỉ suất doanh thu/tồn kho</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/order/switch" className="nav-link ">
                                        <span>Đơn hàng</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Đơn hàng"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/order/dashboard" className="nav-link ">
                                                <span>Tổng quan</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/growth" className="nav-link ">
                                                <span>Tăng trưởng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/salechannel" className="nav-link ">
                                                <span>Theo kênh bán</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/index" className="nav-link ">
                                                <span>Đơn tạo</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/success" className="nav-link ">
                                                <span>Đơn thành công</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/value" className="nav-link ">
                                                <span>Theo giá trị đơn hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/category" className="nav-link ">
                                                <span>Theo danh mục sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/product" className="nav-link ">
                                                <span>Theo sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/status" className="nav-link ">
                                                <span>Theo trạng thái</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/location" className="nav-link ">
                                                <span>Theo địa chỉ</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/cancel" className="nav-link ">
                                                <span>Lý do khách hủy</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/create" className="nav-link ">
                                                <span>Nhân viên xử lý</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/utm" className="nav-link ">
                                                <span>Theo quảng cáo</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/order/verifyandtransfer"
                                                className="nav-link "
                                            >
                                                <span>Tiền đối soát</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/order/carrier" className="nav-link ">
                                                <span>Theo hãng vận chuyển</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/retail/switch" className="nav-link ">
                                        <span>Bán lẻ</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Bán lẻ"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/retail/index" className="nav-link ">
                                                <span>Tổng quan</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/retail/cashier" className="nav-link ">
                                                <span>Theo nhân viên</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/retail/depot" className="nav-link ">
                                                <span>Theo cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/retail/creditmoney"
                                                className="nav-link "
                                            >
                                                <span>Chi tiết quẹt thẻ</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/retail/billvalue" className="nav-link ">
                                                <span>Theo giá trị hóa đơn</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/retail/trafficsource"
                                                className="nav-link "
                                            >
                                                <span>Theo nguồn khách hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/retail/customerbillrate"
                                                className="nav-link "
                                            >
                                                <span>Báo cáo tỷ lệ hóa đơn/ khách vào cửa hàng</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/wholesale/switch" className="nav-link ">
                                        <span>Bán sỉ</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Bán sỉ"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/wholesale/index" className="nav-link ">
                                                <span>Tổng quan</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/wholesale/storesale"
                                                className="nav-link "
                                            >
                                                <span>Theo nhân viên bán hàng</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/inventory/switch" className="nav-link ">
                                        <span>Tồn kho</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Tồn kho"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/inventory/index" className="nav-link ">
                                                <span>Xuất nhập tồn theo sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/inventory/imex" className="nav-link ">
                                                <span>Chi tiết số lượng sản phẩm theo kiểu XNK</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/imextotal"
                                                className="nav-link "
                                            >
                                                <span>Tổng XNK</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/imexdepot"
                                                className="nav-link "
                                            >
                                                <span>Tổng XNK theo cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/supplier2"
                                                className="nav-link "
                                            >
                                                <span>Theo nhà cung cấp</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/category"
                                                className="nav-link "
                                            >
                                                <span>Danh mục sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/eachdepot"
                                                className="nav-link "
                                            >
                                                <span>Số lượng hàng tồn kho</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/transfer"
                                                className="nav-link "
                                            >
                                                <span>Chuyển kho chưa xác nhận</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/depotinventorystatus"
                                                className="nav-link "
                                            >
                                                <span>Theo trạng thái từng cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/productinventorystatus"
                                                className="nav-link "
                                            >
                                                <span>Theo trạng thái từng sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/inventory/productbatchs"
                                                className="nav-link "
                                            >
                                                <span>Theo lô hàng</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/product/switch" className="nav-link ">
                                        <span>Sản phẩm</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Sản phẩm"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/product/index" className="nav-link ">
                                                <span>Bán chạy nhất</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/product/depot" className="nav-link ">
                                                <span>Bán chạy theo cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/product/salespeed" className="nav-link ">
                                                <span>Tốc độ bán hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/product/categorydetail"
                                                className="nav-link "
                                            >
                                                <span>Số lượng bán ra theo danh mục và cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/product/value" className="nav-link ">
                                                <span>Theo khoảng giá</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/product/date" className="nav-link ">
                                                <span>Theo ngày</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/product/salebyimei"
                                                className="nav-link "
                                            >
                                                <span>Bán hàng theo IMEI</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/product/attribute" className="nav-link ">
                                                <span>Theo thuộc tính</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/customer/switch" className="nav-link ">
                                        <span>Khách hàng</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Khách hàng"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/customer/index" className="nav-link ">
                                                <span>Tổng quan</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/customer/level" className="nav-link ">
                                                <span>Cấp độ khách hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/customer/group" className="nav-link ">
                                                <span>Nhóm khách hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/customer/product" className="nav-link ">
                                                <span>Theo sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/customer/createnew"
                                                className="nav-link "
                                            >
                                                <span>Lượng khách hàng tạo mới, tạo thẻ theo kho</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/report/customer/birthday" className="nav-link ">
                                                <span>Sinh nhật khách hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/customer/frequencybought"
                                                className="nav-link "
                                            >
                                                <span>Báo cáo chu kỳ mua hàng</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/promotion/switch" className="nav-link ">
                                        <span>Khuyến mại</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Khuyến mại"
                                    >
                                        <li className="nav-item">
                                            <a
                                                href="/report/promotion/discountrate"
                                                className="nav-link "
                                            >
                                                <span>Tỉ lệ với doanh thu</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/promotion/productdiscountrate"
                                                className="nav-link "
                                            >
                                                <span>Khuyến mại theo sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/promotion/productgift"
                                                className="nav-link "
                                            >
                                                <span>Quà tặng theo sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/promotion/bonusbydepot"
                                                className="nav-link "
                                            >
                                                <span>Quà tặng theo cửa hàng</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="/report/promotion/pricelist"
                                                className="nav-link "
                                            >
                                                <span>Doanh thu theo bảng giá</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-item-submenu">
                                    <a href="/report/zalo/historydate" className="nav-link ">
                                        <span>Zalo</span>
                                    </a>
                                    <ul
                                        className="nav nav-group-sub overflow-auto "
                                        data-submenu-title="Zalo"
                                    >
                                        <li className="nav-item">
                                            <a href="/report/zalo/historydate" className="nav-link ">
                                                <span>Số lượng tin gửi</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/website/content/index" className="nav-link ">
                                <i className="fal fa-browser" />
                                <span>Website</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Website"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Website</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/website/content/tags" className="nav-link ">
                                        <span>Tag</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/website/album/index" className="nav-link ">
                                        <span>Album</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/website/redirectlink/index" className="nav-link ">
                                        <span>Link điều hướng</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/promotion/setting/discount" className="nav-link ">
                                <i className="fal fa-gift" />
                                <span>Khuyến mại</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Khuyến mại"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Khuyến mại</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/promotion/setting/discount" className="nav-link ">
                                        <span>Chiết khấu</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/promotion/setting/pricelist" className="nav-link ">
                                        <span>Thiết lập bảng giá</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/promotion/setting/point" className="nav-link ">
                                        <span>Tích điểm</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/promotion/setting/coupon" className="nav-link ">
                                        <span>Coupon</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/promotion/setting/gift" className="nav-link ">
                                        <span>Quà tặng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/promotion/setting/commission" className="nav-link ">
                                        <span>Hoa hồng bán hàng</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item nav-item-submenu">
                            <a href="/setting/store/index" className="nav-link ">
                                <i className="fal fa-cog" />
                                <span>Cài đặt</span>
                            </a>
                            <ul
                                className="nav nav-group-sub overflow-auto "
                                data-submenu-title="Cài đặt"
                            >
                                <li className="nav-item child-page-label d-lg-block d-none text-uppercase font-weight-semibold text-left">
                                    <span className="nav-link">Cài đặt</span>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/user/index" className="nav-link ">
                                        <span>Nhân viên</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/store/index" className="nav-link ">
                                        <span>Cài đặt chung</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/store/sale" className="nav-link ">
                                        <span>Bán hàng và XNK</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/invoice/index" className="nav-link ">
                                        <span>Hóa đơn điện tử</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/order/index" className="nav-link ">
                                        <span>Đơn hàng và vận chuyển</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/store/labels" className="nav-link ">
                                        <span>Cài đặt nhãn</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/template/design" className="nav-link ">
                                        <span>Mẫu in</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/email/index" className="nav-link ">
                                        <span>Gửi email</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/sms/index" className="nav-link ">
                                        <span>Gửi SMS</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/zalo/index" className="nav-link ">
                                        <span>Gửi Zalo</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/setting/payment/index" className="nav-link ">
                                        <span>Cổng thanh toán</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/branch/index" className="nav-link ">
                                        <span>Chi nhánh</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/agency/index" className="nav-link ">
                                        <span>Đại lý</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/ecommerce/manage/setting" className="nav-link ">
                                        <span>Đồng bộ sàn TMĐT</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/store/setting/expire" className="nav-link ">
                                        <span>Hạn sử dụng</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item d-block d-xl-none">
                            <a
                                href="https://dangky.nhanh.vn/vay-von-VPBank?utm_source=admin&utm_medium=click"
                                target="_blank"
                                className="nav-link"
                            >
                                <i className="fal fa-lg fa-usd-circle" />
                                Đăng ký vay vốn VPbank
                            </a>
                        </li>
                        <li className="align-items-center d-none d-md-flex position-relative">
                            <a
                                href="javascript:"
                                className="bg-transparent sidebar-control sidebar-main-toggle d-none d-md-inline-block text-white"
                                id="showHideMainMenu"
                                title="Ẩn / Hiện menu trái"
                                style={{ padding: ".71rem 1.25rem" }}
                            >
                                <i
                                    className="fal fa-chevron-circle-left"
                                    style={{ background: "" }}
                                />
                            </a>
                            <hr
                                id="sidebar-left-border"
                                className="position-absolute m-auto top-0 bottom-0 w-100"
                            />
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Sidebar;