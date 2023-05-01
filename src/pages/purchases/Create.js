import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import MyForm from '../../components/purchase/MyForm';

function Create(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Nhập hàng' parentName='Nhập hàng' parentLink='purchases' />
            </div>
            <MyForm id={id}/>
        </MasterLayout>
    );
}

export default Create;