import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import lang from '../../lang/vi';
import WarehouseModel from '../../models/WarehouseModel';
import { useNavigate } from "react-router-dom";
import ProductModel from '../../models/ProductModel';

const rules = Yup.object().shape({
    // warehouse_id: Yup.string().required(lang.required),
    fileUpload: Yup.mixed().test('required', "Bạn chưa chọn file", (value) =>{
        return value && value.length
    } )
    .test("type", "Vui lòng chỉ chọn file excel", function (value) {
        if(value){
            let fileExt = value.split('.').pop();
            if(fileExt == 'xls' || fileExt == 'xlsx'){
                return true;
            }
            return false;
        }
        return false;
    }),
    importType: Yup.string().required(lang.required),
});
function CreateFromExcelForm(props) {
    let {id} = props;
    let navigate = useNavigate();

    const [warehouses, setWarehouses] = useState([]);
    const [formData, setFormData] = useState({
        warehouse_id: '',
        fileUpload : '',
        importType : 'new',
    });
    useEffect(() => {
        WarehouseModel.all({ limit: -1, onlyActive:true }).then(res => {
            setWarehouses(res.data);
        }).catch(err => {  });

    }, []);
    const handleSubmit = () => {
        const values = new FormData(document.getElementById('purchaseForm'));
        values.set('fileUpload',document.getElementById('fileUpload').files[0]);
        ProductModel.processImport(values).then(res => {
            alert(lang.saved);
            navigate('/products')
        }).catch(err => {  });
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={formData}
            validationSchema={rules}
            onSubmit={values => handleSubmit(values)}
        >
        {({ errors, touched}) => (
            <Form className='content card p-3' id='purchaseForm' >
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="mb-2">
                            <label>Cửa hàng</label>
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
                            <label>File import *</label>
                            <Field type="file" id="fileUpload" name="fileUpload" className="form-control" />
                            {errors.fileUpload && touched.fileUpload ? (
                                <div className='validation-invalid-label'>{errors.fileUpload}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="help-text">
                            <p>Tải file mẫu ở đây:  
                                <a href="https://nstatic.nvncdn.com/file/Nhanh.vn_Basic_Import_Product_v0.2.0.xls?v=1" download="" className='ml-2'>
                                    <i className="fa fa-download"></i> Excel 2003 (.xls)
                                </a>
                            </p>
                            <p>Chú ý: Không chèn các kí tự đặc biệt vào tên của file import VD: @,# ,$,/,-,...</p>
                            <p>- Cập nhật thông tin sản phẩm thì cần điền tên hoặc mã sản phẩm hoặc cả tên và mã sản phẩm.</p>
                            <p>- Cập nhật tên sản phẩm cần điền mã sản phẩm và dùng file import chung.</p>
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
CreateFromExcelForm.defaultProps = {
    id: 0
}
export default CreateFromExcelForm;