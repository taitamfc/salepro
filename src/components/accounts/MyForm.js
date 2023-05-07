import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import AccountModel from '../../models/AccountModel';
import { useNavigate } from "react-router-dom";

const rules = Yup.object().shape({
    account_no: Yup.string().required(lang.required),
    name: Yup.string().required(lang.required),
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        account_no: '',
        name : '',
        initial_balance : 0,
        note : '',
    });

    // contructor
    useEffect( () => {
        if(id){
            AccountModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => {  });
        }
    }, []);

    const handleSubmit = (values) => {
        if(id){
            AccountModel.update(id,values).then( res => {
                alert( lang.saved )
                navigate('/accounts')
            }).catch( err => {  });
        }else{
            AccountModel.store(values).then( res => {
                alert( lang.saved )
                navigate('/accounts')
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
                            <label>Tên tài khoản * </label>
                            <Field name="account_no" className="form-control" />
                            {errors.account_no && touched.account_no ? (
                                <div className='validation-invalid-label'>{errors.account_no}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <label>Tên chủ tài khoản * </label>
                            <Field name="name" className="form-control" />
                            {errors.name && touched.name ? (
                                <div className='validation-invalid-label'>{errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <label>Số dư ban đầu</label>
                            <Field name="initial_balance" className="form-control" />
                            {errors.initial_balance && touched.initial_balance ? (
                                <div className='validation-invalid-label'>{errors.initial_balance}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <label>Ghi chú</label>
                            <Field as="textarea" name="note" className="form-control" />
                            {errors.note && touched.note ? (
                                <div className='validation-invalid-label'>{errors.note }</div>
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