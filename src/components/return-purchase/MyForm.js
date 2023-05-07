import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import ReturnPurchaseModel from '../../models/ReturnPurchaseModel';
import WarehouseModel from '../../models/WarehouseModel';
import SupplierModel from '../../models/SupplierModel';
import MyProductFinding from '../global/MyProductFinding';
import ProductModel from '../../models/ProductModel';
import { SET_WAREHOUSE_ID } from '../../redux/action';
import { useDispatch } from 'react-redux';

import { NumericFormat } from 'react-number-format';
import MyNumberFormat from '../global/MyNumberFormat';

const rules = Yup.object().shape({
    warehouse_id: Yup.number().min(1,lang.required),
});
function MyForm(props) {
    let { id } = props;
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        paid_amount: 0,
        grand_total: 0,
        warehouse_id: 0,
        return_note: '',
        staff_note: '',
    });
    const [warehouses, setWarehouses] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);

    const [totalQty,setTotalQty] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalPricePromo,setTotalPricePromo] = useState(0);
    const [totalSubTotal,setTotalSubTotal] = useState();

    // contructor
    useEffect(() => {
        dispatch({ type: SET_WAREHOUSE_ID, payload: 0 });
        
        WarehouseModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setWarehouses(res.data);
        }).catch(err => { alert(err.message); });
        SupplierModel.all({ onlyActive: true, limit: -1 }).then(res => {
            setSuppliers(res.data);
        }).catch(err => { alert(err.message); });

        if (id) {
            ReturnPurchaseModel.find(id).then(res => {
                setFormData(res.data);
                caculateTotalAndSetProducts(res.data.products)
            }).catch(err => { alert(err.message); });
        }
    }, []);



    const handleSelectProducts = (product_ids) => {
        setProducts([]);
        ProductModel.all({ product_ids: product_ids.join() }).then( res => {
            caculateTotalAndSetProducts(res.data)
        }).catch( err => { alert(err.message); });
    }

    const handleSubmit = () => {
        const values = new FormData(document.getElementById('purchaseForm'));
        if( !values.get('product_id') ){
            alert('Vui lòng chọn ít nhất 1 sản phẩm');
            return false;
        }
        if (id) {
            ReturnPurchaseModel.update(id, values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/return-purchase')
                } else {
                    alert(res.msg)
                }
            }).catch(err => { console.log(err.message); });
        } else {
            
            ReturnPurchaseModel.store(values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/return-purchase')
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
            product.cr_qty = typeof product.cr_qty != 'undefined' ? product.cr_qty : 1;
            product.cr_price = typeof product.cr_price != 'undefined' ? product.cr_price : product.price;
            product.cr_promotion_price = typeof product.cr_promotion_price != 'undefined' ? product.cr_promotion_price : product.discount;
            
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
   

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formData}
            validationSchema={rules}
            onSubmit={values => handleSubmit(values)}
        >
            {({ errors, touched }) => (
                <Form className='card p-3' id='purchaseForm' >
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
                                <label>Nhà cung cấp </label>
                                <Field as="select" name="supplier_id" className="form-control">
                                    <option value={''}>Vui lòng chọn</option>
                                    {
                                        suppliers.map((supplier, key) => (
                                            <option key={key} value={supplier.id}>{supplier.name}</option>
                                        ))
                                    }
                                </Field>
                                {errors.supplier_id && touched.supplier_id ? (
                                    <div className='validation-invalid-label'>{errors.supplier_id}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Ghi chú trả hàng</label>
                                <Field as="textarea" name="return_note" className="form-control"></Field>
                                {errors.return_note && touched.return_note ? (
                                    <div className='validation-invalid-label'>{errors.return_note}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Số tiền nhận lại</label>
                                <NumericFormat thousandSeparator="," name="grand_total" value={totalSubTotal} className="form-control"/>
                                {errors.grand_total && touched.grand_total ? (
                                    <div className='validation-invalid-label'>{errors.grand_total}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Nhân viên ghi chú</label>
                                <Field as="textarea" name="staff_note" className="form-control"></Field>
                                {errors.staff_note && touched.staff_note ? (
                                    <div className='validation-invalid-label'>{errors.staff_note}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label>Danh sách mua sắm</label>
                            <div className='card'>
                                <MyProductFinding handleSelectProducts={handleSelectProducts}/>
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
                                                            <td><NumericFormat thousandSeparator="," min={1} className='form-control quantity' style={{width:'80px'}}   value={product.cr_qty} onValueChange={(e)=>handleInputChange(e,product.id,'qty')} name='qty[]'/></td>
                                                            <td><NumericFormat thousandSeparator="," min={0}  className='form-control' value={product.price} onValueChange={(e)=>handleInputChange(e,product.id,'price')} name='net_unit_cost[]'/></td>
                                                            <td><NumericFormat thousandSeparator="," min={0} max={product.cr_price}  className='form-control' value={product.cr_promotion_price} onValueChange={(e)=>handleInputChange(e,product.id,'promotion_price')} name='discount[]'/></td>
                                                            <td className='thanh-tien'>
                                                                <MyNumberFormat value={sub_total}/> <input type='hidden' name='subtotal[]' value={sub_total}/>
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
                                                    {/* <Field type='hidden' name='grand_total' value={totalSubTotal}/> */}
                                                    <Field type='hidden' name='payment_status' value={1}/>
                                                    <Field type='hidden' name='item' value={products.length}/>
                                                    <Field type='hidden' name='total_tax' value={0}/>
                                                    {/* <Field type='hidden' name='paid_amount' value={0}/> */}
                                                    <Field type='hidden' name='status' value={1}/>
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