import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import WarehouseModel from '../../models/WarehouseModel';
import { useNavigate } from "react-router-dom";

const rules = Yup.object().shape({
    name: Yup.string().required(lang.required),
    phone: Yup.string().required(lang.required),
    address: Yup.string().required(lang.required),
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone : '',
        email : '',
        address : '',
    });

    // contructor
    useEffect( () => {
        if(id){
            WarehouseModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => {  });
        }
    }, []);

    const handleSubmit = (values) => {
        if(id){
            WarehouseModel.update(id,values).then( res => {
                alert( lang.saved )
                navigate('/warehouse')
            }).catch( err => {  });
        }else{
            WarehouseModel.store(values).then( res => {
                alert( lang.saved )
                navigate('/warehouse')
            }).catch( err => {  });
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
            <Form className='content card p-3'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="mb-2">
                            <label>Tên * </label>
                            <Field name="name" className="form-control" />
                            {errors.name && touched.name ? (
                                <div className='validation-invalid-label'>{errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <label>Số điện thoại * </label>
                            <Field name="phone" className="form-control" />
                            {errors.phone && touched.phone ? (
                                <div className='validation-invalid-label'>{errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <label>Email</label>
                            <Field name="email" className="form-control" />
                            {errors.email && touched.email ? (
                                <div className='validation-invalid-label'>{errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <label>Địa chỉ *</label>
                            <Field as="textarea" name="address" className="form-control" />
                            {errors.address && touched.address ? (
                                <div className='validation-invalid-label'>{errors.address}</div>
                            ) : null}
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