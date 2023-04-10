import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import lang from '../../lang/vi';
import CategoryModel from '../../models/CategoryModel';
import { useNavigate } from "react-router-dom";

function CategoryTableItem(props) {
    let navigate = useNavigate();

    let {the_key,item} = props
    const handleDelete = (id) => {
        let ask = window.confirm(lang.confirm_delete);
        if( ask ){
            CategoryModel.delete(id).then( res => {
                alert( lang.deleted )
                window.location.reload(false);
            }).catch( err => { alert(err.message); });
        }
    }
    return (
        <>
            <tr className='row-item' key={the_key}>
                <td className='select-checkbox'></td>
                <td className='dgColImagemanager text-center columnImg'>
                    <a class="icon fa fa-plus-circle text-success imageManager cursor-pointer"></a>
                </td>
                <td>{item.name}</td>
                <td>{item.product_count}</td>
                <td className='dgColAction text-center'>
                    <div className='dropdown'>
                        <a href='#' className='list-icons-item dropdown-toggle' data-toggle="dropdown">
                            <Icon fa='far fa-bars'/>
                        </a>
                        <div className='dropdown-menu dropdown-menu-right'>
                            <Link to={'/categories/create/'+item.id} className='dropdown-item'><Icon fa='fal fa-pencil'/> Sửa sản phẩm</Link>
                            <Link className='dropdown-item text-danger js-del-item deleteBtn' onClick={ () => handleDelete(item.id) }><Icon fa='fal fa-trash'/> Xóa</Link>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default CategoryTableItem;