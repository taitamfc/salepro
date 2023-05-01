import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import ReturnSaleModel from '../../models/ReturnSaleModel';
import WarehouseModel from '../../models/WarehouseModel';
import MyProductFinding from '../global/MyProductFinding';
import ProductModel from '../../models/ProductModel';
import { SET_WAREHOUSE_ID } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const rules = Yup.object().shape({
    warehouse_id: Yup.number().min(1,lang.required),
    customer_name: Yup.string().required(lang.required),
    customer_phone: Yup.string().required(lang.required),
    customer_address: Yup.string().required(lang.required),
});
function MyForm(props) {
    let { id } = props;
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const store_warehouse_id = useSelector(state => state.warehouse_id);
    const [formData, setFormData] = useState({
        paid_amount: 0,
        grand_total: 0,
        warehouse_id: 0,
        shipping_cost: 0,
        customer_name:''
    });
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [totalQty,setTotalQty] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalPricePromo,setTotalPricePromo] = useState(0);
    const [totalSubTotal,setTotalSubTotal] = useState();
    const [shippingCost,setShippingCost] = useState(0);

    // contructor
    useEffect(() => {
        dispatch({ type: SET_WAREHOUSE_ID, payload: 0 });
        setShippingCost(0);
        
        WarehouseModel.all({ limit: -1, search: { is_active: 1 } }).then(res => {
            setWarehouses(res.data);
        }).catch(err => { alert(err.message); });

        if (id) {
            ReturnSaleModel.find(id).then(res => {
                setFormData(res.data);
                dispatch({ type: SET_WAREHOUSE_ID, payload: res.data.warehouse_id });
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
        if (id) {
            ReturnSaleModel.update(id, values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/return-sale')
                } else {
                    alert(res.msg)
                }
            }).catch(err => { console.log(err.message); });
        } else {
            
            ReturnSaleModel.store(values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/return-sale')
                } else {
                    alert(res.msg)
                }
            }).catch(err => { console.log(err.message); });
        }
    }

    const handleInputChange = (e,id,type) => {
        for (const product of products) {
            if( product.id == id ){
                switch (type) {
                    case 'qty':
                        product.cr_qty = e.target.value;
                        break;
                    case 'price':
                        product.cr_price = e.target.value;
                        break;
                    case 'promotion_price':
                        product.cr_promotion_price = e.target.value;
                        break;
                    default:
                        break;
                }
            }
        }
        caculateTotalAndSetProducts(products);
    }

    const caculateTotalAndSetProducts = (the_products , shipping_cost = 0) => {
        let t_totalQty = 0;
        let t_totalPrice = 0;
        let t_totalPromotionPrice = 0;
        let t_totalSubTotal = 0;
        for (const product of the_products) {
            product.cr_qty = product.cr_qty ? product.cr_qty : 1;
            product.cr_price = product.cr_price ? product.cr_price : product.price;
            product.cr_promotion_price = product.cr_promotion_price ? product.cr_promotion_price : 0;
            
            t_totalQty += parseInt(product.cr_qty);
            t_totalPrice += parseFloat(product.cr_price);
            t_totalPromotionPrice += parseFloat(product.cr_promotion_price);
            t_totalSubTotal += ( parseFloat(product.cr_price) - parseFloat(product.cr_promotion_price) ) * product.cr_qty;
        }
        shipping_cost = shipping_cost ? shipping_cost : shippingCost;
        t_totalSubTotal += parseFloat(shipping_cost);
        setTotalQty(t_totalQty);
        setTotalPrice(t_totalPrice);
        setTotalPricePromo(t_totalPromotionPrice);
        setTotalSubTotal(t_totalSubTotal);
        setProducts(the_products);
    }

    const handleFormChange = (e) => {
        if(e.target.name == 'warehouse_id'){
            dispatch({ type: SET_WAREHOUSE_ID, payload: e.target.value });
            setProducts([]);
            setTotalQty(0);
            setTotalPrice(0);
            setTotalPricePromo(0);
            setTotalSubTotal(0);
        }
        if(e.target.name == 'shipping_cost'){
            setShippingCost(e.target.value);
            caculateTotalAndSetProducts(products,e.target.value);
        }
    }
   

    return (
        <Formik
            initialValues={formData}
            validationSchema={rules}
            enableReinitialize={true}
            // initialTouched={{ customer_name: false, installedDate: true, country: true }}
            // initialErrors={{}}
            validateOnMount={true}
            onSubmit={values => handleSubmit(values)}
        >
            {({ errors, touched }) => (
                <Form className='card p-3' id='purchaseForm' onChange={handleFormChange}>
                    {/* <Field type='hidden' name="type"/> */}
                    <div className="row">
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Kho hàng * </label>
                                <Field as="select" name="warehouse_id" className="form-control" required>
                                    <option value="0">Vui lòng chọn</option>
                                    {
                                        warehouses.map((warehouse, key) => (
                                            <option key={key} value={warehouse.id}>{warehouse.name}</option>
                                        ))
                                    }
                                </Field>
                                {errors.warehouse_id && touched.warehouse_id ? (
                                    <div className='validation-invalid-label'>{errors.warehouse_id}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Tên khách hàng *</label>
                                <Field name="customer_name" className="form-control"/>
                                {errors.customer_name && touched.customer_name ? (
                                    <div className='validation-invalid-label'>{errors.customer_name}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Số điện thoại *</label>
                                <Field name="customer_phone" className="form-control"/>
                                {errors.customer_phone && touched.customer_phone ? (
                                    <div className='validation-invalid-label'>{errors.customer_phone}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Địa chỉ *</label>
                                <Field name="customer_address" className="form-control"/>
                                {errors.customer_address && touched.customer_address ? (
                                    <div className='validation-invalid-label'>{errors.customer_address}</div>
                                ) : null}
                            </div>
                            
                            
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Tổng tiền</label>
                                <Field name="grand_total" value={totalSubTotal} className="form-control"></Field>
                                {errors.grand_total && touched.grand_total ? (
                                    <div className='validation-invalid-label'>{errors.grand_total}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Ghi chú</label>
                                <Field as="textarea" name="return_note" className="form-control"></Field>
                                {errors.return_note && touched.return_note ? (
                                    <div className='validation-invalid-label'>{errors.return_note}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label>Danh sách mua sắm</label>
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
                                                            <td><input min={1} className='form-control quantity' style={{width:'80px'}} type='number'  defaultValue={product.cr_qty} onChange={(e)=>handleInputChange(e,product.id,'qty')} name='qty[]'/></td>
                                                            <td><input min={0} type='number' className='form-control' defaultValue={product.cr_price} onChange={(e)=>handleInputChange(e,product.id,'price')} name='net_unit_price[]'/></td>
                                                            <td><input min={0} max={product.cr_price} type='number' className='form-control' defaultValue={product.cr_promotion_price} onChange={(e)=>handleInputChange(e,product.id,'promotion_price')} name='discount[]'/></td>
                                                            <td className='thanh-tien'>
                                                                { sub_total } <input type='hidden' name='subtotal[]' value={sub_total}/>
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
                                                    <Field type='hidden' name='biller_id' value={1}/>
                                                    <Field type='hidden' name='total_qty' value={totalQty}/>
                                                    <Field type='hidden' name='total_discount' value={totalPricePromo}/>
                                                    <Field type='hidden' name='total_cost' value={totalSubTotal}/>
                                                    <Field type='hidden' name='total_price' value={totalPrice}/>
                                                    <Field type='hidden' name='payment_status' value={1}/>
                                                    <Field type='hidden' name='item' value={products.length}/>
                                                    <Field type='hidden' name='total_tax' value={0}/>
                                                    {/* <Field type='hidden' name='paid_amount' value={0}/> */}
                                                    <Field type='hidden' name='status' value={1}/>
                                                </th>
                                                <th id="total-qty">{totalQty}</th>
                                                <th>{totalPrice}</th>
                                                <th id="total-discount">{totalPricePromo}</th>
                                                <th id="total">{totalSubTotal}</th>
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