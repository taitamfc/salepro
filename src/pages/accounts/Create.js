import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import MyForm from '../../components/accounts/MyForm';

function Create(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm tài khoản' parentName='Tài khoản' parentLink='accounts' />
            </div>
            <MyForm id={id}/>
        </MasterLayout>
    );
}

export default Create;