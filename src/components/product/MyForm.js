import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';

import ProductModel from '../../models/ProductModel';
import CategoryModel from '../../models/CategoryModel';
import BrandModel from '../../models/BrandModel';
import UnitModel from '../../models/UnitModel';

const rules = Yup.object().shape({
    name: Yup.string().required(lang.required),
    code: Yup.string().required(lang.required),
    cost: Yup.string().required(lang.required),
    price: Yup.string().required(lang.required),
    unit_id: Yup.string().required(lang.required),
    brand_id: Yup.string().required(lang.required),
    category_id: Yup.string().required(lang.required),
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: 'standard',
        barcode_symbology: 'C128',
        name: '',
        code: Math.floor(Math.random() * 99999999) + 10000000,
        cost : '',
        price : '',
        unit_id : '',
        brand_id : '',
        category_id : '',
        image : '',
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBranches] = useState([]);
    const [units, setUnits] = useState([]);
    // contructor
    useEffect( () => {
        CategoryModel.all( {limit: -1, tree: true} ).then( res => {
            setCategories(res.data);
        }).catch( err => { alert(err.message); });

        BrandModel.all( {limit: -1} ).then( res => {
            setBranches(res.data);
        }).catch( err => { alert(err.message); });

        UnitModel.all( {limit: -1} ).then( res => {
            setUnits(res.data);
        }).catch( err => { alert(err.message); });

        if(id){
            ProductModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => { alert(err.message); });
        }
    }, []);

    const handleSubmit = (values) => {
        if(id){
            ProductModel.update(id,values).then( res => {
                if(res.success){
                    alert( lang.saved )
                    navigate('/products')
                }else{
                    alert( res.msg )
                }
            }).catch( err => { alert(err.message); });
        }else{
            ProductModel.store(values).then( res => {
                if(res.success){
                    alert( lang.saved )
                    navigate('/products')
                }else{
                    alert( res.msg )
                }
            }).catch( err => { alert(err.message); });
        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formData}
            validationSchema={rules}
            onSubmit={values => handleSubmit(values)}
        >
            {({ errors, touched}) => (
                <Form className='content'>
                    <Field type='hidden' name="type"/>
                    <Field type='hidden' name="barcode_symbology"/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card p-3'>
                                <div className="row">
                                    <div className='col-md-12'>
                                        <div className="mb-2">
                                            <label>Tên sản phẩm * </label>
                                            <Field name="name" className="form-control" />
                                            {errors.name && touched.name ? (
                                                <div className='validation-invalid-label'>{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-2">
                                            <label>Loại sản phẩm</label>
                                            <Field as="select" name="type" className="form-control">
                                                <option value={'standard'}>Thông thường</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-2">
                                            <label>Mã sản phẩm *</label>
                                            <Field name="code" className="form-control" />
                                            {errors.code && touched.code ? (
                                                <div className='validation-invalid-label'>{errors.code}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-2">
                                            <label>Giá nhập *</label>
                                            <Field name="cost" className="form-control" />
                                            {errors.cost && touched.cost ? (
                                                <div className='validation-invalid-label'>{errors.cost}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-2">
                                            <label>Giá bán *</label>
                                            <Field name="price" className="form-control" />
                                            {errors.price && touched.price ? (
                                                <div className='validation-invalid-label'>{errors.price}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card p-3'>
                                <div className="mb-2">
                                    <label>Danh mục</label>
                                    <Field as="select" name="category_id" className="form-control">
                                        <option value={''}>Vui lòng chọn</option>
                                        {
                                            categories.map( (category,key) => (
                                                <option key={key} value={category.id}>{category.name}</option>
                                            ) )
                                        }
                                    </Field>
                                    {errors.category_id && touched.category_id ? (
                                        <div className='validation-invalid-label'>{errors.category_id}</div>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <label>Nhãn hiệu</label>
                                    <Field as="select" name="brand_id" className="form-control">
                                        <option value={''}>Vui lòng chọn</option>
                                        {
                                            brands.map( (brand,key) => (
                                                <option key={key} value={brand.id}>{brand.title}</option>
                                            ) )
                                        }
                                    </Field>
                                    {errors.brand_id && touched.brand_id ? (
                                        <div className='validation-invalid-label'>{errors.brand_id}</div>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <label>Đơn vị</label>
                                    <Field as="select" name="unit_id" className="form-control">
                                        <option value={''}>Vui lòng chọn</option>
                                        {
                                            units.map( (unit,key) => (
                                                <option key={key} value={unit.id}>{unit.unit_name}</option>
                                            ) )
                                        }
                                    </Field>
                                    {errors.unit_id && touched.unit_id ? (
                                        <div className='validation-invalid-label'>{errors.unit_id}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <button type="submit" className="btn btn-success">
                                <Icon fa={'fal fa-save mr-2'}/> Lưu
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