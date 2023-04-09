import React from 'react';

function Table(props) {
    let {items,elmItem} = props
    return (
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
                            items.map( (item,key) => (
                                <elmItem key={key} the_key={key} item={item}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    );
}

export default Table;