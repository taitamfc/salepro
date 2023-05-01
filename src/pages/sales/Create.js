import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import MyForm from '../../components/sales/MyForm';

function Create(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Bán hàng' parentName='Bán hàng' parentLink='sales' />
            </div>
            <MyForm id={id}/>
        </MasterLayout>
    );
}

export default Create;