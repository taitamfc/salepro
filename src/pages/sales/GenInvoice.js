import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SaleModel from '../../models/SaleModel';

import './../../print.css'
import MyNumberFormat from '../../components/global/MyNumberFormat';
import GeneralSettingModel from '../../models/GeneralSettingModel';

function GenInvoice(props) {
    const { id = 0 } = useParams();
    const [item, setItem] = useState({});
    const [siteSetting, setSiteSetting] = useState({});
    const [products, setProducts] = useState([]);

    const [totalQty,setTotalQty] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalPricePromo,setTotalPricePromo] = useState(0);
    const [totalSubTotal,setTotalSubTotal] = useState();
    const [totalGrandTotal,setTotalGrandTotal] = useState();
    const [shippingCost,setShippingCost] = useState(0);
    // contructor
    useEffect(() => {
        GeneralSettingModel.all().then( res => {
            setSiteSetting(res);
        })
        if (id) {
            SaleModel.find(id).then(res => {
                setItem(res.data);
                setTotalGrandTotal(res.data.grand_total);
                let shipping_cost = res.data.shipping_cost ?? 0;
                setShippingCost(shipping_cost);
                caculateTotalAndSetProducts(res.data.products,shipping_cost);
            }).catch(err => {  });
        }
    }, []);
    const caculateTotalAndSetProducts = (the_products , shipping_cost = 0) => {
        let t_totalQty = 0;
        let t_totalPrice = 0;
        let t_totalPromotionPrice = 0;
        let t_totalSubTotal = 0;
        let t_totalGrandTotal = 0;
        for (const product of the_products) {
            product.cr_qty = product.cr_qty ? product.cr_qty : 1;
            product.cr_price = product.cr_price ? product.cr_price : product.price;
            product.cr_promotion_price = product.cr_promotion_price ? product.cr_promotion_price : 0;
            
            t_totalQty += parseInt(product.cr_qty);
            t_totalPrice += parseFloat(product.cr_price);
            t_totalPromotionPrice += parseFloat(product.cr_promotion_price);
            t_totalSubTotal += ( parseFloat(product.cr_price) - parseFloat(product.cr_promotion_price) ) * product.cr_qty;
        }
        t_totalGrandTotal = t_totalSubTotal + parseFloat(shipping_cost);
        console.log(t_totalSubTotal);
        console.log(shipping_cost);
        console.log(t_totalGrandTotal);
        setTotalQty(t_totalQty);
        setTotalPrice(t_totalPrice);
        setTotalPricePromo(t_totalPromotionPrice);
        setTotalSubTotal(t_totalSubTotal);
        
        setProducts(the_products);
    }

    const handlePrint = () => {
        window.print();
    }

    return (
        <div className='printPage'>
            <div id='headerPrint' className='text-center'>
                <Link to={'/sales'} className='btn btn-md bg-dark mr-2'>Quay lại</Link>
                <Link className='btn btn-md bg-success' onClick={ handlePrint }>Tiến hành in hóa đơn</Link>
            </div>
            <div className="printWrapper">
                <div className="printBody">
                    <div className="printHeader">
                        <h4>{siteSetting.site_title}</h4>
                    </div>
                    <div className="printCompanyInfo">
                        <p>
                            <b>Điện thoại:</b> {siteSetting.site_phone}
                        </p>
                        <p>
                            <b>Địa chỉ:</b> {siteSetting.site_address}
                        </p>
                    </div>
                    <div className="printTitle">
                        <h4>Hóa đơn bán hàng</h4>
                    </div>
                    <br />
                    <table className="prlist">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Mã</th>
                                <th>SL</th>
                                <th>Giá</th>
                                <th>Giảm giá</th>
                                <th>Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product,key) => {
                                    let sub_total = ( product.cr_price - product.cr_promotion_price ) * product.cr_qty;
                                    return (
                                        <tr>
                                            <td>{product.name}</td>
                                            <td>{product.code}</td>
                                            <td>{product.cr_qty}</td>
                                            <td><MyNumberFormat value={product.cr_price}/></td>
                                            <td><MyNumberFormat value={product.cr_promotion_price}/></td>
                                            <td><MyNumberFormat value={sub_total}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th><MyNumberFormat value={totalQty}/></th>
                                <th><MyNumberFormat value={totalPrice}/></th>
                                <th><MyNumberFormat value={totalPricePromo}/></th>
                                <th><MyNumberFormat value={totalSubTotal}/></th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Chi phí vận chuyển</th>
                                <th><MyNumberFormat value={shippingCost}/></th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Tổng tiền</th>
                                <th><MyNumberFormat value={totalGrandTotal}/></th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Đã trả</th>
                                <th><MyNumberFormat value={item.paid_amount}/></th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Nợ</th>
                                <th><MyNumberFormat value={totalGrandTotal - item.paid_amount}/></th>
                            </tr>
                        </tfoot>
                    </table>
                    <br />
                    <div className="printNote">
                        {item.sale_note}
                    </div>
                    <div>
                        <p>
                            <b>Ngày:</b> {item.created_at_format}
                        </p>
                        <p>
                            <b>Khách hàng:</b> {item.customer_info}
                        </p>
                    </div>
                    <div className="printFoot">
                        <h4>Cám ơn quý khách đã mua hàng!</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenInvoice;