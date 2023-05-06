import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import PurchaseModel from '../../models/PurchaseModel';
import { useNavigate } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import MyNumberFormat from '../global/MyNumberFormat';
const rules = Yup.object().shape({
    paying_amount: Yup.number().min(0,lang.required),
    amount: Yup.number().min(0,lang.required)
});
function AddPaymentForm(props) {
    let { id } = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        paying_amount: 0,
        amount: 0,
        payment_note: ''
    });

    const [products, setProducts] = useState([]);
    const [item, setItem] = useState({});
    const [paymentList, setPaymentList] = useState([]);
    const [reloadPaymentList, setReloadPaymentList] = useState(0);

    // contructor
    useEffect(() => {
        if (id) {
            PurchaseModel.find(id).then(res => {
                setFormData( {
                    ...formData,
                    amount: 0,
                    paying_amount: res.data.due,
                    payment_note: res.data.payment_note
                });

                setProducts( res.data.products );
                setItem( res.data );
            }).catch(err => { alert(err.message); });

            PurchaseModel.getPayments(id).then(res => {
                setPaymentList(res.data);
            }).catch(err => { alert(err.message); });
        }
    }, [reloadPaymentList]);

    const handleSubmit = (values) => {
        if (id) {
            const values = new FormData(document.getElementById('purchaseForm'));
            values.append('paying_amount',formData.paying_amount);

            if( values.get('paying_amount') == 0 ){
                alert('Đã thanh toán xong');
                return false;
            }
            if( values.get('amount') == 0 ){
                alert('Số tiền thanh toán phải lớn hơn 0');
                return false;
            }

            PurchaseModel.storePayment(id, values).then(res => {
                setReloadPaymentList(Math.random());
                alert(lang.saved)
            }).catch(err => { alert(err.message); });
        }
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={formData}
            validationSchema={rules}
            onSubmit={values => handleSubmit(values)}
        >
            {({ errors, touched }) => (
                <Form className='content p-2' id='purchaseForm'>
                    <div className='row mb-2'>
                        <div className='col-md-6'>
                            {/* Thông tin đơn hàng */}
                            <div className='card-header bg-light py-2 header-elements-inline'>
                                <div className='card-title font-weight-semibold'>
                                    <i className="fal fa-shopping-cart mr-2"></i>
                                    Thông tin đơn hàng
                                </div>
                            </div>
                            <table className='table table-bordered table-sm text-nowrap mb-2'>
                                <tbody>
                                    <tr>
                                        <td>Mã đơn hàng</td>
                                        <td>{item.reference_no}</td>
                                    </tr>
                                    <tr>
                                        <td>Nhà cung cấp</td>
                                        <td>{item.supplier_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đặt</td>
                                        <td>{item.created_at_format}</td>
                                    </tr>
                                    <tr>
                                        <td>Tổng tiền</td>
                                        <td>{item.grand_total_format}</td>
                                    </tr>
                                    <tr>
                                        <td>Đã trả</td>
                                        <td>{item.paid_amount_format}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Số tiền nợ */}
                            <div className='card p-2'>
                                <div className="mb-2">
                                    <label>Số tiền nợ</label>
                                    <NumericFormat thousandSeparator="," disabled name="paying_amount" className="form-control" value={formData.paying_amount}/>
                                    {errors.paying_amount && touched.paying_amount ? (
                                        <div className='validation-invalid-label'>{errors.paying_amount}</div>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <label>Số tiền trả</label>
                                    <NumericFormat thousandSeparator="," name="amount" className="form-control" value={formData.amount ?? 0}/>
                                    {errors.amount && touched.amount ? (
                                        <div className='validation-invalid-label'>{errors.amount}</div>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <label>Ghi chú</label>
                                    <Field as="textarea" name="payment_note" className="form-control" />
                                    {errors.payment_note && touched.payment_note ? (
                                        <div className='validation-invalid-label'>{errors.payment_note}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        
                        <div className='col-md-6'>
                            {/* Thông tin mua sắm */}
                            <div className='card-header bg-light py-2 header-elements-inline'>
                                <div className='card-title font-weight-semibold'>
                                    <i className="fal fa-shopping-cart mr-2"></i>
                                    Thông tin mua sắm
                                </div>
                            </div>
                            <table className='table table-bordered table-sm text-nowrap mb-2'>
                                <thead className=''>
                                    <tr className="bg-white">
                                        <th className="text-left">Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Giảm giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map( ( product,key ) => (
                                            <tr key={key}>
                                                <td>{product.name}</td>
                                                <td><MyNumberFormat value={product.price}/></td>
                                                <td><MyNumberFormat value={product.qty}/></td>
                                                <td>{product.discount}</td>
                                                <td><MyNumberFormat value={product.total}/></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            {/* Lịch sử thanh toán */}
                            <div className='card-header bg-light py-2 header-elements-inline'>
                                <div className='card-title font-weight-semibold'>
                                    <i className="fal fa-money-bill mr-2"></i>
                                    Lịch sử thanh toán
                                </div>
                            </div>
                            
                            <table className='table table-bordered table-sm text-nowrap mb-2'>
                                <thead className=''>
                                    <tr className="bg-white">
                                        <th className="text-left">Mã thanh toán</th>
                                        <th>Ngày thanh toán</th>
                                        <th>Số tiền</th>
                                        <th>Còn nợ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paymentList.map( ( payment,key ) => (
                                            <tr key={key}>
                                                <td>{payment.payment_reference}</td>
                                                <td>{payment.created_at}</td>
                                                <td><MyNumberFormat value={payment.amount}/></td>
                                                <td><MyNumberFormat value={payment.change}/></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <button type="submit" className="btn btn-success">
                                <Icon fa={'fal fa-save mr-2'} /> Lưu
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
AddPaymentForm.defaultProps = {
    id: 0
}
export default AddPaymentForm;