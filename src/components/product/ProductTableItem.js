import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

function ProductTableItem(props) {
    let {the_key,item} = props
    return (
        <>
            <tr className='row-item' key={the_key}>
                <td className='select-checkbox'></td>
                <td className='dgColImagemanager text-center columnImg'>
                    <a class="icon fa fa-plus-circle text-success imageManager cursor-pointer"></a>
                </td>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.brand_name || ''}</td>
                <td>{item.category_name || ''}</td>
                <td>{item.qty}</td>
                <td>{item.unit_name}</td>
                <td>{item.price}</td>
                <td className='dgColAction text-center'>
                    <div className='dropdown'>
                        <a href='#' className='list-icons-item dropdown-toggle' data-toggle="dropdown">
                            <Icon fa='far fa-bars'/>
                        </a>
                        <div className='dropdown-menu dropdown-menu-right'>
                        <Link to={'/products/create/'+item.id} className='dropdown-item'><Icon fa='fal fa-pencil'/> Sửa sản phẩm</Link>
                            <Link className='dropdown-item text-danger js-del-item deleteBtn'><Icon fa='fal fa-trash'/> Xóa</Link>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default ProductTableItem;