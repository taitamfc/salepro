import React, { useEffect, useState } from 'react';
import LoadingTable from './LoadingTable';
import Icon from '../Icon';
import { Link } from 'react-router-dom';

function MyTable(props) {
    const {col_checkbox,col_action,headers,cols,loading,dropdownActions,enableEdit,enableDelete,base_link,col_active} = props;
    
    const [items, setItems] = useState(props.items);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    useEffect( () => {
        setItems(props.items);
    },[props.items] )

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(items.map(item => item.id));
        props.handleSelectProducts(items.map(item => item.id));
        if (isCheckAll) {
            setIsCheck([]);
            props.handleSelectProducts([]);
        }
    }
    const handleClick = e => {
        let { id, checked } = e.target;

        id = parseInt(id);
        isCheck.push(id);
        setIsCheck(isCheck);

        // Render items again
        setItems([...props.items]);
        props.handleSelectProducts(isCheck);

        // If checked => un check
        if (checked) {
          setIsCheck(isCheck.filter(item => item !== id));
          props.handleSelectProducts(isCheck.filter(item => item !== id));
        }

    }

    
    return (
        <table className='table table-tiny table-hover table-bordered dataTable stickyHeader'>
            <thead className="dgTh">
                <tr className={'text-center ' + ( isCheckAll ? 'selected' : '') }>
                    {
                        col_checkbox && (
                            <th 
                            onClick={handleSelectAll}
                            className={'select-checkbox dgCheckboxCheckAll '+ ( isCheckAll ? 'checked' : '' ) }></th>
                        )
                    }
                    {
                        headers.map( (header,key) => (
                            <th key={key}>{header}</th>
                        ) )
                    }
                    {
                        col_active && (
                            <th><i className="far fa-check"></i></th>
                        )
                    }
                    {
                        col_action && (
                            <th><i className="fal fa-cog"></i></th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    loading ? (
                        <LoadingTable colSpan={ cols.length + 2 }/>
                    ) : 
                    items.length ? items.map( (item,key) => (
                        <tr className={'row-item ' + ( isCheck.includes(item.id) ? 'selected' : '' ) } key={key}>
                            { 
                                col_checkbox && ( 
                                <td 
                                onClick={handleClick}
                                id={item.id}
                                checked={isCheck.includes(item.id)}
                                className='select-checkbox'></td> 
                                ) 
                            }
                            
                            {
                                cols.map( (col,key) => (
                                    <td key={key}>{item[col]}</td>
                                ))
                            }
                            {
                                col_active && (
                                    
                                    <td className='text-center'>
                                        { item['is_active'] ? 
                                            <i onClick={() => props.handleEnableDisable(item.id,0)} title='Nhấn vào để tắt' className="fal icon cursor-pointer fa-check text-success"></i>
                                            :
                                            <i onClick={() => props.handleEnableDisable(item.id,1)} title='Nhấn vào để bật' className="fal icon cursor-pointer fa-minus-circle text-danger"></i>
                                        }
                                    </td>
                                )
                            }
                            { col_action && (
                                <td className='dgColAction text-center'>
                                    <div className='dropdown'>
                                        <a href='#' className='list-icons-item dropdown-toggle' data-toggle="dropdown">
                                            <Icon fa='far fa-bars'/>
                                        </a>
                                        <div className='dropdown-menu dropdown-menu-right'>
                                            {
                                                dropdownActions.map( (action,key) => (
                                                    <Link key={key} to={action.to.replace('__ID__',item.id)} className='dropdown-item'><Icon fa={action.icon}/> {action.label}</Link>
                                                ))
                                            }
                                            { enableEdit && (
                                                <Link to={'/'+base_link + '/create/'+item.id} className='dropdown-item'><Icon fa='fal fa-pencil'/> Sửa</Link>
                                            )}
                                            { enableDelete && (
                                                <a onClick={() => props.handleDelete(item.id)} className='dropdown-item text-danger js-del-item deleteBtn'><Icon fa='fal fa-trash'/> Xóa</a>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            ) }
                            
                        </tr>
                    )) :
                    <LoadingTable colSpan={ cols.length + 2 } msg={'Không có dữ liệu'}/>
                }
            </tbody>
        </table>
    );
}

MyTable.defaultProps = {
    loading: false,
    col_checkbox: true,
    col_action: true,
    col_active: true,
    headers: ['Mã','Tên'],
    cols: ['id','name'],
    className: 'table table-tiny table-hover table-bordered dataTable stickyHeader',
    items: [],
    enableEdit: true,
    enableDelete: true,
    dropdownActions: [],
    handleSelectProducts: function(selected){}
}
export default MyTable;