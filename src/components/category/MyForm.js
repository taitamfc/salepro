import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import CategoryModel from '../../models/CategoryModel';
import { useNavigate } from "react-router-dom";


const rules = Yup.object().shape({
    name: Yup.string().required(lang.required)
});
function MyForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        parent_id: 0,
    });
    const [categories, setCategories] = useState([]);

    // contructor
    useEffect( () => {
        CategoryModel.all().then( res => {
            setCategories(res.data);
        }).catch( err => {  });

        if(id){
            CategoryModel.find(id).then( res => {
                setFormData(res.data);
            }).catch( err => {  });
        }
    }, [navigate]);

    const handleSubmit = (values) => {
        if(id){
            CategoryModel.update(id,values).then( res => {
                alert( lang.saved )
                navigate('/categories')
            }).catch( err => {  });
        }else{
            CategoryModel.store(values).then( res => {
                alert( lang.saved )
                navigate('/categories')
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
                        <div className=''>
                            <div className="mb-2">
                                <label>Tên * </label>
                                <Field name="name" className="form-control" />
                                {errors.name && touched.name ? (
                                    <div className='validation-invalid-label'>{errors.name}</div>
                                ) : null}
                            </div>
                            <div className="mb-2">
                                <label>Danh mục</label>
                                <Field as="select" name="parent_id" className="form-control">
                                    <option value="">Danh mục gốc</option>
                                    {
                                        categories.map( (category,key) => (
                                            <option key={key} value={category.id}>{category.name}</option>
                                        ) )
                                    }
                                </Field>
                            </div>
                            {/* <div className="mb-2">
                                <label>Hình ảnh</label>
                                <Field name="image" className="form-control" type="file" />
                            </div> */}
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