import React from 'react';

function TopDashboardProduct(props) {
    return (
        <div className="table-responsive overflow-hidden">
            <table
                id="topDashboardProduct"
                className="table text-nowrap table-md"
                data-hasblockrows={1}
            >
                <thead className="card-header">
                    <tr style={{ background: "#fff" }}>
                        <th className="text-left">
                            <h5 className="card-title font-weight-semibold">
                                <i className="far fa-cube mr-2" /> Top sản phẩm
                            </h5>
                        </th>
                        <th className="text-right">SL</th>
                        <th className="text-right">Tồn</th>
                        <th className="text-right">Doanh thu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <div className="col-md-12 text-info">Không có dữ liệu</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TopDashboardProduct;