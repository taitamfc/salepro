import React from 'react';

function LoadingTable(props) {
    return (
        <tr>
            <td colSpan={props.colSpan} style={{textAlign:'center'}} > {props.msg} </td>
        </tr>
    );
}

LoadingTable.defaultProps = {
    colSpan: 10,
    msg: 'Đang tải dữ liệu',
}

export default LoadingTable;