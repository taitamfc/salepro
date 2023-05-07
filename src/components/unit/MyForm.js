import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import UnitModel from '../../models/UnitModel';
import { useNavigate } from "react-router-dom";

const rules = Yup.object().shape({
    unit_name: Yup.string().required(lang.required),
    unit_code: Yup.string().required(lang.required),
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        unit_name: '',
        unit_code : ''
    });

    // contructor
    useEffect( () => {
        if(id){
            UnitModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => {  });
        }
    }, []);

    const handleSubmit = (values) => {
        if(id){
            UnitModel.update(id,values).then( res => {
                alert( lang.saved )
                navigate('/unit')
            }).catch( err => {  });
        }else{
            UnitModel.store(values).then( res => {
                alert( lang.saved )
                navigate('/unit')
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
                                <Field name="unit_name" className="form-control" />
                                {errors.unit_name && touched.unit_name ? (
                                    <div className='validation-invalid-label'>{errors.unit_name}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Mã * </label>
                                <Field name="unit_code" className="form-control" />
                                {errors.unit_code && touched.unit_code ? (
                                    <div className='validation-invalid-label'>{errors.unit_code}</div>
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