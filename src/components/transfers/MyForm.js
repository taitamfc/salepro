import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import WarehouseModel from '../../models/WarehouseModel';
import MyProductFinding from '../global/MyProductFinding';
import ProductModel from '../../models/ProductModel';
import TransferModel from '../../models/TransferModel';
import { SET_WAREHOUSE_ID } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import MyNumberFormat from '../global/MyNumberFormat';

const rules = Yup.object().shape({
    from_warehouse_id: Yup.number().min(1,lang.required),
    to_warehouse_id: Yup.number().moreThan(Yup.ref("from_warehouse_id"),lang.to_warehouse_compare).min(1,lang.required),
});
function MyForm(props) {
    let { id } = props;
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const store_warehouse_id = useSelector(state => state.warehouse_id);

    const [formData, setFormData] = useState({
        from_warehouse_id:0,
        to_warehouse_id:0,
        paid_amount: 0,
        grand_total: 0,
        warehouse_id: 0,
        shipping_cost: 0,
        status: 1,
        note:''
    });
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [totalQty,setTotalQty] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalPricePromo,setTotalPricePromo] = useState(0);
    const [totalSubTotal,setTotalSubTotal] = useState(0);

    // contructor
    useEffect(() => {
        WarehouseModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setWarehouses(res.data);
        }).catch(err => { alert(err.message); });
     

        if (id) {
            TransferModel.find(id).then(res => {
                setFormData(res.data);
                dispatch({ type: SET_WAREHOUSE_ID, payload: res.data.from_warehouse_id });
                caculateTotalAndSetProducts(res.data.products);
            }).catch(err => { alert(err.message); });
        }
    }, []);



    const handleSelectProducts = (product_ids) => {
        setProducts([]);
        ProductModel.all({ product_ids: product_ids.join(), warehouse_id: store_warehouse_id }).then( res => {
            caculateTotalAndSetProducts(res.data);
        }).catch( err => { alert(err.message); });
    }

    const handleSubmit = () => {
        const values = new FormData(document.getElementById('purchaseForm'));
        if( !values.get('product_id') ){
            alert('Vui lòng chọn ít nhất 1 sản phẩm');
            return false;
        }
        if( values.get('from_warehouse_id') == values.get('to_warehouse_id') ){
            alert('Kho nguồn phải khác kho đích');
            return false;
        }
        values.set('grand_total',totalSubTotal + parseFloat(values.get('shipping_cost')));
        if (id) {
            TransferModel.update(id, values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/transfers')
                } else {
                    alert(res.msg)
                }
            }).catch(err => { console.log(err.message); });
        } else {
            
            TransferModel.store(values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/transfers')
                } else {
                    alert(res.msg)
                }
            }).catch(err => { console.log(err.message); });
        }
    }
    

    const handleInputChange = (e,id,type) => {
        let the_value = e.floatValue;
        if( typeof the_value == 'undefined' ){
            the_value = 0;
        }
        console.log(the_value);
        for (const product of products) {
            if( product.id == id ){
                switch (type) {
                    case 'qty':
                        product.cr_qty = the_value;
                        break;
                    case 'price':
                        product.cr_price = the_value;
                        break;
                    case 'promotion_price':
                        product.cr_promotion_price = the_value;
                        break;
                    default:
                        break;
                }
            }
        }
        caculateTotalAndSetProducts(products);
    }

    const caculateTotalAndSetProducts = (the_products) => {
        let t_totalQty = 0;
        let t_totalPrice = 0;
        let t_totalPromotionPrice = 0;
        let t_totalSubTotal = 0;
        for (const product of the_products) {
            product.cr_qty = typeof product.cr_qty != 'undefined' ? product.cr_qty : product.qty;
            product.cr_price = typeof product.cr_price != 'undefined' ? product.cr_price : product.price;
            product.cr_promotion_price = typeof product.cr_promotion_price != 'undefined' ? product.cr_promotion_price : 0;

            t_totalQty += parseInt(product.cr_qty);
            t_totalPrice += parseFloat(product.cr_price);
            t_totalPromotionPrice += parseFloat(product.cr_promotion_price);
            t_totalSubTotal += ( parseFloat(product.cr_price) - parseFloat(product.cr_promotion_price) ) * product.cr_qty;
        }
        setTotalQty(t_totalQty);
        setTotalPrice(t_totalPrice);
        setTotalPricePromo(t_totalPromotionPrice);
        setTotalSubTotal(t_totalSubTotal);
        setProducts(the_products);
    }

    const handleFormChange = (e) => {
        if(e.target.name == 'from_warehouse_id'){
            dispatch({ type: SET_WAREHOUSE_ID, payload: e.target.value });
            setProducts([]);
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
                <Form className='card p-3' id='purchaseForm' onChange={handleFormChange} >
                    {/* <Field type='hidden' name="type"/> */}
                    <div className="row">
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Từ kho hàng * </label>
                                <Field as="select" name="from_warehouse_id" className="form-control" required>
                                    <option value="0">Vui lòng chọn</option>
                                    {
                                        warehouses.map((warehouse, key) => (
                                            <option key={key} value={warehouse.id}>{warehouse.name}</option>
                                        ))
                                    }
                                </Field>
                                {errors.from_warehouse_id && touched.from_warehouse_id ? (
                                    <div className='validation-invalid-label'>{errors.from_warehouse_id}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Đến kho hàng * </label>
                                <Field as="select" name="to_warehouse_id" className="form-control" required>
                                    <option value="0">Vui lòng chọn</option>
                                    {
                                        warehouses.map((warehouse, key) => (
                                            <option key={key} value={warehouse.id}>{warehouse.name}</option>
                                        ))
                                    }
                                </Field>
                                {errors.to_warehouse_id && touched.to_warehouse_id ? (
                                    <div className='validation-invalid-label'>{errors.to_warehouse_id}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Ghi chú</label>
                                <Field as="textarea" name="note" className="form-control"></Field>
                                {errors.note && touched.note ? (
                                    <div className='validation-invalid-label'>{errors.note}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Phí vận chuyển</label>
                                <NumericFormat thousandSeparator="," name="shipping_cost" value={formData.shipping_cost} className="form-control"/>
                                {errors.shipping_cost && touched.shipping_cost ? (
                                    <div className='validation-invalid-label'>{errors.shipping_cost}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Trạng thái</label>
                                <Field name="status" as="select" className="form-control">
                                    <option value="1">Completed</option>
                                    <option value="2">Pending</option>
                                    <option value="3">Sent</option>
                                </Field>
                                
                            </div>
                            
                        </div>
                        <div className="col-md-12">
                            <label>Danh sách sản phẩm</label>
                            <div className='card'>
                                { store_warehouse_id > 0 ? (
                                    <>
                                        <MyProductFinding handleSelectProducts={handleSelectProducts}/>
                                    </>
                                ) : (
                                    <div className='validation-invalid-label'>Vui lòng chọn kho hàng</div>
                                )}
                                <div className="table-responsive">
                                    <table id="myTable" className="table table-hover table-bordered table-tiny">
                                        <thead>
                                            <tr>
                                                <th>Tên</th>
                                                <th>Mã</th>
                                                <th style={{width:'100px'}}>Số lượng</th>
                                                <th style={{width:'200px'}}>Tiền</th>
                                                <th style={{width:'200px'}}>Giảm giá</th>
                                                <th>Thành tiền</th>
                                                <th>
                                                    <i className="fal fa-trash" />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((product,key) => {
                                                    let sub_total = ( product.cr_price - product.cr_promotion_price ) * product.cr_qty;
                                                    return (
                                                        <tr key={key} >
                                                            <td>
                                                                <Field type="hidden" name="tax_rate[]" value="0.00"/>
                                                                <Field type="hidden" name="tax[]" value="0.00"/>
                                                                <Field type="hidden" name="purchase_unit[]" value={product.unit_id}/>
                                                                <Field type="hidden" name="product_code[]" value={product.code}/>
                                                                <Field type="hidden" name="product_ids[]" value={product.id}/>
                                                                <Field type="hidden" name="recieved[]" value={1}/>
                                                                <Field type="hidden" name="product_id" value={product.id}/>
                                                                {product.name}
                                                            </td>
                                                            <td>{product.code}</td>
                                                            <td><NumericFormat thousandSeparator="," type='number' className='form-control quantity' style={{width:'80px'}}   value={product.cr_qty} onValueChange={(e)=>handleInputChange(e,product.id,'qty')} name='qty[]'/></td>
                                                            <td><NumericFormat thousandSeparator="," className='form-control' value={product.cr_price} onValueChange={(e)=>handleInputChange(e,product.id,'price')} name='net_unit_cost[]'/></td>
                                                            <td><NumericFormat thousandSeparator="," disabled max={product.cr_price}  className='form-control' value={product.cr_promotion_price} onValueChange={(e)=>handleInputChange(e,product.id,'promotion_price')} name='discount[]'/></td>
                                                            <td className='thanh-tien'>
                                                                <MyNumberFormat value={sub_total}/><input type='hidden' name='subtotal[]' value={sub_total}/>
                                                            </td>
                                                            <td className='text-center'><i className="fal fa-trash" /></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot className="tfoot active">
                                            <tr>
                                                <th colSpan={2}>
                                                    Tổng
                                                    <Field type='hidden' name='total_qty' value={totalQty}/>
                                                    <Field type='hidden' name='total_discount' value={totalPricePromo}/>
                                                    <Field type='hidden' name='total_cost' value={totalSubTotal}/>
                                                    <Field type='hidden' name='payment_status' value={1}/>
                                                    <Field type='hidden' name='item' value={products.length}/>
                                                    <Field type='hidden' name='total_tax' value={0}/>
                                                    <Field type='hidden' name='paid_amount' value={0}/>
                                                </th>
                                                <th id="total-qty"><MyNumberFormat value={totalQty}/></th>
                                                <th><MyNumberFormat value={totalPrice}/></th>
                                                <th id="total-discount"><MyNumberFormat value={totalPricePromo}/></th>
                                                <th id="total"><MyNumberFormat value={totalSubTotal}/></th>
                                                <th className='text-center'>
                                                    <i className="fal fa-trash" />
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
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
MyForm.defaultProps = {
    id: 0
}
export default MyForm;