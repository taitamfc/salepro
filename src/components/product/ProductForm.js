import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';

import ProductModel from '../../models/ProductModel';
import CategoryModel from '../../models/CategoryModel';
import BrandModel from '../../models/BrandModel';

const rules = Yup.object().shape({
    name: Yup.string().required(lang.required),
    code: Yup.string().required(lang.required),
    cost: Yup.string().required(lang.required),
    price: Yup.string().required(lang.required),
});
function ProductForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        cost : '',
        price : '',
        unit_id : '',
        image : '',
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBranches] = useState([]);
    // contructor
    useEffect( () => {
        CategoryModel.all( {limit: -1, tree: true} ).then( res => {
            setCategories(res.data);
        }).catch( err => { alert(err.message); });

        BrandModel.all( {limit: -1, tree: true} ).then( res => {
            setBranches(res.data);
        }).catch( err => { alert(err.message); });

        if(id){
            ProductModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => { alert(err.message); });
        }
    }, []);

    const handleSubmit = (values) => {

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

                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card p-3'>
                            <div className="row mb-2">
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
                                <div className='col-md-6'>
                                    <div className="mb-2">
                                        <label>VAT</label>
                                        <Field name="tax_id" className="form-control" />
                                        {errors.tax_id && touched.tax_id ? (
                                            <div className='validation-invalid-label'>{errors.cost}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-2">
                                        <label>Mã vạch</label>
                                        <Field name="barcode_symbology" className="form-control" />
                                        {errors.barcode_symbology && touched.barcode_symbology ? (
                                            <div className='validation-invalid-label'>{errors.barcode_symbology}</div>
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
                                <div className='input-group'>
                                    <Field as="select" name="category_id" className="form-control">
                                        {
                                            categories.map( (category,key) => (
                                                <option key={key} value={category.id}>{category.name}</option>
                                            ) )
                                        }
                                    </Field>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text cursor-pointer'>
                                            <Icon fa='fa fa-plus text-success' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label>Nhãn hiệu</label>
                                <div className='input-group'>
                                    <Field as="select" name="brand_id" className="form-control">
                                        {
                                            brands.map( (brand,key) => (
                                                <option key={key} value={brand.id}>{brand.name}</option>
                                            ) )
                                        }
                                    </Field>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text cursor-pointer'>
                                            <Icon fa='fa fa-plus text-success' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </Form>    
                )}
            </Formik>
    );
}
ProductForm.defaultProps = {
    id: 0
}
export default ProductForm;