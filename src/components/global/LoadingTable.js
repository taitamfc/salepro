import React from 'react';

function LoadingTable(props) {
    return (
        <tr>
            <td colSpan={props.colSpan} style={{textAlign:'center'}} > Đang tải dữ liệu </td>
        </tr>
    );
}

LoadingTable.defaultProps = {
    colSpan: 10
}

export default LoadingTable;