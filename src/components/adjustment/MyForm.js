import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import WarehouseModel from '../../models/WarehouseModel';
import MyProductFinding from '../global/MyProductFinding';
import ProductModel from '../../models/ProductModel';
import AdjustmentModel from '../../models/AdjustmentModel';
import { useDispatch, useSelector } from "react-redux";
import { SET_WAREHOUSE_ID } from '../../redux/action';

const rules = Yup.object().shape({
    warehouse_id: Yup.number().min(1,lang.required),
});
function MyForm(props) {
    let { id } = props;
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const store_warehouse_id = useSelector(state => state.warehouse_id);

    const [formData, setFormData] = useState({
        warehouse_id:store_warehouse_id,
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
        }).catch(err => {  });
     
        if (id) {
            AdjustmentModel.find(id).then(res => {
                setFormData(res.data);
                dispatch({ type: SET_WAREHOUSE_ID, payload: res.data.warehouse_id });
                caculateTotalAndSetProducts(res.data.products);
            }).catch(err => {  });
        }
    }, []);



    const handleSelectProducts = (product_ids) => {
        setProducts([]);
        ProductModel.all({ product_ids: product_ids.join(), warehouse_id: store_warehouse_id }).then( res => {
            caculateTotalAndSetProducts(res.data);
        }).catch( err => {  });
    }

    const handleSubmit = () => {
        const values = new FormData(document.getElementById('purchaseForm'));
        if( !values.get('product_id') ){
            alert('Vui lòng chọn ít nhất 1 sản phẩm');
            return false;
        }
        if( values.get('warehouse_id') == values.get('to_warehouse_id') ){
            alert('Kho nguồn phải khác kho đích');
            return false;
        }
        values.set('grand_total',totalSubTotal + parseFloat(values.get('shipping_cost')));
        if (id) {
            AdjustmentModel.update(id, values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/adjustment')
                } else {
                    alert(res.msg)
                }
            }).catch(err => {  });
        } else {
            
            AdjustmentModel.store(values).then(res => {
                if (res.success) {
                    alert(lang.saved)
                    navigate('/adjustment')
                } else {
                    alert(res.msg)
                }
            }).catch(err => {  });
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

    const caculateTotalAndSetProducts = (the_products) => {
        let t_totalQty = 0;
        let t_totalPrice = 0;
        let t_totalPromotionPrice = 0;
        let t_totalSubTotal = 0;
        for (const product of the_products) {
            product.cr_qty = product.change_qty ? product.change_qty : 0;
            product.action = product.action ? product.action : '';
            product.cr_price = product.cr_price ? product.cr_price : product.price;
            product.cr_promotion_price = product.cr_promotion_price ? product.cr_promotion_price : 0;
            
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
        if(e.target.name == 'warehouse_id'){
            dispatch({ type: SET_WAREHOUSE_ID, payload: e.target.value });
            setProducts([]);
        }
    }
    const handleActionChange = (id,e) => {
        for (const product of products) {
            if( product.id == id ){
                product.action = e.target.value
            }
        }
        caculateTotalAndSetProducts(products);
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
                            
                            
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Ghi chú</label>
                                <Field as="textarea" name="note" className="form-control"></Field>
                                {errors.note && touched.note ? (
                                    <div className='validation-invalid-label'>{errors.note}</div>
                                ) : null}
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
                                ) }
                                <div className="table-responsive">
                                    <table id="myTable" className="table table-hover table-bordered table-tiny">
                                        <thead>
                                            <tr>
                                                <th>Tên</th>
                                                <th>Mã</th>
                                                <th style={{width:'100px'}}>Tồn kho</th>
                                                <th style={{width:'100px'}}>Điều chỉnh</th>
                                                <th style={{width:'200px'}}>Hành động</th>
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
                                                                <Field type="hidden" name="product_code[]" value={product.code}/>
                                                                <Field type="hidden" name="product_ids[]" value={product.id}/>
                                                                <Field type="hidden" name="product_id" value={product.id}/>
                                                                {product.name}
                                                            </td>
                                                            <td>{product.code}</td>
                                                            <td>{product.qty}</td>
                                                            <td><input min={0} className='form-control quantity' style={{width:'80px'}} type='number'  defaultValue={product.cr_qty} onChange={(e)=>handleInputChange(e,product.id,'qty')} name='qty[]'/></td>
                                                            <td>
                                                                <Field as="select" name="action[]" value={product.action} onChange={(e)=>handleActionChange(product.id,e)} className="form-control act-val">
                                                                    <option value="">Giữ nguyên</option>
                                                                    <option value="-">Giảm</option>
                                                                    <option value="+">Tăng</option>
                                                                </Field>
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
                                                    <Field type='hidden' name='item' value={products.length}/>
                                                </th>
                                                <th></th>
                                                <th id="total-qty">{totalQty}</th>
                                                <th id="total-discount"></th>
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
                            {
                                id ? (
                                    <>
                                        <p>Đối với điều chỉnh, chỉ xem chứ không cập nhật. Nếu muốn cập nhật, hãy tạo phiếu mới !</p>
                                        <Link to={'/adjustment'} className="btn btn-success">Quay lại</Link>
                                    </>
                                ) : (
                                    <button type="submit" className="btn btn-success">
                                        <Icon fa={'fal fa-save mr-2'} /> Lưu
                                    </button>
                                )
                            }
                            
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