import React, { useEffect, useState } from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import ReportModel from '../../models/ReportModel';
import HomePageHeader from '../../components/home/HomePageHeader';
import { useSelector } from 'react-redux';

function ReportProfitLoss(props) {
    const filter_home = useSelector(state => state.filter_home);
    const [item, setItem] = useState({
        purchase: {},
        sale: {},
        purchase_return: {},
        sale_return: {},
        due: {},
        profix: {},
    });
    useEffect(() => {
        ReportModel.profitLoss(filter_home).then(res => {
            setItem(res);
        }).catch(err => { alert(err.message); });
    }, [filter_home]);
    return (
        <MasterLayout>
            {/* <div className='page-header'>
                <Breadcrumb pageName='Báo cáo tổng quan' parentName='Báo cáo' parentLink='report/profit-loss' />
            </div> */}
            <HomePageHeader pageName={'Trang báo cáo'}/>
            <div className='content p-0'>
                <div className='d-flex flex-wrap'>
                    <div className="col-12 col-md-3">
                        <div className="card p-0">
                            <div className="card-header header-elements-inline bg-light py-2">
                                <h5 className="card-title font-weight-semibold">Tổng nhập hàng</h5>
                            </div>
                            <table className="table table-borderless table-xs mt-1 mb-1 font-weight-semibold" >
                                <tbody>
                                    <tr>
                                        <td className="">Tổng tiền</td>
                                        <td className="text-right">{item.purchase.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Tổng SL mua</td>
                                        <td className="text-right">{item.purchase.total_purchase}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Tổng thanh toán</td>
                                        <td className="text-right">{item.purchase.paid_amount}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Giảm giá</td>
                                        <td className="text-right">{item.purchase.discount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="card p-0">
                            <div className="card-header header-elements-inline bg-light py-2">
                                <h5 className="card-title font-weight-semibold">Tổng bán hàng</h5>
                            </div>
                            <table className="table table-borderless table-xs mt-1 mb-1 font-weight-semibold" >
                                <tbody>
                                    <tr>
                                        <td className="">Tổng tiền</td>
                                        <td className="text-right">{item.sale.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Tổng SL bán</td>
                                        <td className="text-right">{item.sale.total_sale}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Tổng thanh toán</td>
                                        <td className="text-right">{item.sale.paid_amount}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Giảm giá</td>
                                        <td className="text-right">{item.sale.discount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card p-0">
                            <div className="card-header header-elements-inline bg-light py-2">
                                <h5 className="card-title font-weight-semibold">Lợi nhuận</h5>
                            </div>
                            <table className="table table-borderless table-xs mt-1 mb-1 font-weight-semibold" >
                                <tbody>
                                    <tr>
                                        <td className="">Bán hàng</td>
                                        <td className="text-right">{item.sale.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Nhập hàng</td>
                                        <td className="text-right">{item.purchase.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Lợi nhuận (bán - nhập)</td>
                                        <td className="text-right">{item.profix.before}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Lợi nhuận (bán - nhập - trả nhập + trả mua)</td>
                                        <td className="text-right">{item.profix.after}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card p-0">
                            <div className="card-header header-elements-inline bg-light py-2">
                                <h5 className="card-title font-weight-semibold">Tổng trả hàng nhập</h5>
                            </div>
                            <table className="table table-borderless table-xs mt-1 mb-1 font-weight-semibold" >
                                <tbody>
                                    <tr>
                                        <td className="">Tổng tiền</td>
                                        <td className="text-right">{item.purchase_return.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Số lượng</td>
                                        <td className="text-right">{item.purchase_return.total_purchase_return}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card p-0">
                            <div className="card-header header-elements-inline bg-light py-2">
                                <h5 className="card-title font-weight-semibold">Tổng trả hàng từ khách</h5>
                            </div>
                            <table className="table table-borderless table-xs mt-1 mb-1 font-weight-semibold" >
                                <tbody>
                                <tr>
                                        <td className="">Tổng tiền</td>
                                        <td className="text-right">{item.sale_return.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Số lượng</td>
                                        <td className="text-right">{item.sale_return.total_sale_return}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card p-0">
                            <div className="card-header header-elements-inline bg-light py-2">
                                <h5 className="card-title font-weight-semibold">Công nợ</h5>
                            </div>
                            <table className="table table-borderless table-xs mt-1 mb-1 font-weight-semibold" >
                                <tbody>
                                    <tr>
                                        <td className="">Công nợ bán hàng</td>
                                        <td className="text-right">{item.due.due_sale}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Công nợ nhập hàng</td>
                                        <td className="text-right">{item.due.due_purchase}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default ReportProfitLoss;