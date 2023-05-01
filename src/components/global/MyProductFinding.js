import React, { useState } from 'react';
import MyProductList from './MyProductList';

function MyProductFinding(props) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="card-header bg-light py-2 header-elements-inline">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button type='button' onClick={ () => setShowModal(true) } className='btn btn-primary'>Tìm sản phẩm</button>
                    </div>
                    <input
                        type="text"
                        name="tbLoadProduct"
                        maxLength={255}
                        autoFocus="autoFocus"
                        id="tbLoadProduct"
                        autoComplete="off"
                        className="form-control suggestProductBox"
                        defaultValue=""
                        placeholder='Tìm theo tên hoặc mã sản phẩm'
                    />
                </div>
            </div>
            <MyProductList show={showModal} setShowModal={setShowModal} handleSelectProducts={props.handleSelectProducts} size='xl' modal_title='Tất cả sản phẩm'/>
            
        </>

    );
}
MyProductFinding.defaultProps = {
    
}
export default MyProductFinding;