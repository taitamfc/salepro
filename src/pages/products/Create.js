import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import ProductForm from '../../components/product/ProductForm';
import { useParams } from 'react-router-dom';

function Create(props) {
    const { id = 0 } = useParams();

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm sản phẩm' parentName='Sản phẩm' parentLink='products' />
            </div>
            <form className='form-add-custom'>
                <div className='content pt-0 pb-0'>
                </div>
                <div id='formProductAdd' className='content'>
                    <div className='tab-content'>
                        <div className='tab-pane fade active show'>
                            <ProductForm/>
                        </div>
                    </div>
                </div>
            </form>
        </MasterLayout>
    );
}

export default Create;