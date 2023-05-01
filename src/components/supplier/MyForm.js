import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import SupplierModel from '../../models/SupplierModel';
import { useNavigate } from "react-router-dom";

const rules = Yup.object().shape({
    name: Yup.string().required(lang.required),
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: ''
    });

    // contructor
    useEffect( () => {
        if(id){
            SupplierModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => { alert(err.message); });
        }
    }, []);

    const handleSubmit = (values) => {
        if(id){
            SupplierModel.update(id,values).then( res => {
                alert( lang.saved )
                navigate('/supplier')
            }).catch( err => { alert(err.message); });
        }else{
            SupplierModel.store(values).then( res => {
                alert( lang.saved )
                navigate('/supplier')
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
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card p-3'>
                            <div className="mb-2">
                                <label>Tên * </label>
                                <Field name="name" className="form-control" />
                                {errors.name && touched.name ? (
                                    <div className='validation-invalid-label'>{errors.name}</div>
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