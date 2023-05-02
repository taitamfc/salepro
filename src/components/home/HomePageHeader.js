import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_FILTER_HOME } from '../../redux/action';
import WarehouseModel from '../../models/WarehouseModel';

function HomePageHeader(props) {
    const dispatch = useDispatch();
    const [dayLabel,setDayLabel] = useState('Tháng này');
    const [dayValue,setDayValue] = useState('thismonth');
    const [warehouseLabel,setWarehouseLabel] = useState('Tất cả');
    const [warehouseId,setWarehouseId] = useState(0);
    const [warehouses,setWarehouses] = useState([]);
    useEffect( () => {
        WarehouseModel.all({onlyActive:true}).then( res => {
            setWarehouses(res.data);
        })
    }, []);
    const handleChangeFilter = (dayValue,dayLabel) => {
        setDayLabel(dayLabel);
        dispatch({ type: SET_FILTER_HOME, payload: {
            dateFilter: dayValue,
            warehouseId: warehouseId
        }});
    }
    const handleChangeWarehouse = (warehouseId,warehouseName) => {
        setWarehouseId(warehouseId);
        setWarehouseLabel(warehouseName);
        dispatch({ type: SET_FILTER_HOME, payload: {
            dateFilter: dayValue,
            warehouseId: warehouseId
        }});
    }
    
    return (
        <div className="page-header">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4>
                        <i className="fal fa-tachometer-alt mr-2" />
                        <span className="font-weight-semibold">Trang tổng quan ({dayLabel})</span>
                    </h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none">
                        <i className="fas fa-ellipsis-v" />
                    </a>
                </div>
                <div className="header-elements d-none text-center text-md-left mb-3 mb-md-0">
                    <div id="dashBoardDateRangeOption" className="btn-group" role="group">
                        <button
                            type="button"
                            className="btn dropdown-toggle bg-teal-400"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa fa-calendar-alt mr-2" />
                            <span className="dateValue">{dayLabel}</span>
                        </button>
                        <ul
                            className="dropdown-menu dropdown-menu-right"
                            x-placement="bottom-end"
                        >
                            <li>
                                <a onClick={()=>handleChangeFilter('today','Hôm nay')} className="dropdown-item">
                                    <i className="fal fa-calendar-check" /> Hôm nay
                                </a>
                            </li>
                            <li>
                                <a onClick={()=>handleChangeFilter('yesterday','Hôm qua')} className="dropdown-item">
                                    <i className="fal fa-calendar-day" /> Hôm qua
                                </a>
                            </li>
                            <li>
                                <a onClick={()=>handleChangeFilter('thisweek','Tuần này')} className="dropdown-item">
                                    <i className="fal fa-calendar-week" /> Tuần này
                                </a>
                            </li>
                            <li>
                                <a onClick={()=>handleChangeFilter('thismonth','Tháng này')} className="dropdown-item">
                                    <i className="fal fa-calendar-week" /> Tháng này
                                </a>
                            </li>
                            <li>
                                <a onClick={()=>handleChangeFilter('lastmonth','Tháng trước')} className="dropdown-item">
                                    <i className="fal fa-calendar-alt" /> Tháng trước
                                </a>
                            </li>
                        </ul>
                    </div>
                    <input type="hidden" id="storeId" defaultValue={150421} />
                    <div
                        id="depotOptions"
                        className="btn-group ml-2 mt-2 mt-sm-0"
                        role="group"
                    >
                        <button
                            id=""
                            type="button"
                            className="btn dropdown-toggle bg-teal-400"
                            data-toggle="dropdown"
                        >
                            <i className="fal fa-map-marker-alt mr-2" />
                            <span className="depotValue">{warehouseLabel}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right" >
                            <li>
                                <a onClick={()=>handleChangeWarehouse(0,'Tất cả')} className="dropdown-item">
                                    Tất cả cửa hàng
                                </a>
                            </li>
                            {
                                warehouses.map( (warehouse) => (
                                    <li>
                                        <a onClick={()=>handleChangeWarehouse(warehouse.id,warehouse.name)} className="dropdown-item">
                                            {warehouse.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <input type="hidden" id="depotId" defaultValue="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageHeader;