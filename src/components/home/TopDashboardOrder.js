import React from 'react';
import { NumericFormat } from 'react-number-format';
import LoadingTable from '../global/LoadingTable';

function TopDashboardOrder(props) {
    const {items} = props;
    return (
        <div className="table-responsive">
            <table
                id="TopDashboardOrder"
                className="table text-nowrap"
            >
                <thead className="card-header">
                    <tr style={{ background: "#fff" }}>
                        <th className="text-left">
                            <h5 className="card-title font-weight-semibold">
                                <i className="far fa-shopping-cart mr-2" /> Đơn hàng
                            </h5>
                        </th>
                        <th> Ngày đặt </th>
                        <th className="text-right">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items ? items.map( (item,key) => (
                            <tr key={key}>
                                <td>{item.reference_no}</td>
                                <td>{item.created_at_format}</td>
                                <td className="text-right"><NumericFormat displayType="text" thousandSeparator="," value={item.grand_total} /></td>
                            </tr>
                        )) : <LoadingTable colSpan={3}/>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TopDashboardOrder;