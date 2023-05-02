import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import SaleModel from '../../models/SaleModel';
import { useNavigate } from "react-router-dom";

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
            SaleModel.find(id).then(res => {
                setFormData( {...formData,paying_amount: res.data.due} );
                setProducts( res.data.products );
                setItem( res.data );
            }).catch(err => { alert(err.message); });

            SaleModel.getPayments(id).then(res => {
                setPaymentList(res.data);
            }).catch(err => { alert(err.message); });
        }
    }, [reloadPaymentList]);

    const handleSubmit = (values) => {
        if (id) {
            SaleModel.storePayment(id, values).then(res => {
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
                <Form className='content p-2'>
                    <div className='row mb-2'>
                        <div className='col-md-6'>
                            <div className='card-header bg-light py-2 header-elements-inline'>
                                <div className='card-title font-weight-semibold'>
                                    <i className="fal fa-shopping-cart mr-2"></i>
                                    Thông tin đơn hàng
                                </div>
                            </div>
                            <table className='table table-bordered table-sm text-nowrap'>
                                <tbody>
                                    <tr>
                                        <td>Mã đơn hàng</td>
                                        <td>{item.reference_no}</td>
                                    </tr>
                                    <tr>
                                        <td>Khách hàng</td>
                                        <td>{item.customer_info}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đặt</td>
                                        <td>{item.created_at_format}</td>
                                    </tr>
                                    <tr>
                                        <td>Tổng tiền</td>
                                        <td>{item.grand_total}</td>
                                    </tr>
                                    <tr>
                                        <td>Đã trả</td>
                                        <td>{item.paid_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-6'>
                            <div className='card-header bg-light py-2 header-elements-inline'>
                                <div className='card-title font-weight-semibold'>
                                    <i className="fal fa-shopping-cart mr-2"></i>
                                    Thông tin mua sắm
                                </div>
                            </div>
                            <table className='table table-bordered table-sm text-nowrap'>
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
                                                <td>{product.price}</td>
                                                <td>{product.qty}</td>
                                                <td>{product.discount}</td>
                                                <td>{product.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card p-2'>
                                <div className="mb-2">
                                    <label>Số tiền nợ</label>
                                    <Field disabled name="paying_amount" className="form-control" />
                                    {errors.paying_amount && touched.paying_amount ? (
                                        <div className='validation-invalid-label'>{errors.paying_amount}</div>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <label>Số tiền trả</label>
                                    <Field name="amount" className="form-control" />
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
                            <div className='card-header bg-light py-2 header-elements-inline'>
                                <div className='card-title font-weight-semibold'>
                                    <i className="fal fa-money-bill mr-2"></i>
                                    Lịch sử thanh toán
                                </div>
                            </div>
                            
                            <table className='table table-bordered table-sm text-nowrap'>
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
                                                <td>{payment.amount}</td>
                                                <td>{payment.change}</td>
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