import React, { useEffect, useState } from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import GeneralSettingModel from '../../models/GeneralSettingModel';
import lang from '../../lang/vi';

function Store(props) {
    const [item,setItem] = useState({});
    const [formData,setFormData] = useState({});
    useEffect( () => {
        GeneralSettingModel.all().then( res => {
            setFormData({
                site_title: res.site_title,
                site_phone: res.site_phone,
                site_address: res.site_address,
            });
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        GeneralSettingModel.store(formData).then( res => {
            alert(lang.saved)
        }).catch( e => {})
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Cài đặt chung' parentName='Cài đặt' parentLink='report/due' />
            </div>
            <div className='content p-0'>
                <div className='card border-0'>
                    <div className="card-header bg-light py-2 header-elements-inline">
                        <h5 className="card-title font-weight-semibold">
                            <i className="fal fa-info-circle  mr-2" /> Thông tin doanh nghiệp
                        </h5>
                    </div>
                    <div className='xcard-body py-2 px-3'>
                        <form onSubmit={handleSubmit} onChange={handleChange}>
                        <div className='col-12 col-md-6 content'>
                            
                            <div className="form-group row mb-2">
                                <div className="col-12 col-sm-3">
                                    <label>Tên cửa hàng</label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <input type="text" value={formData.site_title} name="site_title" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row mb-2">
                                <div className="col-12 col-sm-3">
                                    <label>Số điện thoại</label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <input type="text" value={formData.site_phone} name="site_phone" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row mb-2">
                                <div className="col-12 col-sm-3">
                                    <label>Địa chỉ</label>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <input type="text" value={formData.site_address} name="site_address" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row mb-2">
                                <div className="col-12">
                                    <button className='btn btn-success'><i className="fal fa-save mr-1"></i> Lưu</button>
                                </div>
                            </div>

                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default Store;