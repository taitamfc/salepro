import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import MyForm from '../../components/product/MyForm';
import { useParams } from 'react-router-dom';

function Create(props) {
    const { id = 0 } = useParams();

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm sản phẩm' parentName='Sản phẩm' parentLink='products' />
            </div>
            <MyForm id={id}/>
        </MasterLayout>
    );
}

export default Create;