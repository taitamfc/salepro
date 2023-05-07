import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import BrandModel from '../../models/BrandModel';
import { useNavigate } from "react-router-dom";

const rules = Yup.object().shape({
    title: Yup.string().required(lang.required),
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: ''
    });

    // contructor
    useEffect( () => {
        if(id){
            BrandModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => {  });
        }
    }, []);

    const handleSubmit = (values) => {
        if(id){
            BrandModel.update(id,values).then( res => {
                alert( lang.saved )
                navigate('/Brand')
            }).catch( err => {  });
        }else{
            BrandModel.store(values).then( res => {
                alert( lang.saved )
                navigate('/Brand')
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
            <Form className='content'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card p-3'>
                            <div className="mb-2">
                                <label>Tên * </label>
                                <Field name="title" className="form-control" />
                                {errors.title && touched.title ? (
                                    <div className='validation-invalid-label'>{errors.title}</div>
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