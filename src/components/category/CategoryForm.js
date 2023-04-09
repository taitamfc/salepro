import React from 'react';
import Icon from '../Icon';

function CategoryForm(props) {
    return (
        <div className='row'>
            <div className='col-md-6'>
                <div className='card p-3'>
                    <div className="row mb-2">
                        <div className='col-md-12'>
                            <div className="mb-2">
                                <label>Tên sản phẩm * </label>
                                <input type="text" name="name" className="form-control"/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Loại sản phẩm</label>
                                <select className="form-control">
                                    <option>1</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Mã sản phẩm</label>
                                <input type="text" name="code" className="form-control"/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Giá nhập</label>
                                <input type="text" name="cost" className="form-control"/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label>Giá bán</label>
                                <input type="text" name="price" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='card p-3'>
                    <div className="row mb-2">
                        <div className='col-md-12'>
                            <div className="mb-2">
                                <label>Danh mục</label>
                                <div className='input-group'>
                                    <select className="form-control">
                                        <option>1</option>
                                    </select>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text cursor-pointer'>
                                            <Icon fa='fa fa-plus text-success' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className="mb-2">
                                <label>Thương hiệu</label>
                                <div className='input-group'>
                                    <select className="form-control">
                                        <option>1</option>
                                    </select>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text cursor-pointer'>
                                            <Icon fa='fa fa-plus text-success' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className="mb-2">
                                <label>Đơn vị mua hàng</label>
                                <div className='input-group'>
                                    <select className="form-control">
                                        <option>1</option>
                                    </select>
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
            </div>
        </div>
    );
}

export default CategoryForm;