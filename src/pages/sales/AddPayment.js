import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import AddPaymentForm from '../../components/sales/AddPaymentForm';

function AddPayment(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm thanh toán' parentName='Công nợ' parentLink='report/due' />
            </div>
            <AddPaymentForm id={id}/>
        </MasterLayout>
    );
}

export default AddPayment;